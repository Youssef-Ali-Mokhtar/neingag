const Post = require('../models/postModel');

const getPosts = (req, res)=> {

    Post.find().sort({createdAt: -1})
        .populate('userId')
        .then(posts=> {
            res.json(posts);
        })
        .catch(err=>{
            console.log(err);
        })
}

const getSpecificPosts = (req, res)=> {
    const category = req.params.category;

    Post.find({category: category}).
        sort({createdAt: -1})
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
    console.log(postId);
    Post.findById(postId)
        .populate('userId')
        .then(post=> {
            res.json(post);
        })
        .catch(err=>{
            console.log(err);
        });
}

const postPost = (req, res)=> {
    const {title, description, category} = req.body;
    console.log("TEST", req.user);
    const post = new Post({
        title: title, 
        description: description,
        category: category,
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
    .populate('userId')
    .then(response=> {
        res.json(response);
    })
    .catch(err=> {
        res.json(err);
    })
}

module.exports = {
    postPost,
    getPosts,
    getPost,
    deletePost,
    getUserPosts,
    getSpecificPosts
}