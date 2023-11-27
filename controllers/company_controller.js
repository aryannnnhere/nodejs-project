var db = require('../models/index');
var Company = db.Company;
const { validateCompany }  = require('../utils/joi');

var createCompany = async(req,res)=>{
    try {
         const {companyName , description} = req.body;
         const { logo }  = req.file;
//  to validate the company using joi.
         const {error} = validateCompany({companyName , logo , description})  
        if(error){
           return res.status(400).json({error : error.details[0].message});
        }  
        const createdBy  = req.userDetails.id;
        console.log(createdBy)
        const data = await Company.create({companyName  , logo, createdBy, description});
         console.log(data)
         return  res.json({'message' :'sucessfull'});
    } catch (err) {
        console.log(err);
                res.status(400).json({'error': err}); 
        
    }
}

// controller function to read the all companies created. 
var getAll = async(req,res) =>{
        try {
            
        const data = await Company.findAll({});
        res.status(200).json({ data : data});
            
        } catch (err) {
            res.status(400).json({'Error' : err});
        }
 }  
// controller function to update company

 var updateCompany = async (req,res) =>{
    try {
//  extrating path of file from req object
        const  updatedData  = req.body;
        const data = await Company.update(updatedData,{
            where : {
                id: req.params.id
            }
    }); 

    return res.json({'message' : updatedData})
        
    } catch (err) {
        res.status(400).json({'Error' : err});
    }
 }

module.exports = {
    createCompany,
    getAll,
    updateCompany
}