

exports.getProject = async query => {
    try {
        return await Project.find(query).lean()
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.createProject = async data => {
    try {
        return await Project.create(data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.updateProject = async (_id, data) => {
    try {
        return await Project.findByIdAndUpdate({ _id: _id }, data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.deleteProject = async query => {
    try {
        return await Project.deleteOne(query)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

// TOPICS 

exports.getTopic = async query => {
    try {
        return await Topic.find(query)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.createTopic = async data => {
    try {
        return await Topic.create(data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.updateTopic = async data => {
    try {
        return await Topic.findOneAndUpdate({ _id: data._id }, data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.deleteTopic = async query => {
    try {
        const deleteTopic = await Topic.findOneAndDelete(query)
        const deleteListTaskOfTopic = await ListName.findOneAndDelete({ topicId: query._id })
        return { deleteTopic, deleteListTaskOfTopic }
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

// ListTask

exports.getListTask = async query => {
    try {
        const result = []
        const listName = await ListName.find(query)
        for (let list of listName) {
            const taskofListName = await Task.find({ listNameId: list._id })
            result.push({ ...list._doc, detail: taskofListName })
        }
        return result
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.createListTask = async data => {
    try {
        return await ListName.create(data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.updateListTask = async data => {
    try {
        return await ListName.findOneAndUpdate({ _id: data._id }, data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.deleteListTask = async query => {
    try {
        const deleteTopic = await ListName.findOneAndDelete(query)
        const deleteTaskOfTListTask = await Task.findOneAndDelete({ listNameId: query._id })
        return { deleteTopic, deleteTaskOfTopic }
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

//  TASK

exports.getTask = async query => {
    try {
        if (!query) {
            throw new BadRequestError("Missing query to getTask")
        }
        return await Task.find(query)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.createTask = async data => {
    try {
        return await Task.create(data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}

exports.updateTask = async data => {
    try {
        return await Task.findOneAndUpdate({ _id: data._id }, data)
    } catch (e) {
        throw new InternalServerError(e.message)
    }
}