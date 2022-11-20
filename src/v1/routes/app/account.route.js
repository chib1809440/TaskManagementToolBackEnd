const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/account.controller')

router.post('/', accountController.createAccount)
router.get('/', accountController.getInfo)
router.delete('/', accountController.deleteAccount)
router.post('/login', accountController.login)

module.exports = router