const express = require('express');
const {
    getUser,
    updateUser,
    postBookmark,
    getAllBookmarks,
    checkBookmark,
    loginUser,
    signupUser,
    getAllNotifications,
    resetUncheckedNotifications,
    getUncheckedNotifications,
    postUpvote,
    checkUpvote,
    postDownvote,
    checkDownvote
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

router.get('/notifications', getAllNotifications);

router.patch('/unchecked-notifications', resetUncheckedNotifications);

router.get('/unchecked-notifications', getUncheckedNotifications);

router.post('/upvotes', postUpvote);

router.get('/upvotes/:id', checkUpvote);

router.post('/downvotes', postDownvote);

router.get('/downvotes/:id', checkDownvote);

module.exports = router;
