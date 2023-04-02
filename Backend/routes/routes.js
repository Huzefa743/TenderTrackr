const express = require('express')
const router = express.Router()
const { verifyUser } = require('../middleware/verify')
const path = require('path');
var authController = require('../controllers/authController')
var imageController = require('../controllers/imageController')
var customerController = require('../controllers/customerController')
var siteController = require('../controllers/sitesController')
var workController = require('../controllers/workController')
var materialController = require('../controllers/materialController')
var labourController = require('../controllers/labourController')



//frontend routing

router.get('/tesla/login', function(req,res) {
    res.sendFile(path.join(__dirname, '../build',  'index.html'));
});

//authorization api route
router.post('/register', imageController.uploadImage.single('userAvatar'), authController.register)
router.post('/login',  authController.sign_in)
router.get('/user-avatar/:id', authController.getUseravatarImage)
router.post('/reset-password', verifyUser,  authController.resetPassword)
router.post('/pr/users/login', authController.login)
router.post('/pr/users/signup',  authController.signup)

router.delete('/delete-user/:userId',verifyUser, authController.deleteUser)
router.get('/get-user/:userId',verifyUser, authController.getUserById)
router.get('/get-all-user',verifyUser, authController.getAllUser)

//customer routes
router.post('/create-customer',  customerController.createCustomer)
router.put('/update-customer/:custId',  customerController.updateCustomer)
router.get('/customer/:custId',  customerController.getCustomerById)
router.get('/customer/:page/:limit',  customerController.getAllCustomer)
router.delete('/customer/:custId',  customerController.deleteCustomer)

//site routes
router.post('/create-site/:custId',  siteController.createSite)
router.put('/update-site/:siteId',  siteController.updateSite)
router.get('/site/:siteId',  siteController.getSiteById)
router.get('/site-list/:custId',  siteController.getAllSite)
router.delete('/site/:siteId',  siteController.deleteSite)

//work routes
router.post('/create-work/:custId/:siteId',  workController.createWork)
router.put('/update-work/:workId',  workController.updateWork)
router.get('/work/:workId',  workController.getWorkById)
router.get('/work-list/:siteId',  workController.getAllWork)
router.delete('/work/:workId',  workController.deleteWork)

//material routes
router.post('/create-material/:custId/:siteId/:workId', imageController.uploadImage.single('receipt'), materialController.createMaterial)
router.put('/update-material/:materialId',imageController.uploadImage.single('receipt'),  materialController.updateMaterial)
router.get('/material/:materialId',  materialController.getMaterialById)
router.get('/material-list/:workId',  materialController.getAllMaterial)
router.delete('/material/:materialId',  materialController.deleteMaterial)
router.get('/material-receipt/:materialId',  materialController.showMaterialImage)

//labour routes
router.post('/create-labour/:custId/:siteId/:workId',  labourController.createLabour)
router.put('/update-labour/:labourId',  labourController.updateLabour)
router.get('/labour/:labourId',  labourController.getLabourById)
router.get('/labour-list/:workId',  labourController.getAllLabour)
router.delete('/labour/:labourId',  labourController.deleteLabour)

module.exports=router;