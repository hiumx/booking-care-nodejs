import { Op } from "sequelize";
import db from "../models";

const getDoctorSchedule = async ({ doctorId, date }) => {
    try {
        // const res = await db.Schedule.findAll({
        //     where: {
        //         [Op.and]: [
        //             Sequelize.where(Sequelize.fn('DAY', Sequelize.col('date')), dateObj.getDate()),
        //             Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), (dateObj.getMonth() + 1)),
        //             Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), dateObj.getFullYear()),
        //         ],
        //         doctorId
        //     },
        //     attributes: ['doctorId', 'date', 'timeType', 'timeTypeId'],
        //     raw: true
        // });

    } catch (error) {
        console.log(error);
        return {
            message: 'Something wrong from service!',
            code: '-1',
            data: ''
        }
    }
}


const getInfoTimeDetailById = async (timeIds) => {
    const listTimeIds = timeIds.split(',');
    try {
        const res = await db.Allcode.findAll({
            where: {
                id: {
                    [Op.in]: listTimeIds
                }
            },
            attributes: ['keyMap', 'valueEn', 'valueVi'],
            raw: true
        });
        return {
            message: 'Get time detail successfully',
            code: 0,
            data: res
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something went wrong from get time detail service!',
            code: -1,
            data: ''
        }
    }
}

const getInfoClinicDoctor = async ({ id }) => {
    try {
        const res = await db.Clinic.findOne({
            where: {
                doctorId: +id
            },
            raw: true
        });
        return {
            message: 'Get information doctor clinic successfully',
            code: 0,
            data: res
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something went wrong from get information clinic service!',
            code: -1,
            data: ''
        }
    }
}

const getDoctorClinicDetail = async ({ id }) => {
    try {
        const res = await db.Clinic.findOne({
            where: {
                doctorId: +id
            },
            attributes: {
                exclude: ['id', 'doctorId', 'priceId', 'provinceId', 'paymentId']
            },
            include: [
                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'priceData', attributes: ['keyMap', 'valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'paymentData', attributes: ['keyMap', 'valueEn', 'valueVi'] },
            ],
            raw: true,
            nest: true
        });
        return {
            message: 'Get doctor clinic detail successfully',
            code: 0,
            data: res
        }

    } catch (error) {
        console.error(error);
        return {
            message: 'Something went wrong from get information clinic service!',
            code: -1,
            data: ''
        }
    }
}

export {
    getDoctorSchedule, getInfoTimeDetailById,
    getInfoClinicDoctor, getDoctorClinicDetail
}