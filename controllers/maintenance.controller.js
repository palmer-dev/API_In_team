const addTokenToResData = require('../middlewares/addTokenTokenToResult.js')
const Maintenance = require('../models/Maintenance.js')

const getMaintenances = ((req, res) => {
    Maintenance.find({})
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getMaintenance = ((req, res) => {
    Maintenance.findOne({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(() => res.status(404).json({ msg: 'Maintenance not found' }))
})

const createMaintenance = ((req, res) => {
    Maintenance.create(req.body)
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateMaintenance = ((req, res) => {
    Maintenance.findOneAndUpdate({ _id: req.params.roleID }, req.body, { new: true, runValidators: true })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'Maintenance not found' }))
})

const deleteMaintenance = ((req, res) => {
    Maintenance.findOneAndDelete({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'Maintenance not found' }))
})

module.exports = {
    getMaintenances,
    getMaintenance,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
}