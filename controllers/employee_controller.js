const ethers = require('ethers');
const jwt = require('../utils/jwt');
var db = require('../models/index');
var User = db.User;
const {validateUser} = require('../utils/joi');

var createEmployee = async (req,res)=>{
    try{
        const {firstName , lastName , email , phoneNumber , companyId , gender } = req.body;
        // to validate the user using joi library.
        const {error} = validateUser({firstName , lastName , email , phoneNumber , companyId , gender})  
        if(error){
           return res.status(400).json({error : error.details[0].message});
        }  
    // create wallet address using ethers.
        const wallet = ethers.Wallet.createRandom();
        const createdBy  = req.userDetails.id;
        const role = 'employee'

    // Access the private key and address
        const privateKey = wallet.privateKey;  
        const publicKey = wallet.address;
            // Store hash in your password DB.
        const data = await User.create({ firstName , lastName, email , phoneNumber , publicKey , companyId ,gender  ,role, createdBy });
        // console.log(data ,privateKey );
        res.status(200).json({ data : data , privateKey : privateKey});

        }
        catch(err){
            res.status(400).json({err});
        }

} 

// controller function to update employee
var patchEmployee = async(req,res) =>{
    var updatedData = req.body;
    const data = await User.update(updatedData,{
        where : {
            id: req.params.id,
            role: 'employee'
        }
    });
    if(data[0]!=1){
        return res.status(400).json({message: 'no employee exist with this id.'}); 
    }
    res.status(200).json({ data : data , message : updatedData});
}



//  get all the employees.
var getEmployee = async (req,res)=>{
    try {
        
        const data = await User.findAll({
            where : {
                role: 'employee', 
                
            }
        });
        res.status(200).json({ data : data});
        
    } catch (err) {
        res.status(400).json({err}); 
    }
}
  
module.exports = {
    createEmployee,
    patchEmployee,
    getEmployee
}