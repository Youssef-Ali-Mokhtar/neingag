const Post = require('../models/postModel');

const getPosts = (req, res)=> {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    Post.find().sort({createdAt: -1})
        .populate('userId')
        .skip(skip)
        .limit(limit)
        .then(posts=> {
            res.json(posts);
        })
        .catch(err=>{
            console.log(err);
        })
}

const getSpecificPosts = (req, res)=> {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    
    Post.find({category: category}).
        sort({createdAt: -1})
        .populate('userId')
        .skip(skip)
        .limit(limit)
        .then(posts=> {
            res.json(posts);
        })
        .catch(err=>{
            console.log(err);
        })
}

const searchPosts = (req, res)=> {
    const {query} = req.query
    const regexPattern = new RegExp(query.split(/\s+/).map(word => `${word}`).join('|'), 'i');

    Post.find({ title: { $regex: regexPattern } })
        .sort({createdAt: -1})
        .populate('userId')
        .then(posts=> {
            res.json(posts);
        })
        .catch(err=>{
            console.log(err);
        })
}

const getPost = (req, res)=> {
    const postId = req.params.id;

    Post.findById(postId)
        .populate('userId')
        .populate({
            path: 'comments',
            populate: {
                path: 'userId'
            }
        })
        .then(post=> {
            res.json(post);
        })
        .catch(err=>{
            console.log(err);
        });

}

const postPost = (req, res)=> {
    const {title, description, category} = req.body;

    const post = new Post({
        title: title, 
        description: description,
        category: category,
        comments:[],
        userId: req.user._id
    });

    post.save()
        .then(result=> {
            res.json(result);
        })
        .catch(err=> {
            console.log(err);
        })
}

const deletePost = (req, res)=> {
    const id = req.params.id;
    Post.deletePost(id, req.user._id)
        .then(response=> {
            res.status(200).json(response);
        })
        .catch(err=> {
            console.log(err.message);
            res.status(401).json(err.message);
        })
}

const getUserPosts = (req, res)=> {
    const userId = req.params.userId;

    Post.find({userId: userId})
    .sort({createdAt: -1})
    .populate('userId')
    .then(response=> {
        res.json(response);
    })
    .catch(err=> {
        res.json(err);
    })
}

const postComment = (req, res)=> {
    const postId = req.params.id;
    const userId = req.user._id;
    const comment = req.body.comment;

    Post.postComment(postId, userId, comment)
        .then(updatedPost=> {
            console.log(updatedPost);
            res.json(updatedPost);
        })
}


module.exports = {
    postPost,
    getPosts,
    getPost,
    deletePost,
    getUserPosts,
    getSpecificPosts,
    searchPosts,
    postComment
}