/* 
    CONTROLLER UNTUK LAPORAN KE RT
*/

const Laporan  = require("../models/laporan")
const Keluarga = require("../models/keluarga")
const Rt = require("../models/rt")
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
            const findRT = await Rt.findOne({email: req.user.email})
            const findLaporan = await Laporan.find({tokenRT : findRT._id})
            res.status(200).json({
                message : "Berhasil Mengambil data Laporan di RT",
                Laporan : findLaporan
            })
        }
    } catch (error) {
        errorHandling(error);
        next(error);
    }
}

exports.postLaporan = async (req, res, next) => {
    try {
        const role = req.user.role
        const email = req.user.email

        const {tanggal, anggotaId, perjalananDomestik, turisAsing, kontakPositif} = req.body
        const {demam, batuk, nyeriTenggorokan, sesakNafas, batukPilek, diabetes} = req.body
        const {hipertensi, jantung, ginjal, asma, catatanTambahan} = req.body

        if(role === "Keluarga"){
            const keluarga = await Keluarga.findOne({ email: email });

            const keluargaId = keluarga._id;
            const tokenRT = keluarga.tokenRT;

            const newLaporan  = Laporan({
                tanggal: tanggal,
                anggotaId : anggotaId,
                keluargaId : keluargaId,
                tokenRT : tokenRT,
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
        }else{
            const rt = await Rt.findOne({ email: email });
            const rtId = rt._id;

            const newLaporan  = Laporan({
                tanggal: tanggal,
                anggotaId : anggotaId,
                keluargaId : rtId,
                tokenRT : rtId,
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
        }


    } catch (error) {
        errorHandling(error);
        next(error);
    }
}

exports.deleteLaporan = async (req,res, next) =>{
    
    try {
        const id = req.params.id
        await Laporan.deleteOne({_id: id})
        res.json({
            message : "Berhasil Menghapus Laporan"
        })
        
    } catch (error) {
        errorHandling(error);
        next(error);
    }
}