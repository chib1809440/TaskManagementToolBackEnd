const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    tagName: {
        type: String,
    },
    storyPoint: {
        type: Number,
        default: 0
    },
    color: { type: String, }
}, { timestamps: true })

AccountSchema.set('toJSON', {
    transform: function (doc, ret) {

        // delete ret.password
    }
})

const Account = mongoose.model('Account', AccountSchema)
module.exports = Account