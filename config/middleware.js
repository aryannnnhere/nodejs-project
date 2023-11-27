const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.User

// this middleware is to give authorisation only to sub-admin.
var subAdminAuthorize = async (req, res, next)=>{
    try {
        // verify the token from cookies 
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1];
    
    
     try {
        const tokenData = jwt.verify(token, 'super-secret');
        console.log('Token is valid:', tokenData);
        req.userDetails = tokenData; 
      } catch (error) {
        console.error('Token is invalid:', error);
      }
    
     // as token data return the payload it stores the user details. 
    //  console.log(req.userDetails.id);
    //  check identity of the user using email.
    
    const data = await User.findOne({
        where : {
            email: req.userDetails.email , 
            role : 'sub-admin'
        }
    });
    // if user is not super-admin return 
    console.log(data);
    if(!data){
        return res.status(401).json({message: 'unauthorized'})
    }
    
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'})
    }  
    
    next(); 
    }

// this middleware is to give authorisation only to super-admin.
var superAdminAuthorize = async (req, res, next)=>{
try {
    // verify the token from cookies 
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1];
    const tokenData = jwt.verify(token, 'super-secret');
    console.log('Token is valid:', tokenData);
    req.userDetails = tokenData; 
  

 // as token data return the payload it stores the user details. 
//  console.log(req.userDetails.id);
//  check identity of the user using email.

const data = await User.findOne({
    where : {
        email: req.userDetails.email , 
        role : 'super-admin'
    }
});
// console.log(data);
// if user is not super-admin return 

if(!data){
    return res.status(401).json({message: 'unauthorized'})
}

} catch (error) {
    return res.status(401).json({message: 'unauthorized'})
}  

next(); 
}





var employeeAuthorize = async (req, res, next)=>{
    try {
        // verify the token from cookies 
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1];
    
     try {
        const tokenData = jwt.verify(token, 'super-secret');
        // console.log('Token is valid:', tokenData);
        req.userDetails = tokenData; 
      } catch (error) {
        console.error('Token is invalid:', error);
      }
     // as token data return the payload it stores the user details. 
    //  console.log(req.userDetails.id);
    //  check identity of the user using email.
    
    const data = await User.findOne({
        where : {
            email: req.userDetails.email , 
            role : 'employee'
        }
    });
    // if user is not super-admin return 
    // console.log(data);
    if(!data){
        return res.status(401).json({message: 'unauthorized'})
    }
    
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'})
    }  
    
    next(); 
    }

module.exports = {
    subAdminAuthorize,
    superAdminAuthorize,
    employeeAuthorize
}