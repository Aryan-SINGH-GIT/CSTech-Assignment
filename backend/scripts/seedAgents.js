const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Agent = require('./models/Agent');
const bcrypt = require('bcryptjs');

dotenv.config();


const seedAgents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Agent Seeding');

        // Clear existing agents (optional, but good for clean testing)
        // await Agent.deleteMany({}); 

        const agents = [
            { name: 'Agent One', email: 'agent1@test.com', mobile: '+1234567891', password: 'password123' },
            { name: 'Agent Two', email: 'agent2@test.com', mobile: '+1234567892', password: 'password123' },
            { name: 'Agent Three', email: 'agent3@test.com', mobile: '+1234567893', password: 'password123' },
            { name: 'Agent Four', email: 'agent4@test.com', mobile: '+1234567894', password: 'password123' },
            { name: 'Agent Five', email: 'agent5@test.com', mobile: '+1234567895', password: 'password123' }
        ];

        for (const agentData of agents) {
            const exists = await Agent.findOne({ email: agentData.email });
            if (!exists) {
                // Password hashing is handled by pre-save hook in Agent model
                await Agent.create(agentData);
                console.log(`Created: ${agentData.name}`);
            } else {
                console.log(`Skipped (Exists): ${agentData.name}`);
            }
        }

        console.log('-----------------------------------');
        console.log('5 Dummy Agents Created/Verified.');
        console.log('You can now upload the CSV to distribute tasks among them.');
        console.log('-----------------------------------');

        process.exit();
    } catch (error) {
        console.error('Error seeding agents:', error);
        process.exit(1);
    }
};

seedAgents();
