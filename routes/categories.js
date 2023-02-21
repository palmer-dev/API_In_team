const express = require('express')
const router = express.Router()

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller.js')

router.get('/', getCategories)

router.get('/:categoryID', getCategory)

router.post('/', createCategory)

router.put('/:categoryID', updateCategory)

router.delete('/:categoryID', deleteCategory)

module.exports = router