const express = require('express');
const router = express.Router();
const {authenticateJWT} = require("../controllers/auth")
const {getLaporan, postLaporan} = require("../controllers/laporan")

router.post("/laporan", authenticateJWT, postLaporan)

router.get("/laporan",authenticateJWT, getLaporan)

module.exports = router;