import { Op } from "sequelize";
import db from "../models";

const getInfoDoctorById = async (doctorId) => {
    try {
        const res = await db.Markdown.findOne({
            where: {
                doctorId
            },
            raw: true
        });
        return {
            message: 'Get info doctor successfully',
            code: 0,
            data: res
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Something went wrong from get info doctor service!',
            code: -1,
            data: ''
        }
    }
}


export {
    getInfoDoctorById
}