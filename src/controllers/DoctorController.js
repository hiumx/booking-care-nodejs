const doctorService = require('../services/DoctorService')

const getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        const response = await doctorService.getTopDoctorHome(+limit)
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errorCode: -1,
            message: 'Error from server...!'
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctor()
        res.status(200).json(doctors)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errorCode: -1,
            message: 'Error code from server'
        })
    }
}

const saveDetailDoctor = async (req, res) => {
    try {
        const response = await doctorService.createDetailDoctorService(req.body)
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errorCode: -1,
            message: 'Error from server...!'
        })
    }
}

const updateDetailDoctor = async (req, res) => {
    try {
        const response = await doctorService.updateDetailDoctorService(req.body)
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errorCode: -1,
            message: 'Error from server...!'
        })
    }
}

const getListInfoDoctorsBySpecialtyId = async (req, res, next) => {
    try {
        const response = await doctorService.getListDoctorsBySpecialtyId(req.query);

        res.status(201).json({
            code: response.code,
            message: response.message,
            data: response.data
        })
    } catch (error) {
        next(error);
    }
}



const getInfoDoctorById = async (req, res) => {
    try {
        const doctorId = req.query.id
        const response = await doctorService.getInfoDoctorById(doctorId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errorCode: -1,
            message: 'Error from server...!'
        })
    }
}

const createDoctorSchedule = async (req, res) => {
    try {
        const response = await doctorService.createDoctorSchedule(req.body);
        res.status(201).json({
            message: response.message,
            errorCode: response.code,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something wrong from server!',
            errorCode: -2,
            data: ''
        })
    }
}

const getScheduleDoctorByDate = async (req, res) => {

    try {
        const response = await doctorService.getScheduleDoctorByDate(req.query);
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something wrong from server!',
            errorCode: -2,
            data: ''
        })
    }
}

module.exports = {
    getTopDoctorHome, getAllDoctor, 
    saveDetailDoctor, getInfoDoctorById, 
    updateDetailDoctor, createDoctorSchedule, 
    getScheduleDoctorByDate, getListInfoDoctorsBySpecialtyId
}