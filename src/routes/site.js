const express = require('express');
const router = express.Router();

const siteController = require('../controllers/SiteController')

router.get('/search', siteController.getSearchPage)
router.get('/create-new-user', siteController.getCreateNewUserPage)
router.post('/store/create-new-user', siteController.createNewUser)
router.get('/store/users', siteController.storeUsers)
router.get('/edit-user/:id', siteController.editUser)
router.put('/update-user/:id', siteController.updateUser)
router.delete('/delete-user/:id', siteController.deleteUser)

router.get('/', siteController.getHomePage)


module.exports = router