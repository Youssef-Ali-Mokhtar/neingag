const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const requireAuth = (req, res, next)=> {
    const { authorization } = req.headers;
    console.log("AUTH IS BEING USED");
    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];
    
    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        User.findById(_id)
            .then(user=> {
                req.user = user;
                console.log("AUTH...", user._id);
                next();
            })
            .catch(err=>{
                console.log(err);
            })
            
    } catch(error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
    
   
}

module.exports = requireAuth;