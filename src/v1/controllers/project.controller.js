const Project = require('../models/project.model')
const ListName = require('../models/listName.model')
const Task = require('../models/tasks.model')
const Activity = require('../models/activity.model')
const Account = require('../models/account.model')
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
        result && res.status(200).json(result)
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
        const getActivity = await Activity.find({ taskId: req.query._id })
        console.log('getActivity: ', getActivity)
        result && res.status(200).json(result)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.updateTask = async (req, res) => {
    try {
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
            req.body.storyPointEstimate = Math.round(req.body.duration / 2) >= 1 ? Math.round(req.body.duration / 2) : 1
        }

        const result = await Task.findOneAndUpdate({ _id: req.body._id }, { ...req.body })
        if (req.body.isDone) {
            if (req.body.isDone == true && req.body.assignee.length > 0) {
                let getAccount = await Account.findOne({ username: req.body.assignee })
                let storyPoint = getAccount.storyPoint + result.storyPointEstimate
                await Account.findOneAndUpdate({ username: req.body.assignee }, { storyPoint: storyPoint })

            }
        }
        result && res.status(200).json("Update Task successfully")
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.getStatusRate = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(400).json("Missing project ID");
        }
        const listName = await ListName.find({ projectID: req.query.projectId })
        let statistical = []
        const listColor = ['#97FFFF', '#FF0000', '#33FF00', '#00FF00', '#ffff', '#000']
        let onComplete = 0
        let temp = 0
        for (let i of listName) {
            const status = i.listName
            let detail = await Task.find({ listNameId: i._id })
            let getIsDone = await Task.find({ listNameId: i._id, isDone: true })
            onComplete += getIsDone.length
            statistical.push({
                name: status,
                listTask: detail,
                population: detail.length,
                color: (listColor[temp]),
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            })
            temp++
        }
        statistical.push({
            name: 'Complete',
            population: onComplete,
            color: '#008080',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        })

        return res.status(200).json(statistical)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.getMember = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(400).json("Missing project ID");
        }

        const listMembers = await Project.findOne({ _id: req.query.projectId })
        console.log("listMembers: ", listMembers.members)
        const detail = []
        for (let i in listMembers.members) {
            const mem = await Account.findOne({ username: listMembers.members[i].username })
            console.log("mem: ", mem)
            detail.push([++i, mem.username, mem.storyPoint])
        }
        return res.status(200).json(detail)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.getStatisticalTask = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(400).json("Missing project ID");
        }
        const getListName = await ListName.find({ projectID: req.query.projectId })
        let result = []
        for (let i in getListName) {
            const detail = await Task.find({ listNameId: getListName[i]._id }).sort({ 'createdA': -1 })
            console.log("detail: ", detail)
            result = [...result, ...detail.reduce((prev, curr) =>
                [...prev, [++i, curr.taskName, JSON.stringify(curr.isDone), curr.storyPointEstimate, curr.assignee[0]]]
                , [])]
        }
        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}

exports.get = async (req, res) => {
    try {
        const project = await Project.countDocuments()
        const task = await Task.countDocuments()
        const user = await Account.countDocuments()
        const activity = await Activity.countDocuments()

        //chart days
        let Monday = 0
        let Tuesday = 0
        let Wednesday = 0
        let Thursday = 0
        let Friday = 0
        let Saturday = 0

        let t1 = 0
        let t2 = 0
        let t3 = 0
        let t4 = 0
        let t5 = 0
        let t6 = 0
        let t7 = 0
        let t8 = 0
        let t9 = 0
        let t10 = 0
        let t11 = 0
        let t12 = 0
        const chartCountTask = await Task.find()
        // console.log("chartCountTask: ", chartCountTask)
        for (let i of chartCountTask) {
            const day = new Date(i.createdAt).getDay()
            switch (day) {
                case 1: Monday += 1
                    break
                case 2: Tuesday++
                    break
                case 3: Wednesday++
                    break
                case 4: Thursday++
                    break
                case 5: Friday++
                    break
                case 6: Saturday++
                    break
            }

            const month = new Date(i.createdAt).getMonth()
            switch (month) {
                case 0: t1++
                    break
                case 1: t2++
                    break
                case 2: t3++
                    break
                case 3: t4++
                    break
                case 4: t5++
                    break
                case 5: t6++
                    break
                case 6: t7++
                    break
                case 7: t8++
                    break
                case 8: t9++
                    break
                case 9: t10++
                    break
                case 11: t12++
                    break
            }
        }

        let t1a = 0
        let t2a = 0
        let t3a = 0
        let t4a = 0
        let t5a = 0
        let t6a = 0
        let t7a = 0
        let t8a = 0
        let t9a = 0
        let t10a = 0
        let t11a = 0
        let t12a = 0
        const listTaskIsDone = await Task.find({ isDone: true })

        for (let i of listTaskIsDone) {
            const month = new Date(i.createdAt).getMonth()
            switch (month) {
                case 0: t1a++
                    break
                case 1: t2a++
                    break
                case 2: t3a++
                    break
                case 3: t4a++
                    break
                case 4: t5a++
                    break
                case 5: t6a++
                    break
                case 6: t7a++
                    break
                case 7: t8a++
                    break
                case 8: t9a++
                    break
                case 9: t10a++
                    break
                case 11: t12a++
                    break
            }
        }

        const listProject = await Project.find()

        let resultListProject = []
        for (let i of listProject) {
            const listMember = []
            for (let j of i.members) {
                listMember.push(['team', j.username])
            }
            resultListProject.push({

                name: i.projectName,
                members: listMember
            })

        }
        console.log("resultListProject: ", resultListProject)
        return res.status(200).json({
            project: project,
            task: task,
            user: user,
            activity: activity,
            Reports: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday],
            Reports1: [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12],
            Reports2: [t1a, t2a, t3a, t4a, t5a, t6a, t7a, t8a, t9a, t10a, t11a, t12a],
            ListProject: resultListProject,
        })
    } catch (err) {
        return res.status(400).json(err.message)
    }
}
