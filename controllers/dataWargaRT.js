const Keluarga = require('../models/keluarga');
const RT = require('../models/rt');
const { errorHandling } = require('./errorHandling');


exports.getWargaRT = async (req, res, next) =>{
   try {
        const role = req.user.role
        const email = req.user.email

        if(role === "RT"){
            const findRT = await RT.findOne({email: email})
            const findWarga = await Keluarga.find({tokenRT : findRT._id})
            
            res.status(200).json({
                message: "Berhasil Mendapatkan Data Warga di RT",
                WargaRT : findWarga
            })
        }else{
            const keluarga = await Keluarga.findOne({ email: email });
            const tokenRT = keluarga.tokenRT;
            const findWarga = await Keluarga.find({tokenRT : tokenRT})
            
            res.status(200).json({
                message: "Berhasil Mendapatkan Data Warga di RT",
                WargaRT : findWarga
            })
        }
   } catch (error) {
        errorHandling(error);
        next(error);
   }
}

