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
    const limit = 5;
    const skip = (page - 1) * limit;

    User.findById(req.user._id)
    .select('bookmarks')
    .populate({
        path: 'bookmarks',
        options: { 
            sort: { createdAt: -1 },
            populate: { path: 'userId' },
            skip: skip,
            limit: limit
        }
    })
    .then(user => {
        const bookmarks = user.bookmarks;
        res.json(bookmarks);
    })
    .catch(err => {
        res.json(err);
    });
}

const checkBookmark = (req, res)=> {
    const bookmarkId = req.params.id;
    const isBookmark = req.user.bookmarks.includes(bookmarkId);
    res.json(isBookmark);
}

const getAllNotifications = (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    User.findById(req.user._id)
    .select('notifications')
    .populate({
        path: 'notifications',
        populate: {
            path: 'postId',
            select: 'comments',
            populate: {
                path: 'comments.userId',
                model: 'User',
                select: 'username avatarNum',
            },
        }
    })
        .then(user => {
            user.notifications.sort((a, b) => b.createdAt - a.createdAt);

            const paginatedNotifications = user.notifications.slice(skip, skip + limit);

            return paginatedNotifications;
        })
        .then(notifications => {
            
            let comments = notifications.map(item => {
                if(!item.postId) return null;
                const stuff = item.postId.comments.find(postComments => {
                    return postComments._id.toString() === item.commentId.toString();
                });
                
                if(!stuff) return null;

                const commentObject = {
                    comment:stuff.comment,
                    userId: stuff.userId,
                    postId: item.postId._id,
                    _id: stuff._id,
                    createdAt:stuff.createdAt
                }

                return commentObject;
            })

            comments = comments.filter(comment => comment);

            res.json(comments);
        })
        .catch(err=> {
            res.json(err);
        })
}

const resetUncheckedNotifications = (req, res) => {

    req.user.uncheckedNotifications = 0;

    req.user.save()
        .then(user => {
            res.json("Successfully reset unchecked notifications.");
        })
        .catch(err => {
            res.json(err.message);
        })
}

const getUncheckedNotifications = (req, res) => {
    res.json(req.user.uncheckedNotifications);
}


const postUpvote = (req, res)=> {
    Post.findById(req.body.postId)
        .then(post => {
            return post.addUserIdToUpvotes(req.user._id);
        })
        .then(post => {
            return req.user.addPostIdToUpvotes(post._id)
        })
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            res.json(err);
        })
}

const checkUpvote = (req, res)=> {
    const postId = req.params.id;
    const isUpvote = req.user.upvotes.includes(postId);
    res.json(isUpvote);
}

const postDownvote = (req, res)=> {
    Post.findById(req.body.postId)
        .then(post => {
            return post.addUserIdToDownvotes(req.user._id);
        })
        .then(post => {
            return req.user.addPostIdToDownvotes(post._id);
        })
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            res.json(err);
        })
}

const checkDownvote = (req, res)=> {
    const postId = req.params.id;
    const isDownvote = req.user.downvotes.includes(postId);
    res.json(isDownvote);
}

module.exports = {
    getUser,
    updateUser,
    postBookmark,
    getAllBookmarks,
    checkBookmark,
    signupUser,
    loginUser,
    getAllNotifications,
    resetUncheckedNotifications,
    getUncheckedNotifications,
    postUpvote,
    checkUpvote,
    postDownvote,
    checkDownvote,
}