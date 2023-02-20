const express = require('express');
const router = express.Router();
const ProjectController = require('../../controllers/project.controller')

router.get('/', ProjectController.get)
router.get('/status-rate', ProjectController.getStatusRate)
router.get('/members', ProjectController.getMember)
router.get('/tasks', ProjectController.getStatisticalTask)

module.exports = router