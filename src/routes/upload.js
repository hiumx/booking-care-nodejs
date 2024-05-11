import express from 'express';
import uploadController from '../controllers/UploadController';
const { memoryStorage } = require('../config/multer.config');

const router = express.Router();

router.post('/handbook/thumb', memoryStorage.single('file'), uploadController.uploadFromLocalToS3);

export default router;