const express = require("express");
const router = express.Router();

const {
    historialId,
    getHistories
} = require("../controllers/historyController");

//router.get("/history/:id", historialId);
//router.get("/history", getHistories);

module.exports = router;