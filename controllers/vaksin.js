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

      const dataVaksin = await Vaksin.find({ keluargaId: keluargaId });

      const tokenRT = keluarga.tokenRT;

      const vaksinRT = await Vaksin.find({ tokenRT: tokenRT });

      if (dataVaksin.length) {
        res.status(200).json({
          message: 'Data Vaksin Keluarga Found',
          vaksinKeluarga: dataVaksin,
          vaksinRT: vaksinRT,
        });
      } else {
        res.status(404).json({ message: 'Data Vaksin Not Found' });
      }
    } else {
      const rt = await Rt.findOne({ email: email });
      const rtId = rt._id;

      const dataVaksin = await Vaksin.find({ keluargaId: rtId });
      const vaksinRT = await Vaksin.find({ tokenRT: rtId });
      console.log(vaksinRT)

      if (vaksinRT.length) {
        res.status(200).json({
          message: 'Data Vaksin RT Found',
          vaksinKeluarga: dataVaksin,
          vaksinRT: vaksinRT,
        });
      } else {
        res.status(404).json({ message: 'Data Vaksin Not Found' });
      }
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.getVakinByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vaksinAnggota = await Vaksin.findOne({ _id: id })

    if (vaksinAnggota) {
      res.status(201).json({
        message: "Berhasil Mengambil Data Vaksin By ID Anggota",
        vaksin: vaksinAnggota,
      })
    } else {
      res.status(404).json({ message: 'Data Vaksin By Id tidak ditemukan' });
    }

  } catch (error) {
    errorHandling(error);
    next(error);
  }
}

exports.getVaksinRT = async (req, res, next) => {
  try {
    const { email, role } = req.user;

    if (role === 'RT') {
      const rt = await Rt.findOne({ email: email });
      const rtId = rt._id;

      const vaksin = await Vaksin.find({ tokenRT: rtId });
      console.log(vaksin)

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
