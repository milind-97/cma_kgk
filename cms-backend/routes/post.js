const express = require('express');

const router = express.Router();
const post_controller = require('../controllers/posts');

router.post('/', post_controller.create_post);

router.get('/', post_controller.get_posts);

router.get('/:id', post_controller.get_post_id);

router.put('/:id', post_controller.update_post);

router.delete('/:id', post_controller.delete_post);

module.exports = router;
