const User = require('../models/userModel');
const Post = require('../models/postModel');
// const PostModel = require('../models/postModel');

// const postUser = (req, res)=> {
//     const {
//         username,
//         email
//     } = req.body;

//     const userModel = new UserModel(username, email, { postIds:[] });
//     userModel.save(userId=> {
//         res.json(userId);
//     });
// }


const getUsers = (req, res)=> {
    User.find()
    .then(response=>{
        res.json(response);
    })
    .catch(err=>{
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
    getAllBookmarks
}