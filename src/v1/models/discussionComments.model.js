const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionCommentsSchema = new Schema({
    discussionId: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    }
}, { timestamps: true })

// DiscussionCommentsSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const DiscussionComments = mongoose.model('DiscussionComments', DiscussionCommentsSchema)
module.exports = DiscussionComments