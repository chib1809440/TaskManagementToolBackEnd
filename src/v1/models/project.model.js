const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    tagNameProject: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    managedBy: {
        type: String,
    },
    members: [
        {
            username: {
                type: String,
            },
            dateAdded: {
                type: Number,
            },
            role: {
                type: String,
                default: 'member'
            }
        }
    ],
    status: {
        type: String,
        enum: ['in-progress', 'on-hold'],
        default: 'in-progress'
    }
}, { timestamps: true })

// ProjectSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project