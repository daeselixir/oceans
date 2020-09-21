const express = require("express");
const router = express.Router();

const {
  readId,
  ticketId,
  listTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  historialList,
  historialId,
  readHistoryId,
} = require("../controllers/ticketController");

router.get("/ticket", listTicket);
router.get("/ticket/historial", historialList);
router.get("/ticket/:ticketId", readId);
router.get("/ticket/historial/:historyId", readHistoryId);
router.post("/ticket/create", createTicket);
router.put("/ticket/:ticketId", updateTicket);
router.delete("/ticket/:ticketId", deleteTicket);

router.param("ticketId", ticketId);
router.param("historyId", historialId);

module.exports = router;
