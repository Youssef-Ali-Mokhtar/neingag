const express = require('express');
const {
    getUsers,
    updateUser,
    postBookmark,
    getAllBookmarks
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

router.patch('/', updateUser);

router.post('/bookmarks', postBookmark);

router.get('/bookmarks', getAllBookmarks);

// router.get('/bookmarks', getAllBookmarks);

// router.get('/:id', getUser);

// router.post('/', postUser);

// router.patch('/bookmarks/:id', postBookmark);



module.exports = router;