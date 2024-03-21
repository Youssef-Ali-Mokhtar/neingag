const express = require('express');
const {
    getUsers,
    getUser,
    postUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', postUser);

module.exports = router;