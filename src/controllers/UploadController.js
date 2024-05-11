'use strict';

const { uploadFromLocalToS3 } = require('../services/UploadService');

class UploadController {

    async uploadFromLocalToS3(req, res, next) {
        try {
            const { file } = req;
            if (!file) throw new Error('File not found!');
            const response = await uploadFromLocalToS3(file);

            return res.json({
                code: 0,
                message: 'Upload image from local to S3 succeeded',
                data: response
            });
        } catch (error) {
            console.error(error);
            return res.json({
                code: -1,
                message: 'Upload image from local to S3 failure!',
                data: ''
            });
        }
    }
}

module.exports = new UploadController();