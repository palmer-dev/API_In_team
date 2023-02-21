const express = require('express')
const router = express.Router()

const {
    getMaintenances,
    getMaintenance,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
} = require('../controllers/maintenance.controller.js')

router.get('/', getMaintenances)

router.get('/:maintenanceID', getMaintenance)

router.post('/', createMaintenance)

router.put('/:maintenanceID', updateMaintenance)

router.delete('/:maintenanceID', deleteMaintenance)

module.exports = router