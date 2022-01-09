const Keluarga = require('../models/keluarga');
const RT = require('../models/rt');
const AnggotaKeluarga = require('../models/anggotaKeluarga');
const { errorHandling } = require('./errorHandling');

exports.getDataPositif = async (req, res, next) => {
  try {
    const role = req.user.role;
    const email = req.user.email;

    if (role === 'RT') {
      const findRT = await RT.findOne({ email: email });
      const anggotaPositif = await AnggotaKeluarga.find({
        keluargaId: findRT._id,
        statusCovid: 'Positif',
      });
      const findPositif = await AnggotaKeluarga.find({
        tokenRT: findRT._id,
        statusCovid: 'Positif',
      });

      res.status(200).json({
        message: 'Berhasil Mendapatkan Data positif anggota keluarga dan RT',
        dataAnggotaKeluarga: anggotaPositif,
        dataRT: findPositif,
      });
    } else {
      const findKeluarga = await Keluarga.find({ email: email });
      const tokenRT = findKeluarga.tokenRT;
      const anggotaPositif = await AnggotaKeluarga.find({
        keluargaId: findKeluarga._id,
        statusCovid: 'Positif',
      });
      const rtPositif = await AnggotaKeluarga.find({
        statusCovid: 'Positif',
        tokenRT: tokenRT,
      });

      res.status(200).json({
        message: 'Berhasil Mendapatkan Data Positif Di keluarga dan RT',
        dataAnggotaKeluarga: anggotaPositif,
        dataRT: rtPositif,
      });
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};
