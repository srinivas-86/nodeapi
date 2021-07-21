const express = require('express');
const {getPosts, createPost } = require('../controllers/post.js');
const {createPostValidator} = require('../validators');

const router = express.Router();

router.get('/', getPosts)
router.post('/post', createPostValidator, createPost)

module.exports = router;