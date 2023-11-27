const express = require('express');
const router = express.Router();
const employee_controller =  require('../controllers/employee_controller');
const middleware = require('../config/middleware');

router.post('/create', middleware.subAdminAuthorize , employee_controller.createEmployee);
router.get('/getall',  employee_controller.getEmployee);
router.patch('/update/:id' , middleware.employeeAuthorize , employee_controller.patchEmployee)

module.exports = router;