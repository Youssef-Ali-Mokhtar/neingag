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
            res.status(200).json({
                userId: user._id,
                avatarNum: user.avatarNum,
                username: user.username, 
                token
            });
        })
        .catch(err=> {
            res.status(400).json(err.message);
        })
}

const signupUser = (req, res)=> {
    const {
        username,
        email,
        password,
        bio,
        avatarNum
    } = req.body;
    
    User.signup(username, email, password, bio, avatarNum)
        .then(user=> {
            const token = createToken(user._id);

            res.status(200).json({
                userId: user._id,
                avatarNum: user.avatarNum,
                username: user.username, 
                token
            });
        })
        .catch(err=> {
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
    console.log(req.user._id);
    const {
        username,
        bio,
        avatarNum
    } = req.body;

    User.findByIdAndUpdate(
        req.user._id,
        { username, bio, avatarNum },
    )
        .then(response=>{
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
    
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    User.findById(req.user._id)
        .populate({
        path: 'bookmarks',
        options: { 
            sort: { createdAt: -1 },
            populate: { path: 'userId' }
        }
    })
        .skip(skip)
        .limit(limit)
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