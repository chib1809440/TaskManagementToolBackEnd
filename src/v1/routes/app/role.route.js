const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/role.controller.js')

router.post('/', roleController.createRole)
router.get('/', roleController.getRole)

module.exports = router