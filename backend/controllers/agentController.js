const Agent = require('../models/Agent');

// @desc    Create a new agent
// @route   POST /api/agents
// @access  Private/Admin
const createAgent = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const agentExists = await Agent.findOne({ email });

    if (agentExists) {
        res.status(400).json({ message: 'Agent already exists' });
        return;
    }

    const agent = await Agent.create({
        name,
        email,
        mobile,
        password,
    });

    if (agent) {
        res.status(201).json({
            _id: agent._id,
            name: agent.name,
            email: agent.email,
            mobile: agent.mobile,
        });
    } else {
        res.status(400).json({ message: 'Invalid agent data' });
    }
};

// @desc    Get all agents
// @route   GET /api/agents
// @access  Private/Admin
const getAgents = async (req, res) => {
    const agents = await Agent.find({});
    res.json(agents);
};

module.exports = { createAgent, getAgents };
