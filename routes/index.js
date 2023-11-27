const express = require('express');
const router = express.Router();

// importing user controller
const user_controller = require('../controllers/controller')
// controller function of ALL user .

router.get('/getAllUsers' , user_controller.getAllUsers);
router.post('/login', user_controller.loginUser );

// distributing routes for company , employee and subadmin.
router.use('/company', require('./companyRoute'));
router.use('/employee', require('./employeeRoute'));
router.use('/subadmin', require('./subAdminRoute'));

module.exports = router;

