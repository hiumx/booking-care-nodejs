const db = require('../models/index');
const CRUDservice = require('../services/CRUDservice');

const getHomePage = async (req, res) => {
    try {

        res.render('home-page')
    } catch (e) {
        console.log(e);
    }
}

const getCreateNewUserPage = (req, res) => {
    res.render('users/create-new-user');
}

const createNewUser = async (req, res) => {
    const message = await CRUDservice.createNewUser(req.body);
    res.redirect('/store/users');
}

const getSearchPage = (req, res) => {
    res.send('Search Page')
}

const storeUsers = async (req, res) => {
    const dataUsers = await CRUDservice.getAllUsers();
    res.render('users/store-users', {
        dataUsers,
    })
}

const editUser = async (req, res) => {
    const userId = req.params.id;
    const userData = await CRUDservice.getUserById(userId);
    res.render('users/edit-user', {
        userData,
    })
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const dataUpdate = req.body;
    await CRUDservice.updateUserById(dataUpdate, userId)
    res.redirect('/store/users')
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await CRUDservice.deleteUserById(userId)
    res.redirect('/store/users')
}


module.exports = {
    getHomePage, getCreateNewUserPage, createNewUser, getSearchPage, storeUsers, editUser, updateUser, deleteUser
}
