const db = require('../models/index')

const getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataUser = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errorCode: 0,
                dataUser: dataUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctorsData = await db.User.findAll({
                where: {
                    roleId: 'R2',
                },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errorCode: 0,
                doctorsData: doctorsData
            })
        } catch (error) {
            reject(error)
        }
    })
}

const saveDetailDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentMarkdown || !data.contentHTML) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter!'
                })
            }
            await db.Markdown.create({
                contentMarkdown: data.contentMarkdown,
                contentHTML: data.contentHTML,
                description: data.description,
                doctorId: data.doctorId
            })
            resolve({
                errorCode: 0,
                message: 'Save information doctor success'
            })
        } catch (error) {
            console.log(error);
            reject(e)
        }
    })
}

const getInfoDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errorCode: 1,
                    message: 'Missing require parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    include: [
                        { model: db.Markdown, attributes: ['contentMarkdown', 'contentHTML', 'description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    ],
                    attributes: {
                        exclude: ['password']
                    },
                    raw: false,
                    nest: true
                })
                let imageBase64;
                if (data.image) {
                    imageBase64 = new Buffer(data.image, 'base64').toString('binary');
                    data.image = imageBase64
                }
                resolve({
                    errorCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctor, saveDetailDoctorService, getInfoDoctorById
}