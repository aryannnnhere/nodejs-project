const ethers = require('ethers');
const jwt = require('../utils/jwt');

var db = require('../models/index');
var User = db.User;
let Company = db.Company;
const {validateLogin} = require('../utils/joi');

var loginUser = async (req,res)=>{
    
        try{
        const  { email , privateKey }= req.body;
        const {error} = validateLogin({email , privateKey })  
        if(error){
           return res.status(400).json({error : error.details[0].message});
        }   
        const publicKey = new ethers.Wallet(privateKey).address;
        console.log(publicKey);
      
        const user = await User.findOne({
            where : {
                email: email
            }
        });
       
        if(user.publicKey == publicKey){
            const token = jwt.createToken(user);
            res.status(201).json({token});
        }
        }
        catch(err){
            res.status(400).json('Wrong credentials'); 
        }
    
}


var getAllUsers = async(req, res)=>{
    try {
        const data = await User.findAll({include: Company});
        console.log(data);
        res.status(200).json({ data : data});
        
    } catch (err) {
        res.status(400).json({error : err.message}); 
    }
}





module.exports = {
    loginUser,
    getAllUsers
    
}