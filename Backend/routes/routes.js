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
var paymentController = require('../controllers/paymentController')



//frontend routing

router.get('/', function(req,res) {
  console.log(" here is frontend execution")
  res.sendFile(path.join(__dirname, '../build',  'index.html'));
});


//authorization api route
router.post('/register', imageController.uploadImage.single('userAvatar'), authController.register)
router.post('/login',  authController.sign_in)
router.get('/user-avatar/:id', authController.getUseravatarImage)
router.post('/reset-password', verifyUser,  authController.resetPassword)
router.post('/pr/users/login', authController.login)
router.post('/pr/users/signup',verifyUser,  authController.signup)

router.delete('/delete-user/:userId',verifyUser, authController.deleteUser)
router.get('/get-user/:userId',verifyUser, authController.getUserById)
router.get('/get-all-user',verifyUser, authController.getAllUser)

//customer routes
router.post('/create-customer',verifyUser,  customerController.createCustomer)
router.put('/update-customer/:custId',verifyUser,  customerController.updateCustomer)
router.get('/customer/:custId',verifyUser,  customerController.getCustomerById)
router.get('/customer/:page/:limit',verifyUser,  customerController.getAllCustomer)
router.delete('/customer/:custId',verifyUser,  customerController.deleteCustomer)

//site routes
router.post('/create-site/:custId',verifyUser,  siteController.createSite)
router.put('/update-site/:siteId',verifyUser,  siteController.updateSite)
router.get('/site/:siteId',verifyUser,  siteController.getSiteById)
router.get('/site-list/:custId',verifyUser,  siteController.getAllSite)
router.delete('/site/:siteId',verifyUser,  siteController.deleteSite)

//work routes
router.post('/create-work/:custId/:siteId' ,verifyUser,  workController.createWork)
router.put('/update-work/:workId',verifyUser,  workController.updateWork)
router.get('/work/:workId',verifyUser,  workController.getWorkById)
router.get('/work-list/:siteId',verifyUser,  workController.getAllWork)
router.delete('/work/:workId',verifyUser,  workController.deleteWork)

//material routes
router.post('/create-material/:custId/:siteId/:workId',verifyUser, imageController.uploadImage.single('receipt'), materialController.createMaterial)
router.put('/update-material/:materialId',verifyUser,imageController.uploadImage.single('receipt'),  materialController.updateMaterial)
router.get('/material/:materialId',verifyUser,  materialController.getMaterialById)
router.get('/material-list/:workId',verifyUser,  materialController.getAllMaterial)
router.delete('/material/:materialId',verifyUser,  materialController.deleteMaterial)
router.get('/material-receipt/:materialId',  materialController.showMaterialImage)

//labour routes
router.post('/create-labour/:custId/:siteId/:workId',verifyUser,  labourController.createLabour)
router.put('/update-labour/:labourId' ,verifyUser,  labourController.updateLabour)
router.get('/labour/:labourId',verifyUser,  labourController.getLabourById)
router.get('/labour-list/:workId',verifyUser,  labourController.getAllLabour)
router.delete('/labour/:labourId',verifyUser,  labourController.deleteLabour)

//payment routes
router.post('/create-payment',verifyUser,  paymentController.createPayment)
router.get('/payment/:custId',verifyUser,  paymentController.getPaymentByCustId)
router.get('/payment-list',verifyUser,  paymentController.getAllPayment)
router.get('/payment-list-debit',verifyUser,  paymentController.getAllDebitPayment)
router.get('/payment-list-credit',verifyUser,  paymentController.getAllCreditPayment)
router.delete('/payment/:paymentId',verifyUser,  paymentController.deletePayment)

//download excel 
router.get('/download-income-details', paymentController.downloadCreditPaymentExcel)
router.get('/download-expense-details', paymentController.downloadDebitPaymentExcel)
module.exports=router;