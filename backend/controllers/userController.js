const UserModel = require('../models/userModel');

const postUser = (req, res)=> {
    const {
        username,
        email
    } = req.body;

    const userModel = new UserModel(username, email);
    userModel.save(userId=> {
        res.json(userId);
    });
}

const getUsers = (req, res)=> {
    UserModel.fetchAll(response=>{
        res.json(response);
    })
}

const getUser = (req, res)=> {
    const id = req.params.id;
    
    UserModel.getUser(response=>{
        res.json(response);
    }, id);
}

module.exports = {
    postUser,
    getUser,
    getUsers
}