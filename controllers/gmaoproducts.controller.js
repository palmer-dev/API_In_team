const addTokenToResData = require('../middlewares/addTokenTokenToResult.js')
const GmaoProduct = require('../models/GmaoProduct.js')

const getGmaoProducts = ((req, res) => {
    GmaoProduct.find({})
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getGmaoProduct = ((req, res) => {
    GmaoProduct.findOne({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(() => res.status(404).json({ msg: 'GmaoProduct not found' }))
})

const createGmaoProduct = ((req, res) => {
    GmaoProduct.create(req.body)
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateGmaoProduct = ((req, res) => {
    GmaoProduct.findOneAndUpdate({ _id: req.params.roleID }, req.body, { new: true, runValidators: true })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'GmaoProduct not found' }))
})

const deleteGmaoProduct = ((req, res) => {
    GmaoProduct.findOneAndDelete({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'GmaoProduct not found' }))
})

module.exports = {
    getGmaoProducts,
    getGmaoProduct,
    createGmaoProduct,
    updateGmaoProduct,
    deleteGmaoProduct
}