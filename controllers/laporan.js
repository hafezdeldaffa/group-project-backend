/* 
    CONTROLLER UNTUK LAPORAN KE RT
*/

const Laporan  = require("../models/laporan")
const Keluarga = require("../models/keluarga")
const AnggotaKeluarga = require("../models/anggotaKeluarga")
const { errorHandling } = require('./errorHandling');


exports.getLaporan = async (req, res, next) =>{
    try {   
        const role = req.user.role

        if(role === "Keluarga"){
            const findKeluarga = await Keluarga.findOne({email: req.user.email})
            const findLaporan = await Laporan.find({keluargaId : findKeluarga._id})

            res.status(200).json({
                message : "Berhasil Mengambil data Laporan di keluarga",
                Laporan : findLaporan
            })
        }else{
            res.send("")
        }
    } catch (error) {
        errorHandling(error);
        next(error);
    }
}

exports.postLaporan = async (req, res, next) => {
    try {
        const {tanggal, anggotaId, keluargaId,perjalananDomestik, turisAsing, kontakPositif} = req.body
        const {demam, batuk, nyeriTenggorokan, sesakNafas, batukPilek, diabetes} = req.body
        const {hipertensi, jantung, ginjal, asma, catatanTambahan} = req.body

        const newLaporan  = Laporan({
            tanggal: tanggal,
            anggotaId : anggotaId,
            keluargaId : keluargaId,
            perjalananDomestik: perjalananDomestik,
            turisAsing: turisAsing,
            kontakPositif: kontakPositif,
            demam: demam,
            batuk: batuk,
            nyeriTenggorokan: nyeriTenggorokan,
            sesakNafas: sesakNafas,
            batukPilek: batukPilek, 
            diabetes: diabetes,
            hipertensi: hipertensi,
            jantung: jantung,
            ginjal: ginjal,
            asma: asma,
            catatanTambahan: catatanTambahan,
        })

        await newLaporan.save()

        res.status(201).json({ 
            message : "Berhasil Menambahkan Laporan",
            laporan : newLaporan
        })

    } catch (error) {
        errorHandling(error);
        next(error);
    }
}