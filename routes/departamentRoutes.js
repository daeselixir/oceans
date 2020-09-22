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

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/authController')
const {
    userById
} = require('../controllers/userController')

router.get('/departament/:depId', readId)
router.get('/departament/list/:userId', isAdmin, listDepartament)
router.post('/departament/create/:userId', requireSignin, isAuth, isAdmin, createDepartament)
router.put('/departament/:depId', updateDepartament)
router.delete('/departament/:depId', deleteDepartament)

router.param('depId', departamentId)
router.param('userId', userById)


module.exports = router