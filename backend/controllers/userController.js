const User = require('../models/userModel');
const Post = require('../models/postModel');
const createToken = require('../util/createToken');

const loginUser = (req, res)=> {
    const {
        email, 
        password
    } = req.body;

    User.login(email, password)
        .then(user=> {
            const token = createToken(user._id);
            res.status(200).json({userId: user._id, token});
        })
        .catch(err=> {
            res.status(400).json(err.message);
        })
}

const signupUser = (req, res)=> {
    const {
        username,
        email,
        password
    } = req.body;

    User.signup(username, email, password)
        .then(user=> {
            const token = createToken(user._id);

            res.status(200).json({userId: user._id, token});
        })
        .catch(err=>{
            console.log(err.message);
            res.status(400).json(err.message);
        });
    
}

const getUser = (req, res)=> {
    const { id } = req.params;

    User.findById(id)
    .then(response=> {
        res.json(response);
    })
    .catch(err=> {
        console.log(err);
    })
}

const updateUser = (req, res)=> {
    User.updateOne(
        {_id: req.user._id},
        {username: req.body.username}
    )
        .then(response=>{
            console.log(response);
            res.json(response);
        })
        .catch(err=>{
            console.log(err);
            res.json(err);
        })
}

const postBookmark = (req, res)=> {

    Post.findById(req.body.postId)
        .then(post=> {
            return req.user.addToBookmarks(post);
        })
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            res.json(err);
        })
}


const getAllBookmarks = (req, res) => {
    console.log("BOOKMARKS: ", req.user);
    req.user.populate({
        path: 'bookmarks',
        options: { 
            sort: { createdAt: -1 },
            populate: { path: 'userId' }
        }
    })
        .then(user=> {
            res.json(user.bookmarks);
        })
        .catch(err=> {
            res.json(err);
        })
}

const checkBookmark = (req, res)=> {
    const bookmarkId = req.params.id;
    const isBookmark = req.user.bookmarks.includes(bookmarkId);

    res.json(isBookmark);
}

module.exports = {
    getUser,
    updateUser,
    postBookmark,
    getAllBookmarks,
    checkBookmark,
    signupUser,
    loginUser
}