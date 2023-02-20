const addTokenToResData = require('../middlewares/addTokenTokenToResult.js')
const Role = require('../models/Role.js')

const getRoles = ((req, res) => {
    Role.find({})
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getRole = ((req, res) => {
    Role.findOne({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(() => res.status(404).json({ msg: 'Role not found' }))
})

const createRole = ((req, res) => {
    Role.create(req.body)
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateRole = ((req, res) => {
    Role.findOneAndUpdate({ _id: req.params.roleID }, req.body, { new: true, runValidators: true })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'Role not found' }))
})

const deleteRole = ((req, res) => {
    Role.findOneAndDelete({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'Role not found' }))
})

module.exports = {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole
}