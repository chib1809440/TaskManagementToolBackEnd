const router = require('express').Router();

// @@app router import
const roleAppRouter = require('./app/role.route.js')
const accountAppRouter = require('./app/account.route')
const projectAppRouter = require('./app/project.route')
const listNameAppRouter = require('./app/listName.route')
const taskAppRouter = require('./app/task.route')
const ActivityAppRouter = require('./app/activity.route')


// @@app api
router.use('/roles', roleAppRouter)
router.use('/accounts', accountAppRouter)
router.use('/projects', projectAppRouter)
router.use('/listNames', listNameAppRouter)
router.use('/tasks', taskAppRouter)
router.use('/activity', ActivityAppRouter)

module.exports = router