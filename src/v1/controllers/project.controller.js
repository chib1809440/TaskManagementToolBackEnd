const Project = require('../models/project.model')
const ListName = require('../models/listName.model')
const Task = require('../models/tasks.model')
const BadRequestError = require('../../error/BadRequestError')

exports.createProject = async (req, res) => {
    try {
        console.log("createProject: ", req.body)
        req.body.members = [{
            username: req.body.owner,
            dateAdded: new Date().getTime(),
            role: 'owner'
        }]
        const result = await Project.create(req.body)
        result && res.status(200).json("Create Project successfully")
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.getProject = async (req, res) => {
    try {
        console.log("getProject: ", req.query)
        let query = {}
        let result = []
        if (req.query._id)
            query = { ...query, _id: req.query._id }
        if (req.query.member && req.query.member.length != 0) {
            query = { ...query, 'members.username': req.query.member }
        }
        console.log("query: ", query)
        result = await Project.find(query)
        if (req.query.projectName) {
            result = result.filter(project => project.projectName.search(req.query.projectName) >= 0)
        }
        console.log("result: ", result)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.updateProject = async (req, res) => {
    try {
        if (!req.body._id) {
            throw new BadRequestError("Missing id of project")
        }
        const result = await Project.findByIdAndUpdate({ _id: req.body._id }, req.body)
        result && res.status(200).json("Update Project successfully")
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.addMemberToProject = async (req, res) => {
    try {
        if (!req.body.projectId) {
            throw new BadRequestError("Missing id of project")
        }
        const getProject = await Project.findOne({ _id: req.body.projectId })
        let listMember = [...getProject.members]
        if (listMember.find(obj => obj.username == req.body.username) == undefined) {
            listMember.push({
                username: req.body.username,
                dateAdded: new Date().getTime()
            })
        } else {
            res.status(200).json(`The current user ${req.body.username} is already a member of the project `)
        }
        const result = await Project.findOneAndUpdate({ _id: req.body.projectId }, { members: listMember })
        result && res.status(200).json(`Added User ${req.body.username} to Project successfully`)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.getMemberToProject = async (req, res) => {
    try {
        let result = await Project.findOne({ _id: req.query.projectID })
        console.log("result.members: ", result)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        if (!req.query._id)
            throw new BadRequestError("Missing id of project")
        const result = await Project.deleteOne({ _id: req.query._id })
        result && res.status(200).json("Delete Project successfully")
    } catch (e) {
        return res.status(400).json(e.message)
    }
}


// ListTask API
exports.createListTask = async (req, res) => {
    try {
        if (!req.body.listName) {
            return res.status(400).json("Missing listName");
        }
        if (!req.body.projectID) {
            return res.status(400).json("Missing projectID");
        }
        const result = await ListName.create(req.body)
        result && res.status(200).json("Creat listTask successfully")
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.getListTask = async (req, res) => {
    try {
        let getList = []
        if (req.query._id) {
            getList = await ListName.find({ _id: req.query._id })
        } else if (req.query.projectID) {
            getList = await ListName.find({ "projectID": req.query.projectID })
        } else {
            throw new BadRequestError("Missing _id or projectID to get listname")
        }
        console.log("getList: ", getList)
        let result = []
        for (let item of getList) {
            const listNameID = item._id.toString()
            const getTask = await Task.find({ listNameId: listNameID })
            result.push({ ...item._doc, tasks: getTask })
        }
        result && res.status(200).json(result)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.updateListTask = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json("Missing listNameId");
        }
        const result = await ListName.findOneAndUpdate({ _id: req.body._id }, req.body)
        result && res.status(200).json("Update listName successfully")
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.deleteListTask = async (req, res) => {
    try {
        if (!req.query._id) {
            return res.status(400).json("Missing listNameId");
        }
        const getTaskOfListName = await Task.find({ listNameId: req.query._id })
        if (getTaskOfListName.length > 0) {
            return res.status(400).json("Currently, there are tasks on this list that cannot be deleted")
        }
        const result = await ListName.deleteOne({ _id: req.query._id })
        result && res.status(200).json("Delete listName successfully")
    } catch (err) {
        return res.status(400).json(e.message)
    }
}

// TASK API

exports.createTask = async (req, res) => {
    try {
        console.log("createTask: ", req.body)
        if (!req.body.listNameId) {
            return res.status(400).json("Missing listNameId")
        }
        if (!req.body.taskName) {
            return res.status(400).json("Missing Task name")
        }
        const getNameList = await ListName.findOne({ _id: req.body.listNameId })
        req.body.listName = getNameList.listName
        const result = await Task.create(req.body)
        result && res.status(200).json("Create Task successfully")
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.getTask = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(400).json("Missing query to task")
        }
        let result = []
        if (req.query._id) {
            result = await Task.find({ "_id": req.query._id })
        } else if (req.query.listNameID) {
            result = await Task.find({ listNameID: req.query.listNameID })
        }
        result && res.status(200).json(result)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.updateTask = async (req, res) => {
    try {
        console.log("req.body: ", req.body)
        if (!req.body._id) {
            throw new BadRequestError("Missing Id of task to update")
        }
        const get_day_of_time = (d1, d2) => {
            let ms1 = d1.getTime();
            let ms2 = d2.getTime();
            return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
        };
        if (req.body.startDate && req.body.endDate) {
            req.body.duration = get_day_of_time(new Date(req.body.startDate), new Date(req.body.endDate))
            req.body.storyPointEstimate = Math.round(req.body.duration / 2)
        }

        const result = await Task.findOneAndUpdate({ _id: req.body._id }, req.body)
        result && res.status(200).json("Update Task successfully")
    } catch (err) {
        return res.status(400).json(err.message)
    }
}