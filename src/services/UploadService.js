'use strict';

const {s3, PutObjectCommand, GetObjectCommand} = require('../config/s3.config');
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const { randomNameImageUpload } = require('../utils');

const urlImagePublic = "https://d1ma0nuo4guuee.cloudfront.net";

const uploadFromLocalToS3 = async (file) => {

    try {
        const imageName = randomNameImageUpload();
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageName || 'unknown',
            Body: file.buffer,
            ContentType: 'image/jpeg'
        });

        const result = await s3.send(command);

        const signedUrl = getSignedUrl({
            url: `${urlImagePublic}/${imageName}`,
            keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID,
            dateLessThan: new Date(Date.now() + 3600 * 1000),
            privateKey: process.env.AWS_CLOUDFRONT_PRIVATE_KEY,
          });

        return {
            url: signedUrl,
            result
        };
    } catch (error) {
        console.error(error);
        return {
            code: -1,
            message: 'Upload image failure',
            data: ''
        }
    }
}

module.exports = {
    uploadFromLocalToS3
}