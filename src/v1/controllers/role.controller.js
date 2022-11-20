const Roles = require('../models/roles.model')
const InternalServerError = require('../../error/InternalServerError')
const BadRequestError = require('../../error/BadRequestError')

exports.createRole = async (req, res) => {
    try {
        if (!req.body)
            throw new BadRequestError("Missing data for role")
        const result = await Roles.create(req.body)
        console.log("result:createRole ", result)
        result && res.status(200).json("Created Role successfully")
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.getRole = async (req, res) => {
    try {
        let result
        if (req.query._id) {
            result = await Roles.find({ _id: req.query._id })
        } else {
            result = await Roles.find()
        }
        console.log("result:getRole ", result)
        result && res.status(200).json(result)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
