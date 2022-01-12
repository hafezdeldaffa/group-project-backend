/* 
    MODEL UNTUK LAPORAN
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaporanSchema = new Schema(
  {
    tanggal: {
      type: String,
      required: true,
    },
    anggotaId: {
      type: Schema.Types.ObjectId,
      ref: 'AnggotaKeluarga',
      required: true,
    },
    keluargaId: {
      type: Schema.Types.ObjectId,
      ref: 'Keluarga',
      required: true,
    },
    tokenRT: {
      type: Schema.Types.ObjectId,
      ref: 'Rt',
      required: true,
    },
    perjalananDomestik: {
      type: Boolean,
      required: true,
    },
    turisAsing: {
      type: Boolean,
      required: true,
    },
    kontakPositif: {
      type: Boolean,
      required: true,
    },
    demam: {
      type: Boolean,
      required: true,
    },
    batuk: {
      type: Boolean,
      required: true,
    },
    nyeriTenggorokan: {
      type: Boolean,
      required: true,
    },
    sesakNafas: {
      type: Boolean,
      required: true,
    },
    batukPilek: {
      type: Boolean,
      required: true,
    },
    diabetes: {
      type: Boolean,
      required: true,
    },
    hipertensi: {
      type: Boolean,
      required: true,
    },
    jantung: {
      type: Boolean,
      required: true,
    },
    ginjal: {
      type: Boolean,
      required: true,
    },
    asma: {
      type: Boolean,
      required: true,
    },
    catatanTambahan: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Laporan', LaporanSchema);
