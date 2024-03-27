const express = require('express');
const {
    getUsers,
    updateUser,
    postBookmark,
    getAllBookmarks,
    checkBookmark,
    loginUser,
    signupUser,
    postUser
} = require('../controllers/userController');

const router = express.Router();


router.post('/', postUser);

router.post('/login', loginUser);

router.post('/signup', signupUser);

router.get('/', getUsers);

router.patch('/', updateUser);

router.post('/bookmarks', postBookmark);

router.get('/bookmarks', getAllBookmarks);

router.get('/bookmarks/:id', checkBookmark);



module.exports = router;