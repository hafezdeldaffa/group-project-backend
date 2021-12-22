/* 
    CONTROLLER UNTUK CRUD ANGGOTA KELUARGA
*/

const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const { validationResult } = require('express-validator');
const { errorHandling } = require('./errorHandling');

exports.postAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from request body */
    const { nama, role, statusCovid } = req.body;

    /* Get data from jwt */
    const { email } = req.user;

    /* Find data keluarga by email */
    const keluarga = await Keluarga.findOne({ email: email });

    /* Get id and tokenRT from keluarga  */
    const keluargaId = keluarga._id;
    const tokenRT = keluarga.tokenRT;

    /* Create new Anggota Keluarga */
    const newAnggota = new AnggotaKeluarga({
      nama: nama,
      role: role,
      statusCovid: statusCovid,
      tokenRT: tokenRT,
      keluargaId: keluargaId,
    });

    /* Save to db */
    const anggota = await newAnggota.save();

    /* Send response */
    res.status(201).json({
      message: 'Anggota Keluarga Berhasil Dibuat',
      anggotaKeluarga: anggota,
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Get data from jwt */
    const { email } = req.user;

    /* Find data keluarga by email */
    const keluarga = await Keluarga.findOne({ email: email });

    /* Get id from keluarga  */
    const keluargaId = keluarga._id;

    /* Find data keluarga by keluargaId */
    const anggotaKeluarga = await AnggotaKeluarga.find({
      keluargaId: keluargaId,
    });

    if (anggotaKeluarga) {
      /* Send response */
      res.status(200).json({
        message: 'Anggota Keluarga Found',
        anggotaKeluarga: anggotaKeluarga,
      });
    } else {
      /* Send response */
      res.status(404).message({ message: 'Anggota Keluarga Tidak Ditemukan' });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.putAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from request body */
    const { nama, role, statusCovid } = req.body;

    /* Get id from request params */
    const { id } = req.params;

    /* Create new Anggota Keluarga */
    const newAnggota = {
      nama: nama,
      role: role,
      statusCovid: statusCovid,
    };

    /* Find by id and Update to db */
    const updatedAnggota = await AnggotaKeluarga.findByIdAndUpdate(
      id,
      newAnggota,
      { new: true }
    );

    if (updatedAnggota) {
      /* Send response */
      res.status(200).json({
        message: 'Anggota Keluarga Berhasil Diupdate',
        anggotaKeluarga: updatedAnggota,
      });
    } else {
      /* Send response */
      res.status(404).message({ message: 'Anggota Keluarga Tidak Ditemukan' });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Get id from request params */
    const { id } = req.params;

    /* Find data anggota keluarga by id */
    const anggota = await AnggotaKeluarga.findOne({ _id: id });

    if (anggota) {
      /* Find data anggota by id and delete */
      await AnggotaKeluarga.findByIdAndDelete(id);

      /* Send Response */
      res.status(200).json({ message: 'Delete Anggota Keluarga Berhasil' });
    } else {
      /* Send Response */
      res.status(404).message({ message: 'Anggota Keluarga Tidak Ditemukan' });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
