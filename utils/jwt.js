const jwt = require('jsonwebtoken');

//  this function is to create jwt token - we will use this token while login the user
//  and store user details in payload of jwt.

function createToken( data ){
    return jwt.sign(data.get() , 'super-secret' , {
        expiresIn: 12000,
    });
}  

module.exports ={
    createToken
}