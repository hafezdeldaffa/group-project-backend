const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../controllers/auth');
const { getVaksin, getVaksinRT, getVakinByID, deleteVaksinByID } = require('../controllers/vaksin');

router.get('/vaksin', authenticateJWT, getVaksin);

router.get('/vaksin/:id', authenticateJWT, getVakinByID);

router.get('/vaksin-rt', authenticateJWT, getVaksinRT);

router.delete('/vaksin/:id', authenticateJWT, deleteVaksinByID);

module.exports = router;
