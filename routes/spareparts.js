const express = require('express')
const router = express.Router()

const {
    getSpareParts,
    getSparePart,
    createSparePart,
    updateSparePart,
    deleteSparePart
} = require('../controllers/spareparts.controller.js')

router.get('/', getSpareParts)

router.get('/:sparePartsID', getSparePart)

router.post('/', createSparePart)

router.put('/:sparePartsID', updateSparePart)

router.delete('/:sparePartsID', deleteSparePart)

module.exports = router