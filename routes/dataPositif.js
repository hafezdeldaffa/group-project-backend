const express = require('express');
const router = express.Router();
const {authenticateJWT} = require("../controllers/auth")
const {getDataPositif} = require("../controllers/dataPositif")

router.get("/dataPositif", authenticateJWT,getDataPositif)

module.exports = router;