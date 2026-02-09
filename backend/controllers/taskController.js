const Task = require('../models/Task');

// @desc    Get all tasks or filter by agent
// @route   GET /api/tasks
// @access  Private/Admin
const getTasks = async (req, res) => {
    const { agentId } = req.query;
    let query = {};

    if (agentId) {
        query.assignedTo = agentId;
    }

    try {
        const tasks = await Task.find(query).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getTasks };
