/* 
    CONTROLLER UNTUK LAPORAN KE RT
*/

const Laporan  = require("../models/laporan")
const Keluarga = require("../models/keluarga")


exports.getLaporan = async (req,res) =>{
        console.log(req.user)
        const findKeluarga = await Keluarga.findOne({email: req.user.email})
        console.log(findKeluarga._id)
        //lanjutim find anggota yg id keluarganya diatas
        res.json("lalala")
}

exports.postLaporan = async (req,res) => {
    const {tanggal, anggotaId, perjalananDomestik, turisAsing, kontakPositif} = req.body
    const {demam, batuk, nyeriTenggorokan, sesakNafas, batukPilek, diabetes} = req.body
    const {hipertensi, jantung, ginjal, asma, catatanTambahan} = req.body

    const laporan  = Laporan({
        tanggal: tanggal,
        anggotaId : anggotaId,
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

    await laporan.save()

    res.status(201).send("Berhasil Menambahkan Laporan", laporan)
}