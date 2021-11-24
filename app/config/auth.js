const Task = require("../models/task.model");
const User = require("../models/user.model");
const jwt=require('jsonwebtoken')

exports.verifyToken=function(req, res, next){
    // get auth header value
    // console.log("verify token")
    const bearerHeader = req.headers['authorization'];
    
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined')
    {
        // split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;

        jwt.verify(req.token, 'secretkey', (err) => {
            if(err){
                res.json({
                    message: 'Token invalid'
                });
            }
            else{
                next();
            }
        });
        //middleware
       
    }
    else{
        //forbidden
        res.sendStatus(403);
        // res.json({message: "invalid"});
    }
}
exports.generateNewToken=function(paylod,secretKey)
{
  const token=  jwt.sign(paylod, secretKey)
  return token
    
}