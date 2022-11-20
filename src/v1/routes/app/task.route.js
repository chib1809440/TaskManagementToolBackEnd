const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/project.controller')

router.post('/', projectController.createTask)
router.get('/', projectController.getTask)
router.put('/', projectController.updateTask)

module.exports = router