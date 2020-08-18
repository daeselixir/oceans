const express = require("express");
const router = express.Router();

const {
    createBusiness,
    listBusiness,
    deleteBusiness,
    updateBusiness,
    businessId
} = require('../controllers/businessController')

router.get('/business/:businessId', businessId)
router.get('/business', listBusiness)
router.post('/business/create',
    createBusiness)
router.put('/business/:businessId', updateBusiness)
router.delete('/business/:businessId', deleteBusiness)


router.get('/business', listBusiness)

module.exports = router