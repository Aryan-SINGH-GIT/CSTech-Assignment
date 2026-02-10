const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Agent = require('../models/Agent');
const Task = require('../models/Task');

dotenv.config({ path: path.join(__dirname, '../.env') });


const dns=require('dns')
dns.setServers(['1.1.1.1','8.8.8.8'])

const getAgentTaskCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const pipeline = [
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignedTo',
                    as: 'tasks'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    taskCount: { $size: '$tasks' }
                }
            },
            {
                $sort: { taskCount: -1 }
            }
        ];

        const results = await Agent.aggregate(pipeline);

        console.log('\nAgent Task Counts:');
        console.log('------------------------------------------------');
        console.log('| Name                 | Email                          | Tasks |');
        console.log('------------------------------------------------');

        results.forEach(agent => {
            console.log(`| ${agent.name.padEnd(20)} | ${agent.email.padEnd(30)} | ${agent.taskCount.toString().padEnd(5)} |`);
        });
        console.log('------------------------------------------------\n');

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

getAgentTaskCounts();
