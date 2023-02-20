const express = require('express')
const router = express.Router()

const {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole
} = require('../controllers/roles.controller.js')

router.get('/', getRoles)

router.get('/:roleID', getRole)

router.post('/', createRole)

router.put('/:roleID', updateRole)

router.delete('/:roleID', deleteRole)

module.exports = router