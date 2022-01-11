/* 
    MODEL UNTUK VAKSIN
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vaksinSchema = new Schema(
  {
    tanggalDosis1: {
      type: String,
    },
    tanggalDosis2: {
      type: String,
    },
    tanggalDosis3: {
      type: String,
    },
    tanggalDosis4: {
      type: String,
    },
    jenis: {
      type: String,
    },
    dosis1: {
      type: String,
    },
    dosis2: {
      type: String,
    },
    dosis3: {
      type: String,
    },
    dosis4: {
      type: String,
    },
    keluargaId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Keluarga',
    },
    anggotaKeluargaId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AnggotaKeluarga',
    },
    tokenRT: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Rt',
    },
    nama: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vaksin', vaksinSchema);
