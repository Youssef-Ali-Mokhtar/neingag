const UserModel = require('../models/userModel');
const PostModel = require('../models/postModel');

const postUser = (req, res)=> {
    const {
        username,
        email
    } = req.body;

    const userModel = new UserModel(username, email, { postIds:[] });
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

const postBookmark = (req, res)=> {
    const postId = req.params.id;
    PostModel.getPost(post=>{
        req.user.addToBookmarks(response=>{
            res.json(response);
        }, post)
    }, postId);
}

const getAllBookmarks = (req, res) => {
    req.user.fetchAllBookmarks(posts=>{
        res.json(posts);
    })
}

module.exports = {
    postUser,
    getUser,
    getUsers,
    postBookmark,
    getAllBookmarks
}