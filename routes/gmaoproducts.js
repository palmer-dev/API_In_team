const express = require('express')
const router = express.Router()

const {
    getGmaoProducts,
    getGmaoProduct,
    createGmaoProduct,
    updateGmaoProduct,
    deleteGmaoProduct
} = require('../controllers/gmaoproducts.controller.js')

router.get('/', getGmaoProducts)

router.get('/:gmaoProductId', getGmaoProduct)

router.post('/', createGmaoProduct)

router.put('/:gmaoProductId', updateGmaoProduct)

router.delete('/:gmaoProductId', deleteGmaoProduct)

module.exports = router