const express = require('express');
const router = express.Router();
const company_controller =  require('../controllers/company_controller');

// importing middleware for authentication.
const middleware = require('../config/middleware');

const { upload } = require('../config/multer');

router.post('/create', middleware.superAdminAuthorize ,upload.single("companyLogo") ,
  company_controller.createCompany);

router.get('/getall' , company_controller.getAll);

router.patch('/update/:id' ,  middleware.superAdminAuthorize , company_controller.updateCompany);


module.exports = router;