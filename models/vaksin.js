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
      required: true,
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
  },
  { timestamps: true }
);

module.exports = moongoose.model('Vaksin', vaksinSchema);