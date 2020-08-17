const express = require("express");
const router = express.Router();

const {
    createBusiness2,
    listBusiness
} = require('../controllers/businessController')

router.get('/', listBusiness)

router.post('/business/create',
    createBusiness2)


module.exports = router