const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListNameSchema = new Schema({
    projectID: {
        type: String,
        require: true
    },
    listName: {
        type: String,
        require: true
    }
}, { timestamps: true })

// ListNameSchema.set('toJSON', {
//     transform: function (doc, ret) {
//     }
// })

const ListName = mongoose.model('ListName', ListNameSchema)
module.exports = ListName