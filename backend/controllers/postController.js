const PostModel = require('../models/postModel');
const {ObjectId} = require('mongodb');

const getPosts = (req, res)=> {
    PostModel.fetchAll((response)=>{
        res.json(response);
    });
}

const getPost = (req, res)=> {
    const id = req.params.id;
    const objectId = ObjectId.createFromHexString(id);

    PostModel.getPost((response)=>{
        res.json(response);
    }, objectId)
}

const postPost = (req, res)=> {
    const {title, description} = req.body;
    const postModel = new PostModel(title, description);
    postModel.save((result_id)=>{
        res.json(result_id);
    });
}

module.exports = {
    getPosts,
    getPost,
    postPost
}