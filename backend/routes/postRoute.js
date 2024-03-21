const express = require('express');
const {
    getPosts,
    getPost,
    postPost,
    deletePost
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', postPost);

router.delete('/:id', deletePost);

module.exports = router;