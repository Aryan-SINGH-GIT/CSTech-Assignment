const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndDistribute } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.single('file'), uploadAndDistribute);

module.exports = router;
