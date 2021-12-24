### Design Database
```bash
Schema RT
{
    _id : "ObjectId('RT1')",
    provinsi : "DIYogyakarta",
    kodePos : "55552",
    rw : "24",
    rt : "03",
    alamatLengkap : "Jalan bla bla bla"
    namaKetuaRT : "Sandiaga Uno",
    email : "lala@gmail.com",
    password : "12345",
}

Schema Keluarga
{
    _id : "ObjectId(Keluarga1')",
    namaKepalaKeluarga : "Agus Maulana",
    email : "keluargaku@gmail.com",
    password : "12345",
    tokenRT : "ObjectId('RT1')"
}

Schema Anggota Keluarga
{
    _id :  "ObjectId('Anggota1')",
    nama : "Rangga Maulana",
    role : "Anak",
    statusCovid : "positif",
    KeluargaID : "ObjectId(Keluarga1')"
},
{
    _id :  "ObjectId('Anggota2')",
    nama : "Rasya Maulana",
    role : "Anak",
    statusCovid : "negatif",
    KeluargaID : "ObjectId(Keluarga1')"
},

Schema Vaksin
{
    _id : "ObjectId('vaksin1')",
    tanggalDosis1 : "12-12-2020",
    tanggalDosis2 : "12-01-2021",
    idAnggota : "ObjectId('Anggota1')"
}

Schema Laporan
{
    _id : "ObjectId('Laporan1')",
    idAnggota : "ObjectId('Anggota1')",
    tanggal : "12-20-2021",
    perjalananDomestik: "ya",
    turisAsing: "ya",
    kontakPositif: "ya",
    demam: "ya",
    batuk: "ya",
    nyeriTenggorokan: "ya",
    sesakNafas: "ya",
    batukPilek: "ya",
    diabetes: "ya",
    hipertensi: "ya",
    jantung: "ya",
    ginjal: "ya",
    asma: "ya",
    catatanTambahan: "lalalalalalala"
}
```

### Postman Documentation
https://documenter.getpostman.com/view/11143202/UVRDHmQC

### Installation

```javascript
npm install
```

## Start

```javascript
npm start
```
