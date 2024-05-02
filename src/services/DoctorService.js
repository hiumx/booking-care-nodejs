const db = require('../models/index');
import dotenv from 'dotenv';
import { Op, Sequelize } from 'sequelize';
import _, { includes } from 'lodash';
import { sendEmailConfirmAppointment, sendEmailSimple } from './EmailService';

dotenv.config();

const getTopDoctorHome = async (limit) => {
    try {
        let dataUser = await db.User.findAll({
            limit: limit,
            where: { roleId: 'R2' },
            include: [
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
            ],
            order: [['createdAt', 'DESC']],
            attributes: {
                exclude: ['password']
            },
            raw: true,
            nest: true
        });

        dataUser = dataUser.map((user) => {
            let binImage;
            if (user.image) {
                binImage = Buffer.from(user.image, 'base64').toString('binary');
                user.image = binImage;
            };
            return {
                ...user,
                image: binImage
            }
        });

        return {
            errorCode: 0,
            dataUser
        }
    } catch (error) {
        console.log(error);
        return {
            errorCode: -1
        }
    }
}



const getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorsData = await db.User.findAll({
                where: {
                    roleId: 'R2',
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.Markdown,
                        attributes: ['specialtyId', 'clinicId'],
                        include: [{ model: db.Specialty, attributes: ['name'] }]
                    },
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    }
                ],
                raw: true,
                nest: true
            });

            doctorsData = doctorsData.map(doctor => {
                let imageBase64;
                if (doctor?.image) {
                    imageBase64 = Buffer.from(doctor.image, 'base64').toString('binary');
                }
                return {
                    ...doctor,
                    image: imageBase64
                }
            });

            resolve({
                errorCode: 0,
                doctorsData
            })
        } catch (error) {
            reject(error)
        }
    })
}

const createDetailDoctorService = (
    {
        contentMarkdown,
        contentHTML,
        description,
        provinceId,
        priceId,
        paymentId,
        addressClinic,
        nameClinic,
        noteClinic,
        doctorId,
        specialtyId
    }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !contentMarkdown || !contentHTML
                || !provinceId || !priceId || !paymentId
                || !addressClinic || !nameClinic || !noteClinic) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter!'
                })
            }
            const [clinic, created] = await db.Clinic.findOrCreate({
                where: {
                    doctorId,
                    provinceId,
                    addressClinic,
                    nameClinic
                },
                defaults: {
                    priceId,
                    paymentId,
                    note: noteClinic
                }
            });

            await db.Markdown.create({
                contentMarkdown,
                contentHTML,
                description,
                doctorId,
                specialtyId,
                clinicId: clinic.id
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

const updateDetailDoctorService = ({
    contentMarkdown,
    contentHTML,
    description,
    provinceId,
    priceId,
    paymentId,
    addressClinic,
    nameClinic,
    noteClinic,
    doctorId,
    specialtyId
}) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!doctorId || !contentMarkdown || !contentHTML) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter!'
                })
            }
            const [clinic, created] = await db.Clinic.findOrCreate({
                where: {
                    provinceId,
                    addressClinic,
                    nameClinic
                },
                defaults: {
                    doctorId,
                    priceId,
                    paymentId,
                    note: noteClinic
                }
            });
            await db.Markdown.update({
                contentMarkdown,
                contentHTML,
                description,
                clinicId: clinic.id,
                specialtyId
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
                });

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
    // console.log(date);
    // console.log(dateObj);
    // console.log(dateObj.getDate());

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

const getAppointmentByDate = async ({ doctorId, date }) => {
    const dateFormat = new Date(date).getTime();
    try {
        const listAppoint = await db.Booking.findAll({
            where: {
                doctorId,
                date: dateFormat,
                [Op.or]: [{ statusId: 'S2' }, { statusId: 'S3' }]
            },
            attributes: ['id', 'statusId'],
            include: [
                {
                    model: db.Patient,
                    attributes: ['name', 'address'],
                    include: [{ model: db.Allcode, as: 'genderDataPatient', attributes: ['valueVi', 'valueEn'] }]
                },
                {
                    model: db.Allcode,
                    as: 'timeTypeData',
                    attributes: ['valueVi', 'valueEn']
                },

            ],
            raw: true,
            nest: true
        });
        return {
            message: 'Get doctor schedule existed successfully',
            code: 0,
            data: listAppoint
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

const getListDoctorsBySpecialtyId = async ({ specialtyId }) => {
    try {
        const res = await db.Markdown.findAll({
            where: {
                specialtyId
            },
            attributes: [],
            include: [
                { model: db.Clinic, attributes: ['doctorId'] },
            ],
            raw: true,
            nest: true
        });
        return {
            code: 0,
            message: 'Get list doctors by specialty id successfully',
            data: res
        }
    } catch (error) {
        console.log(error);
        return {
            code: -1,
            message: 'Something wrong form service!',
            data: ''
        }
    }
}

const confirmAppointment = async ({ doctorId, bookingId }) => {
    try {

        if (!bookingId || !doctorId) {
            return {
                code: -3,
                message: 'Missing parameter!',
                data: ''
            }
        }

        const appointmentExist = await db.Booking.findOne({
            where: {
                doctorId,
                id: bookingId
            },
            raw: false
        });

        if (!appointmentExist) {
            return {
                code: -4,
                message: 'Appointment does not exist!',
                data: ''
            }
        }

        const data = await db.Booking.findOne({
            where: {
                doctorId,
                id: bookingId
            },
            attributes: ['date', 'timeType'],
            include: [
                { model: db.Patient, attributes: ['name', 'email'] },
                { model: db.User, attributes: ['firstName', 'lastName'] },
                { model: db.Allcode, as: 'timeTypeData', attributes: ['valueVi', 'valueEn'] },
            ],
            raw: true,
            nest: true 
        });

        if (appointmentExist?.statusId === 'S2') {
            appointmentExist.statusId = 'S3';
            await appointmentExist.save();


            await sendEmailConfirmAppointment({
                namePatient: data.Patient.name,
                nameDoctor: `${data.User.lastName} ${data.User.firstName}`,
                emailPatient: data.Patient.email,
                dateAppointment: new Date(data.date).toISOString(),
                time: data.timeTypeData.valueVi
            })

            return {
                code: 0,
                message: 'Confirmed appointment by doctor successfully.',
                data: ''
            }
        }

    } catch (error) {
        console.log(error);
        return {
            code: -1,
            message: 'Something wrong form service!',
            data: ''
        }
    }
}
export {
    getTopDoctorHome, getAllDoctor,
    createDetailDoctorService, getInfoDoctorById,
    updateDetailDoctorService, createDoctorSchedule,
    getScheduleDoctorByDate, getListDoctorsBySpecialtyId,
    getAppointmentByDate, confirmAppointment
}