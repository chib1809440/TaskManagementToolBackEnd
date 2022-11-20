const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
    roleName: {
        type: String,
        enum: ['Manager', 'Leader', 'Member']
    },
    description: {
        type: String
    }
}, { timestamps: true })

// RolesSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const Role = mongoose.model('Role', RolesSchema)
module.exports = Role