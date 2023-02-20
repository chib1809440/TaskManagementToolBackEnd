const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    listNameId: {
        type: String,
        require: true
    },
    listName: {
        type: String,
    },
    issueType: {
        type: String,
        enum: ['New Feature', 'Improvement', 'QA Test', 'Bug'],
        default: 'New Feature'
    },
    assignee: {
        type: Array
    },
    labels: {
        type: String,
    },
    storyPointEstimate: {
        type: Number,
        default: 1
    },
    reporter: {
        type: String,
        require: true
    },
    sprint: {
        type: String,
        require: true
    },
    taskName: {
        type: String,
        require: true
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    duration: {
        type: Number,
    },
    taskDescription: {
        type: String
    },
    checkList: {
        type: Array
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// TasksSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const Tasks = mongoose.model('Tasks', TasksSchema)
module.exports = Tasks