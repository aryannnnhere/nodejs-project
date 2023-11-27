const express = require('express');
const router = express.Router();
const subAdmin_controller =  require('../controllers/subAdmin_controller');
const middleware = require('../config/middleware');


router.post('/create', middleware.superAdminAuthorize, subAdmin_controller.createSubAdmin);
router.get('/getall',  subAdmin_controller.getSubadmin);


module.exports = router;
