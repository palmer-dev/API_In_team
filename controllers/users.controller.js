const addTokenToResData = require('../middlewares/addTokenTokenToResult.js')
const User = require('../models/User.js')

const getUsers = ((req, res) => {
    User.find({})
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getUser = ((req, res) => {
    User.findOne({ _id: req.params.userID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(() => res.status(404).json({ msg: 'User not found' }))
})

const createUser = ((req, res) => {
    User.create(req.body)
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateUser = ((req, res) => {
    User.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true, runValidators: true })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'User not found' }))
})

const deleteUser = ((req, res) => {
    User.findOneAndDelete({ _id: req.params.userID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'User not found' }))
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}