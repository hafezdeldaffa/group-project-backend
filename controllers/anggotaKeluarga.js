/* 
    CONTROLLER UNTUK CRUD ANGGOTA KELUARGA
*/

const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const Rt = require('../models/rt');
const { validationResult } = require('express-validator');
const { errorHandling } = require('./errorHandling');
const Vaksin = require('../models/vaksin');

exports.postAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      /* Get data from request body */
      const {
        nama,
        role,
        statusCovid,
        jenis,
        tanggalDosis1,
        tanggalDosis2,
        tanggalDosis3,
        tanggalDosis4,
        dosis1,
        dosis2,
        dosis3,
        dosis4,
      } = req.body;

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

      const newVaksin = new Vaksin({
        tanggalDosis1: tanggalDosis1,
        tanggalDosis2: tanggalDosis2,
        tanggalDosis3: tanggalDosis3,
        tanggalDosis4: tanggalDosis4,
        jenis: jenis,
        dosis1: dosis1,
        dosis2: dosis2,
        dosis3: dosis3,
        dosis4: dosis4,
        keluargaId: keluargaId,
        anggotaKeluargaId: anggota._id,
        tokenRT: tokenRT,
        nama: nama,
        role: role,
      });

      await newVaksin.save();

      /* Send response */
      res.status(201).json({
        message: 'Anggota Keluarga Berhasil Dibuat',
        anggotaKeluarga: anggota,
      });
    } else {
      /* Get data from request body */
      const {
        nama,
        role,
        statusCovid,
        jenis,
        tanggalDosis1,
        tanggalDosis2,
        tanggalDosis3,
        tanggalDosis4,
        dosis1,
        dosis2,
        dosis3,
        dosis4,
      } = req.body;

      const rt = await Rt.findOne({ email: email });

      const rtId = rt._id;

      const newAnggota = new AnggotaKeluarga({
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        tokenRT: rtId,
        keluargaId: rtId,
      });

      const anggota = await newAnggota.save();

      const newVaksin = new Vaksin({
        tanggalDosis1: tanggalDosis1,
        tanggalDosis2: tanggalDosis2,
        tanggalDosis3: tanggalDosis3,
        tanggalDosis4: tanggalDosis4,
        jenis: jenis,
        dosis1: dosis1,
        dosis2: dosis2,
        dosis3: dosis3,
        dosis4: dosis4,
        keluargaId: rtId,
        anggotaKeluargaId: anggota._id,
        tokenRT: rtId,
        nama: nama,
        role: role,
      });

      await newVaksin.save();

      /* Send response */
      res.status(201).json({
        message: 'Anggota Keluarga RT Berhasil Dibuat',
        anggotaKeluarga: anggota,
      });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      /* Find data keluarga by email */
      const keluarga = await Keluarga.findOne({ email: email });
      const tokenRT = keluarga.tokenRT;

      /* Get id from keluarga  */
      const keluargaId = keluarga._id;

      /* Find data keluarga by keluargaId */
      const anggotaKeluarga = await AnggotaKeluarga.find({
        keluargaId: keluargaId,
      });

      const anggotaRT = await AnggotaKeluarga.find({ tokenRT: tokenRT });

      if (anggotaKeluarga.length) {
        /* Send response */
        res.status(200).json({
          message: 'Anggota Keluarga Found',
          anggotaKeluarga: anggotaKeluarga,
          anggotaRT: anggotaRT,
        });
      } else {
        /* Send response */
        res.status(404).json({ message: 'Anggota Keluarga Tidak Ditemukan' });
      }
    } else {
      /* Find data keluarga by email */
      const rt = await Rt.findOne({ email: email });

      /* Get id from keluarga  */
      const rtId = rt._id;

      /* Find data keluarga by keluargaId */
      const anggotaKeluarga = await AnggotaKeluarga.find({
        keluargaId: rtId,
      });

      const anggotaRT = await AnggotaKeluarga.find({ tokenRT: rtId });

      if (anggotaKeluarga.length) {
        /* Send response */
        res.status(200).json({
          message: 'Anggota Keluarga Found',
          anggotaKeluarga: anggotaKeluarga,
          anggotaRT: anggotaRT,
        });
      } else {
        /* Send response */
        res.status(404).json({ message: 'Anggota Keluarga Tidak Ditemukan' });
      }
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

exports.getStatusCovid = async (req, res, next) => {
  try {
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: email });
      const keluargaId = keluarga._id;
      const tokenRT = keluarga.tokenRT;

      const anggota = await AnggotaKeluarga.find({
        keluargaId: keluargaId,
        tokenRT: tokenRT,
      });

      const findAnggota = anggota.map(
        (element) =>
          new AnggotaKeluarga({
            nama: element.nama,
            role: element.role,
            statusCovid: element.statusCovid,
            createdAt: element.createdAt,
          })
      );

      if (anggota.length) {
        res
          .status(200)
          .json({ message: 'Anggota Keluarga Found', anggota: findAnggota });
      } else {
        res
          .status(404)
          .message({ message: 'Anggota Keluarga Tidak Ditemukan' });
      }
    } else {
      const rt = await Rt.findOne({ email: email });
      const id = rt._id;

      const anggota = await AnggotaKeluarga.find({
        keluargaId: id,
        tokenRT: id,
      });

      const findAnggota = anggota.map(
        (element) =>
          new AnggotaKeluarga({
            nama: element.nama,
            role: element.role,
            statusCovid: element.statusCovid,
            createdAt: element.createdAt,
          })
      );

      if (anggota.length) {
        res
          .status(200)
          .json({ message: 'Anggota Keluarga Found', anggota: findAnggota });
      } else {
        res.status(404).json({ message: 'Anggota Keluarga Tidak Ditemukan' });
      }
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};
