const express = require('express');
const {
    getPosts,
    getPost,
    postPost,
    deletePost,
    getUserPosts
} = require('../controllers/postController');

const requireAuth = require('./../middleware/requireAuth');

const router = express.Router();

router.get('/', getPosts);

router.get('/:userId/posts', getUserPosts);

router.get('/:id', getPost);

router.use(requireAuth);

router.post('/', postPost);

router.delete('/:id', deletePost);

module.exports = router;