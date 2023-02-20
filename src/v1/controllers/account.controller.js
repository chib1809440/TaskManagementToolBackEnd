const Account = require('../models/account.model')
const BadRequestError = require('../../error/BadRequestError')
var md5 = require('md5');

exports.login = async (req, res) => {
    try {
        console.log("login: ", req.body)
        if (!req.body.username) {
            throw new BadRequestError("Missing username to login")
        }
        if (!req.body.password) {
            throw new BadRequestError("Missing password to login")
        }
        req.body.password = md5(req.body.password)
        const member = await Account.findOne({ username: req.body.username, password: req.body.password })
        console.log("member: ", member)
        return res.status(200).json(member)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.getInfo = async (req, res) => {
    try {
        let result = []
        if (req.query._id) {
            result = await Account.find({ _id: req.query._id })
        } else {
            result = await Account.find()
        }
        console.log("req.query.username: ", req.query.username)
        console.log("req.query.owner: ", req.query.owner)
        console.log("result: ", result)
        if (req.query.username.length > 0) {
            result = result.filter(account => account.username.search(req.query.username.toLowerCase()) >= 0 && account?.username != req.query?.owner.toLowerCase())
        }
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.createAccount = async (req, res) => {
    try {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        req.body.color = `#${randomColor}`
        const result = await Account.create(req.body)
        console.log("createAccount: ", result)
        return res.status(200).json("Create Account successfully")
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        if (!req.query._id)
            throw new BadRequestError("Missing id of account")
        const result = await Account.deleteOne({ _id: req.query._id })
        return res.status(200).json(`Delete Account ${req.query._id} successfully`)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.updateAccount = async (req, res) => {
    try {
        console.log("req.body: ", req.body)
        const result = await Account.findByIdAndUpdate(req.body._id, req.body)
        result && res.status(200).json(`Update Account ${req.query._id} successfully`)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}