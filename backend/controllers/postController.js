const PostModel = require('../models/postModel');

const getPosts = (req, res)=> {
    PostModel.fetchAll((response)=>{
        res.json(response);
    });
}

const getPost = (req, res)=> {
    const id = req.params.id;

    PostModel.getPost((response)=>{
        res.json(response);
    }, id);
}

const postPost = (req, res)=> {
    const {title, description} = req.body;
    const userId = req.user._id;
    console.log("HEY!");
    const postModel = new PostModel(title, description, userId);

    postModel.save((result_id)=>{
        res.json(result_id);
    });
}

const deletePost = (req, res)=> {
    const id = req.params.id;
    console.log("Delete this: ",id);
    PostModel.delete(response=>{
        res.json(response);
    }, id);

}

module.exports = {
    getPosts,
    getPost,
    postPost,
    deletePost
}