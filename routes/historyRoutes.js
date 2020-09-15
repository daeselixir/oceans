const express = require("express");
const router = express.Router();

const { listHistory } = require("../controllers/historyController");

router.get("/history", listHistory);

module.exports = router;
