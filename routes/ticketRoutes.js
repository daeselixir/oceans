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

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");
const { userById } = require("../controllers/userController");

router.get("/ticket/:userId", requireSignin, isAuth, isAdmin, listTicket);
router.get(
  "/ticket/historial/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  historialList
);

//Routes

router.get("/ticket/:userId/:ticketId", requireSignin, isAuth, isAdmin, readId);

router.get(
  "/ticket/historial/:userId/:historyId",
  requireSignin,
  isAuth,
  isAdmin,
  readHistoryId
);

router.post(
  "/ticket/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createTicket
);

router.put(
  "/ticket/:userId/:ticketId",
  requireSignin,
  isAuth,
  isAdmin,
  updateTicket
);

router.delete(
  "/ticket/:userId/:ticketId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteTicket
);

router.param("ticketId", ticketId);
router.param("historyId", historialId);
router.param("userId", userById);

module.exports = router;
