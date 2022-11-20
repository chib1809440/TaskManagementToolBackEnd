const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsTaskSchema = new Schema({
    taskId: {
        type: String,
        require: true
    },
    employeeId: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    }
})

// CommentsTaskSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const CommentTask = mongoose.model('CommentTask', CommentsTaskSchema)
module.exports = CommentTask