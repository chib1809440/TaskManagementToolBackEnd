const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    projectId: {
        type: String,
        require: true
    },
    topicId: {
        type: String,
        require: true
    },
    discussionRoomName: {
        type: String,
    },
    members: {
        type: Array
    }

}, { timestamps: true })

// DiscussionSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const Topics = mongoose.model('Topics', DiscussionSchema)
module.exports = Topics