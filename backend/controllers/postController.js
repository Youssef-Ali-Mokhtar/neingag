const PostModel = require('../models/postModel');

const getPosts = (req, res)=> {
    res.json(PostModel.getPosts());
}

const getPost = (req, res)=> {
    const id = req.params.id;
    try {
        return res.json(PostModel.getPost(id));
    } catch(err) {
        console.log(err.message);
        return res.json(err.message);
    }
}

const postPost = (req, res)=> {
    const {id, title, description} = req.body;
    const postModel = new PostModel(id, title, description);
    res.json(postModel.savePost());
}

module.exports = {
    getPosts,
    getPost,
    postPost
}