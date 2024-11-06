const express = require('express');

const router = express.Router();
const page_controller = require('../controllers/pages');

router.post('/', page_controller.create_page);

router.get('/', page_controller.get_page);

router.put('/:id', page_controller.update_page);

router.delete('/:id', page_controller.delete_page);

module.exports = router;
