const ethers = require('ethers');
const jwt = require('../utils/jwt');

var db = require('../models/index');
var User = db.User;
const {validateUser} = require('../utils/joi');

//  to register a subadmin.
var createSubAdmin = async (req,res)=>{
    try{
        const {firstName , lastName , email  , companyId , gender } = req.body;  
        const {error} = validateUser({firstName , lastName , email  , companyId , gender})  
        if(error){
           return res.status(400).json({error : error.details[0].message});
        }    

        const wallet = ethers.Wallet.createRandom();
        const createdBy  = req.userDetails.id;
        const role = 'sub-admin'

    // Access the private key and address
        const privateKey = wallet.privateKey;  
        const publicKey = wallet.address;
            // Store hash in your password DB.
        const data = await User.create({ firstName , lastName, email , phoneNumber , publicKey , companyId ,gender  ,role, createdBy });
        // console.log(data ,privateKey );
        res.status(200).json({ data : data , privateKey : privateKey});
        }
        catch(err){
            res.status(400).json({error : err});
        }
}

var getSubadmin = async (req,res)=>{
    try {
        const data = await User.findAll({
            where : {
                role: 'sub-admin'
            }
        });
        res.status(200).json({ data : data});
        
    } catch (err) {
        res.status(400).json({err}); 
    }
}

module.exports = {
createSubAdmin,
getSubadmin
}