const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
    },
    listNameId: {
        type: String,
    },
    taskId: {
        type: String,
    },
    action: {
        type: String,
        required: true,
    },
    createAt: {
        type: Number,
        default: new Date().getTime()
    }
}, { timestamps: true })

// ActivitySchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const Activity = mongoose.model('Activity', ActivitySchema)
module.exports = Activity