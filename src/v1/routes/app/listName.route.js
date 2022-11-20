const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/project.controller')

router.post('/', projectController.createListTask)
router.get('/', projectController.getListTask)
router.put('/', projectController.updateListTask)
router.delete('/', projectController.deleteListTask)

module.exports = router