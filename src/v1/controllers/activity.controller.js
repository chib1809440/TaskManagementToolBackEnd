const Activity = require('../models/activity.model')
const Tasks = require('../models/tasks.model')
const ListName = require('../models/listName.model')
const Project = require('../models/project.model')
const BadRequestError = require('../../error/BadRequestError')

exports.getAction = async (req, res) => {
    try {
        let result = []
        if (req.query.owner) {
            result = await Activity.find({ owner: req.query.owner })
        } else if (req.query._id) {
            result = await Activity.find({ _id: req.query._id })
        } else {
            result = await Activity.find()
        }
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.addAction = async (req, res) => {
    try {
        console.log("addAction: ", req.body)
        const getTask = await Tasks.findOne({ _id: req.body.taskId })
        const getListName = await ListName.findOne({ _id: getTask.listNameId })
        req.body.projectId = getListName.projectID
        req.body.listNameId = getTask.listNameId
        const result = await Activity.create(req.body)
        return res.status(200).json("Create Action successfully")
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        if (!req.query._id)
            throw new BadRequestError("Missing id of account")
        const result = await Account.deleteOne({ _id: req.query._id })
        return res.status(200).json(`Delete Account ${req.query._id} successfully`)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}