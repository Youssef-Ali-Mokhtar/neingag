const User = require('../models/userModel');
const Post = require('../models/postModel');
const createToken = require('../util/createToken');

const postUser = (req, res)=> {
    const {
        username,
        email,
        password
    } = req.body;
        
    const user = new User(
        {
            username: username,
            email: email,
            password: password,
            bookmarks: []
        }
    );
        
    user.save()
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            res.json(err);
        });

        
}

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
            res.status(400).json({error: err.message});
        })
}

const signupUser = (req, res)=> {
    const {
        username,
        email,
        password
    } = req.body;

    User.signup(username, email, password)
        .then(user=>{
            const token = createToken(user._id);

            res.status(200).json({userId: user._id, token});
        })
        .catch(err=>{
            console.log(err.message);
            res.status(400).json({error: err.message});
        });
    
}

const getUsers = (req, res)=> {
    User.find()
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

const postBookmark = (req, res)=>{

    Post.findById(req.body.postId)
        .then(post=>{
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

    req.user.populate('bookmarks')
        .then(user=>{
            res.json(user.bookmarks);
        })
        .catch(err=>{
            res.json(err);
        })
}

const checkBookmark = (req, res)=> {
    const bookmarkId = req.params.id;
    const isBookmark = req.user.bookmarks.includes(bookmarkId);

    res.json(isBookmark);
}

// const getUser = (req, res)=> {
//     const id = req.params.id;
    
//     UserModel.getUser(response=>{
//         res.json(response);
//     }, id);
// }


module.exports = {
    getUsers,
    updateUser,
    postBookmark,
    getAllBookmarks,
    checkBookmark,
    signupUser,
    loginUser,
    postUser
}