const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../controllers/auth');
const { getVaksin, getVaksinRT } = require('../controllers/vaksin');

router.get('/vaksin', authenticateJWT, getVaksin);

router.get('/vaksin-rt', authenticateJWT, getVaksinRT);

module.exports = router;
