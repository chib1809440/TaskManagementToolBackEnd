const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/project.controller')

router.get('/', projectController.getTopic)
router.post('/', projectController.createTopic)
router.put('/', projectController.updateTopic)
router.delete('/', projectController.deleteTopic)

module.exports = router