const express = require('express');
const {
    getUsers,
    getUser,
    postUser,
    postBookmark,
    getAllBookmarks
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

router.get('/bookmarks', getAllBookmarks);

router.get('/:id', getUser);

router.post('/', postUser);

router.patch('/bookmarks/:id', postBookmark);



module.exports = router;