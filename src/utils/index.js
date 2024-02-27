
const convertBase64toBinary = (base64) => {
    return Buffer.from(base64, 'base64').toString('binary');
}

export {
    convertBase64toBinary
}