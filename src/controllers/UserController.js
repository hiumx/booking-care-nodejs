const userService = require('../services/UserService');
import * as apiService from '../services/ApiService';

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(200).json({
            errorCode: 1,
            message: 'Missing input parameters'
        })
    }

    const response = await userService.handleUserLogin(email, password)

    res.status(200).json({
        errorCode: response.errorCode,
        message: response.message,
        user: response.user ? response.user : {}
    })
}

const handleGetUsers = async (req, res) => {
    const users = await userService.getUsers(req.query)

    if (!req.query.id && !req.query.email) {
        res.status(200).json({
            errorCode: 1,
            message: 'Missing parameter input',
            users: []
        })
    }

    res.status(200).json({
        errorCode: 0,
        message: 'OK',
        users,
    })
}

const createNewUser = async (req, res) => {
    const message = await userService.handleCreateNewUser(req.body)
    return res.status(200).json(message)
}

const editUser = async (req, res) => {
    const dataUser = req.body
    const message = await userService.handleEditUser(dataUser)
    res.status(200).json(message)
}

const deleteUser = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.status(200).json({
            errorCode: 1,
            message: 'Missing parameters input'
        })
    }
    await userService.handleDeleteUser(id);
    res.status(200).json({
        errorCode: 0,
        message: 'Deleted successful'
    })
}

const handleGetAllCode = async (req, res) => {
    try {
        const data = await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            errorCode: -1,
            message: 'Error from data base!'
        });
    }
}

const getDoctorSchedule = async (req, res) => {
    try {
        const response = await apiService.getDoctorSchedule(req.query);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorCode: -1,
            message: 'Error from data base!'
        });
    }
}

const getInfoTimeDetailById = async (req, res) => {
    const { listTimeIds } = req.query;
    try {
        const response = await apiService.getInfoTimeDetailById(listTimeIds);
        res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        })
    }
}

const getInfoClinicDoctor = async (req, res) => {
    try {
        const response = await apiService.getInfoClinicDoctor(req.params);
        res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        })
    }
}

const getClinicDoctorDetail = async (req, res) => {
    try {
        const response = await apiService.getDoctorClinicDetail(req.params);
        res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data
        })
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        })
    }
}


export {
    handleLogin, handleGetUsers,
     createNewUser, editUser,
     deleteUser, handleGetAllCode,
     getDoctorSchedule, getInfoTimeDetailById,
     getInfoClinicDoctor, getClinicDoctorDetail
}