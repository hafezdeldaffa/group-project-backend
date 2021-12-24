const express = require('express');
const router = express.Router();
const {authenticateJWT} = require("../controllers/auth")
const {getWargaRT} = require("../controllers/dataWargaRT")

router.get("/warga-RT", authenticateJWT, getWargaRT)

module.exports = router;