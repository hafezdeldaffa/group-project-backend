const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../controllers/auth');
const {
  getVaksin,
  getVaksinRT,
  getVaksinByID,
} = require('../controllers/vaksin');

router.get('/vaksin', authenticateJWT, getVaksin);

router.get('/vaksin/:id', authenticateJWT, getVaksinByID);

router.get('/vaksin-rt', authenticateJWT, getVaksinRT);

module.exports = router;
