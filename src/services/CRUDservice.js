const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db = require('../models/index')


const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password, firstName, lastName, address, phoneNumber, gender, roleId } = data
            const hashPasswordFromBcrypt = await hashUserPassword(password)
            await db.User.create({
                email,
                password: hashPasswordFromBcrypt,
                firstName,
                lastName,
                address,
                phoneNumber,
                gender: gender === '1' ? true : false,
                roleId,
            })
            resolve('Create new user successful!!!')
        } catch (error) {
            reject(error)
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                raw: true,
            })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

const getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataUser = await db.User.findOne({
                where: { id: userId }
            })
            resolve(dataUser)
        } catch (error) {
            reject(error)
        }
    })
}

const updateUserById = (dataUpdate, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(dataUpdate, { where: { id: userId } })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: { id: userId }
            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser, getAllUsers, getUserById, updateUserById, deleteUserById
}