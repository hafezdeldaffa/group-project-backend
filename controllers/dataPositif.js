const Keluarga = require("../models/keluarga")
const RT = require("../models/rt")
const AnggotaKeluarga = require("../models/anggotaKeluarga")
const { errorHandling } = require('./errorHandling');

exports.getDataPositif = async (req, res, next) =>{
   try {
        const role = req.user.role
        const email = req.user.email

        if(role === "RT"){
            const findRT = await RT.findOne({email: email})
            const findPositif = await AnggotaKeluarga.find({tokenRT : findRT._id, statusCovid: "Positif"})
            
            res.status(200).json({
                message: "Berhasil Mendapatkan Data positif di RT",
                WargaRT : findPositif
            })
        }else{
            const findKeluarga = await Keluarga.find({email : email })
            const findPositif = await AnggotaKeluarga.find({keluargaId : findKeluarga._id, statusCovid: "Positif"})

            res.status(200).json({
                message: "Berhasil Mendapatkan Data Positif Di keluarga",
                WargaRT : findPositif
            })
        }
   } catch (error) {
        errorHandling(error);
        next(error);
   }
}