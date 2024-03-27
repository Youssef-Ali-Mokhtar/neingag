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

const getPost = (req, res)=> {
    const postId = req.params.id;

    Post.findById(postId)
        .then(post=> {
            res.json(post);
        })
        .catch(err=>{
            console.log(err);
        });
}

const postPost = (req, res)=> {
    const {title, description} = req.body;
    const post = new Post({
        title: title, 
        description: description,
        userId: req.user._id
    });

    post.save()
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            console.log(err);
        })
}

const deletePost = (req, res)=> {
    const id = req.params.id;

    Post.findByIdAndDelete(id)
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            res.json(err);
        })
    
}

module.exports = {
    postPost,
    getPosts,
    getPost,
    deletePost
}