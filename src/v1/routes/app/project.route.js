const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/project.controller')

router.post('/', projectController.createProject)
router.get('/', projectController.getProject)
router.put('/', projectController.updateProject)
router.delete('/', projectController.deleteProject)

router.put('/addMember', projectController.addMemberToProject)
router.get('/getMember', projectController.getMemberToProject)

module.exports = router