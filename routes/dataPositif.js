const express = require('express');
const router = express.Router();
const {authenticateJWT} = require("../controllers/auth")
const {getDataPositif, getDataPositifByID} = require("../controllers/dataPositif")

router.get("/dataPositif", authenticateJWT,getDataPositif)
router.get("/dataPositif/:id", authenticateJWT,getDataPositifByID)

module.exports = router;