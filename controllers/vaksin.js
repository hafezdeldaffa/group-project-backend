/* 
    CONTROLLER UNTUK VAKSIN
*/

const Vaksin = require('../models/vaksin');
const Keluarga = require('../models/keluarga');
const Rt = require('../models/rt');
const { errorHandling } = require('./errorHandling');

exports.getVaksin = async (req, res, next) => {
  try {
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: email });
      const keluargaId = keluarga._id;

      const vaksinKeluarga = await Vaksin.find({ keluargaId: keluargaId });

      if (dataVaksin.length) {
        res.status(200).json({
          message: 'Data Vaksin Keluarga Found',
          vaksinKeluarga: vaksinKeluarga,
        });
      } else {
        res.status(404).json({ message: 'Data Vaksin Not Found' });
      }
    } else {
      const rt = await Rt.find({ email: email });
      const rtId = rt._id;

      const dataVaksin = await Vaksin.findOne({ anggotaKeluargaId: rtId });

      if (dataVaksin.length) {
        res
          .status(200)
          .json({ message: 'Data Vaksin RT Found', dataVaksin: dataVaksin });
      } else {
        res.status(404).json({ message: 'Data Vaksin Not Found' });
      }
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.getVaksinRT = async (req, res, next) => {
  try {
    const { email, role } = req.user;

    if (role === 'RT') {
      const rt = await Rt.findOne({ email: email });
      const rtId = rt._id;

      const vaksin = await Vaksin.find({ tokenRT: rtId });

      if (vaksin.length) {
        res
          .status(200)
          .json({ message: 'Data Vaksin Found', dataVaksin: vaksin });
      } else {
        res.status(404).json({ message: 'Data Vaksin Not Found' });
      }
    } else {
      const keluarga = await Keluarga.findOne({ email: email });
      const tokenRT = keluarga.tokenRT;

      const vaksin = await Vaksin.find({ tokenRT: tokenRT });

      res
        .status(200)
        .json({ message: 'Data Vaksin Found', dataVaksin: vaksin });
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};
