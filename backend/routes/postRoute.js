const express = require('express');
const {
    getPosts,
    getPost,
    postPost
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', postPost);

module.exports = router;