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
    perjalananDomestik:{
        type: String,
        required: true,
    },
    turisAsing:{
        type: String,
        required: true,
    },
    kontakPositif:{
        type: String,
        required: true,
    },
    demam:{
        type: String,
        required: true,
    },
    batuk:{
        type: String,
        required: true,
    },
    nyeriTenggorokan: {
        type: String,
        required: true,
    },
    sesakNafas:{
        type: String,
        required: true,
    },
    batukPilek: {
        type: String,
        required: true,
    },
    diabetes: {
        type: String,
        required: true,
    },
    hipertensi:{
        type: String,
        required: true,
    },
    jantung:{
        type: String,
        required: true,
    },
    ginjal:{
        type: String,
        required: true,
    },
    asma:{
        type: String,
        required: true,
    },
    catatanTambahan:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Laporan', LaporanSchema);
