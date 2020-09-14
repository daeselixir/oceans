const express = require("express");
const router = express.Router();


const {
    createDepartament,
    listDepartament,
    deleteDepartament,
    updateDepartament,
    departamentId,
    readId

} = require('../controllers/departamentController')

router.get('/departament/:depId', readId)
router.get('/departament', listDepartament)
router.post('/departament/create', createDepartament)
router.put('/departament/:depId', updateDepartament)
router.delete('/departament/:depId', deleteDepartament)

router.param('depId', departamentId)

module.exports = router