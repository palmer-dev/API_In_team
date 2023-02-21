const addTokenToResData = require('../middlewares/addTokenTokenToResult.js')
const Category = require('../models/Category.js')

const getCategories = ((req, res) => {
    Category.find({})
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(error => res.status(500).json({ msg: error }))
})

const getCategory = ((req, res) => {
    Category.findOne({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch(() => res.status(404).json({ msg: 'Category not found' }))
})

const createCategory = ((req, res) => {
    Category.create(req.body)
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateCategory = ((req, res) => {
    Category.findOneAndUpdate({ _id: req.params.roleID }, req.body, { new: true, runValidators: true })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'Category not found' }))
})

const deleteCategory = ((req, res) => {
    Category.findOneAndDelete({ _id: req.params.roleID })
        .then(result => addTokenToResData(req, res, 200, { result }))
        .catch((error) => res.status(404).json({ msg: 'Category not found' }))
})

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}