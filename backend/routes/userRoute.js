const express = require('express');
const {
    getUser,
    updateUser,
    postBookmark,
    getAllBookmarks,
    checkBookmark,
    loginUser,
    signupUser
} = require('../controllers/userController');

const requireAuth = require('./../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

router.get('/profile/:id', getUser);

router.use(requireAuth);

router.patch('/profile', updateUser);

router.post('/bookmarks', postBookmark);

router.get('/bookmarks', getAllBookmarks);

router.get('/bookmarks/:id', checkBookmark);


module.exports = router;
