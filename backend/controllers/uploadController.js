const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const Agent = require('../models/Agent');
const Task = require('../models/Task');

// Helper to parse file
const parseFile = (filePath, fileType) => {
    return new Promise((resolve, reject) => {
        const results = [];
        if (fileType === 'text/csv' || fileType === 'application/vnd.ms-excel') {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        } else if (
            fileType ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            filePath.endsWith('.xlsx')
        ) {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            resolve(data);
        } else {
            reject(new Error('Unsupported file format'));
        }
    });
};

// @desc    Upload CSV/Excel and distribute tasks
// @route   POST /api/upload
// @access  Private/Admin
const uploadAndDistribute = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const agents = await Agent.find({});
        if (agents.length === 0) {
            return res
                .status(400)
                .json({ message: 'No agents found. Please add agents first.' });
        }

        const tasksData = await parseFile(req.file.path, req.file.mimetype);

        // Validate data (basic check for required fields)
        const validTasks = tasksData.filter(
            (t) => t.FirstName && t.Phone
        );

        if (validTasks.length === 0) {
            return res.status(400).json({ message: 'No valid tasks found in file' });
        }

        const tasksToSave = [];
        let agentIndex = 0;

        // Distribute tasks
        // Strategy: Round Robin for perfect distribution including remainders
        validTasks.forEach((task) => {
            tasksToSave.push({
                firstName: task.FirstName,
                phone: task.Phone,
                notes: task.Notes || '',
                assignedTo: agents[agentIndex]._id
            });

            agentIndex = (agentIndex + 1) % agents.length;
        });

        await Task.insertMany(tasksToSave);

        // Cleanup uploaded file
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            message: `Successfully distributed ${tasksToSave.length} tasks among ${agents.length} agents.`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error during processing' });
    }
};

module.exports = { uploadAndDistribute };
