const db = require('../models/index');
import dotenv from 'dotenv';
import { Op, Sequelize } from 'sequelize';
import _ from 'lodash';

dotenv.config();

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

const createDetailDoctorService = ({ contentMarkdown, contentHTML, description, doctorId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !contentMarkdown || !contentHTML) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter!'
                })
            }
            await db.Markdown.create({
                contentMarkdown,
                contentHTML,
                description,
                doctorId
            })
            resolve({
                errorCode: 0,
                message: 'Create information doctor success'
            })
        } catch (error) {
            console.log(error);
            reject(e)
        }
    })
}

const updateDetailDoctorService = ({ contentMarkdown, contentHTML, description, doctorId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !contentMarkdown || !contentHTML) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter!'
                })
            }
            await db.Markdown.update({
                contentMarkdown,
                contentHTML,
                description
            }, {
                where: {
                    doctorId
                }
            })
            resolve({
                errorCode: 0,
                message: 'Update information doctor success'
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
                    imageBase64 = Buffer.from(data.image, 'base64').toString('binary');
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

const checkScheduleExist = async (doctorId, date) => {
    const dateObj = new Date(date);

    try {
        return await db.Schedule.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('DAY', Sequelize.col('date')), dateObj.getDate() - 1),
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), (dateObj.getMonth() + 1)),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), dateObj.getFullYear()),
                ],
                doctorId
            },
            attributes: ['doctorId', 'date', 'timeType', 'timeTypeId'],
            raw: true
        });
    } catch (error) {
        console.log(error);
    }
}

const createDoctorSchedule = async (doctorSchedule) => {
    try {
        const { doctorId, date, listTimeSelected } = doctorSchedule;
        const dateFormat = new Date(date).getTime();

        const schedule = listTimeSelected.map(time => ({
            doctorId,
            date: dateFormat,
            maxNumber: process.env.MAX_DOCTOR_SCHEDULE,
            currentNumber: listTimeSelected.length,
            timeType: time.keyMap,
            timeTypeId: time.timeId
        }));

        try {
            const scheduleExist = await checkScheduleExist(doctorId, date);

            const newTimesList = _.differenceWith(schedule, scheduleExist, (a, b) => {
                const dateObj = new Date(a.date);
                return a.doctorId === b.doctorId
                    && dateObj.getDate() === b.date.getDate()
                    && dateObj.getMonth() === b.date.getMonth()
                    && dateObj.getFullYear() === b.date.getFullYear()
                    && a.timeType === b.timeType
            });

            await db.Schedule.bulkCreate(newTimesList);
            return {
                message: 'Create doctor schedule successfully',
                code: 0,
                data: ''
            }
        } catch (error) {
            console.log(error);
            return {
                message: 'Something wrong from server!',
                code: -1,
                data: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -1,
            data: ''
        }
    }
}

const getScheduleDoctorByDate = async ({ doctorId, date }) => {

    try {
        const scheduleExist = await checkScheduleExist(doctorId, date);
        return {
            message: 'Get doctor schedule existed successfully',
            code: 0,
            data: scheduleExist
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from server!',
            code: -1,
            data: ''
        }
    }
}

export {
    getTopDoctorHome, getAllDoctor,
    createDetailDoctorService, getInfoDoctorById,
    updateDetailDoctorService, createDoctorSchedule,
    getScheduleDoctorByDate
}