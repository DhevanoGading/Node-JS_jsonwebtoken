'use strict'

//inisialisasi
const express = require("express")

//implementasi
const app = express()
app.use(express.json())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

//menghubungkan ke database
const db = require ('./db')
db.connect(error =>{
    if(error) throw error
    console.log ("mysql connected")
})

//endpoint
app.get("/", (req,res) => {
    res.send({
        message:"Berhasil menjalankan GET",
        data: {
            description :
            "berhasil menampilkan data"
        }
    })
})

app.use("/penduduk",require('./routes/penduduk.route'))

const port = 8080;
app.listen(port , () => console.log (`App berhasil berjalan di ${port}`))