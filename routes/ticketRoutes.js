const express = require('express')
const router = express.Router()

const {
    readId,
    ticketId,
    listTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    getHistorialId
} = require('../controllers/ticketController')

router.get('/ticket', listTicket)
router.get('/ticket/historial', getHistorialId)
router.get('/ticket/:ticketId', readId)
router.post('/ticket/create', createTicket)
router.put('/ticket/:ticketId', updateTicket)
router.delete('/ticket/:ticketId', deleteTicket)

router.param('ticketId', ticketId)


module.exports = router