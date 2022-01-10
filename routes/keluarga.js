const express = require('express');
const {
  postAnggotaKeluarga,
  getAnggotaKeluarga,
  putAnggotaKeluarga,
  deleteAnggotaKeluarga,
  getStatusCovid,
  getAnggotaKeluargaById,
} = require('../controllers/anggotaKeluarga');
const router = express.Router();
const { body } = require('express-validator');
const { authenticateJWT } = require('../controllers/auth');

router.post(
  '/anggota-keluarga',
  authenticateJWT,
  [
    body('nama').trim().isString().not().isEmpty(),
    body('role').trim().isString().not().isEmpty(),
    body('statusCovid').trim().isString().not().isEmpty(),
  ],
  postAnggotaKeluarga
);

router.get('/anggota-keluarga', authenticateJWT, getAnggotaKeluarga);

router.put(
  '/anggota-keluarga/:id',
  authenticateJWT,
  [
    body('nama').trim().isString().not().isEmpty(),
    body('role').trim().isString().not().isEmpty(),
    body('statusCovid').trim().isString().not().isEmpty(),
  ],
  putAnggotaKeluarga
);

router.get('/anggota-keluarga/:id', authenticateJWT, getAnggotaKeluargaById);

router.delete('/anggota-keluarga/:id', authenticateJWT, deleteAnggotaKeluarga);

router.get('/anggota-keluarga/status-covid', authenticateJWT, getStatusCovid);

module.exports = router;
