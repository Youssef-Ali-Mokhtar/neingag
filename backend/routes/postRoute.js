const express = require('express');
const {
    getPosts,
    getPost,
    postPost,
    deletePost,
    getUserPosts,
    getSpecificPosts,
    searchPosts,
    postComment,
    deleteComment
} = require('../controllers/postController');

const requireAuth = require('./../middleware/requireAuth');

const router = express.Router();

router.get('/', getPosts);

router.get('/interest/:category', getSpecificPosts);

router.get('/search', searchPosts);

router.get('/:userId/posts', getUserPosts);

router.get('/:id', getPost);

router.use(requireAuth);

router.post('/', postPost);

router.delete('/:id', deletePost);

router.patch('/:id/comments/', postComment);

router.delete('/:postId/:commentId/', deleteComment);



module.exports = router;