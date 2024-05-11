const crypto = require('crypto');

const convertBase64toBinary = (base64) => {
    return Buffer.from(base64, 'base64').toString('binary');
}

const randomNameImageUpload = () => {
    return crypto.randomBytes(16).toString('hex');
}

export {
    convertBase64toBinary,
    randomNameImageUpload
}