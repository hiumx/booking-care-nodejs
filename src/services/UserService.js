const db = require('../models/index')
const bcrypt = require('bcryptjs')

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = {};
            const isExist = await checkUserEmail(email);
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
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

module.exports = {
    handleUserLogin
}