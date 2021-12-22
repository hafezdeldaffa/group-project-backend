const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {authenticateJWT} = require("../controllers/auth")
const {getLaporan, postLaporan, deleteLaporan} = require("../controllers/laporan")

router.post("/laporan", authenticateJWT, postLaporan)
router.get("/laporan",authenticateJWT, getLaporan)
router.delete("/laporan/:id", authenticateJWT, deleteLaporan)

module.exports = router;