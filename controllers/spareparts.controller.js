const addTokenToResData = require('../middlewares/addTokenTokenToResult.js')
const SparePart = require('../models/SparePart.js')

const getSpareParts = ((req, res) => {
    SparePart.find({})
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getSparePart = ((req, res) => {
    SparePart.findOne({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(() => res.status(404).json({ msg: 'SparePart not found' }))
})

const createSparePart = ((req, res) => {
    SparePart.create(req.body)
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateSparePart = ((req, res) => {
    SparePart.findOneAndUpdate({ _id: req.params.roleID }, req.body, { new: true, runValidators: true })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'SparePart not found' }))
})

const deleteSparePart = ((req, res) => {
    SparePart.findOneAndDelete({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'SparePart not found' }))
})

module.exports = {
    getSpareParts,
    getSparePart,
    createSparePart,
    updateSparePart,
    deleteSparePart
}