const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const db = require('../models/index')

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = {};
            const isExist = await checkUserEmail(email);
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                })

                if (user) {
                    const isCheckPassword = bcrypt.compareSync(password, user.password);
                    if (isCheckPassword) {
                        response.errorCode = 0;
                        response.message = 'Sign In Successful :>>';
                        delete user.password;
                        response.user = user;
                    } else {
                        response.errorCode = 3;
                        response.message = 'Your password incorrect!. Please try again!';
                    }
                } else {
                    response.errorCode = 2;
                    response.message = 'User not found ~'
                }
            } else {
                response.errorCode = 1
                response.message = 'Your email not exist in system. Please enter other email!'
            }
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })

}


const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isUser = await db.User.findOne({
                where: { email: userEmail },
                raw: true
            })
            if (isUser) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}



const getUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        let data;
        try {
            if (userId && userId === 'ALL') {
                data = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            if (userId && userId !== 'ALL') {
                data = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const handleHashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

const handleCreateNewUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password, firstName, lastName, address, phoneNumber, gender, roleId, positionId, image } = userData;
            const isEmailExist = await checkUserEmail(email)
            if (isEmailExist) {
                resolve({
                    errorCode: 1,
                    message: 'Your email is already existed!. Please enter other email.'
                })
            } else {
                const PasswordUserHashed = await handleHashUserPassword(password)
                await db.User.create({
                    email,
                    password: PasswordUserHashed,
                    firstName,
                    lastName,
                    address,
                    phoneNumber,
                    gender,
                    roleId,
                    positionId,
                    image,
                })
                resolve({
                    errorCode: 0,
                    message: 'Create successful'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

const handleEditUser = (dataUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(dataUser, {
                where: { id: dataUser.id }
            })
            resolve({
                errorCode: 0,
                message: 'Update Successful'
            })
        } catch (error) {
            reject(error)
        }
    })
}

const handleDeleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const foundUser = await db.User.findOne({
                where: { id: userId }
            })

            if (!foundUser) {
                resolve({
                    errorCode: 2,
                    message: 'User not found'
                })
            }
            await db.User.destroy({
                where: { id: userId }
            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter !'
                })
            }
            const response = await db.Allcode.findAll({
                where: { type: typeInput }
            })
            resolve({
                errorCode: 0,
                data: response
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin, getUsers, handleCreateNewUser, handleEditUser, handleDeleteUser, getAllCodeService
}