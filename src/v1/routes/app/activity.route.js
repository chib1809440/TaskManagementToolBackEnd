const express = require('express');
const router = express.Router();
const activityController = require('../../controllers/activity.controller')

router.post('/', activityController.addAction)
router.get('/', activityController.getAction)
// router.delete('/', activityController.deleteAccount)

module.exports = router