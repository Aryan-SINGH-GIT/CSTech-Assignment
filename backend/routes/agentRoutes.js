const express = require('express');
const router = express.Router();
const { createAgent, getAgents } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createAgent).get(protect, getAgents);

module.exports = router;
