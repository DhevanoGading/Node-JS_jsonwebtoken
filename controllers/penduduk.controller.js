const bcrypt = require('bcrypt')
const { json } = require('express/lib/response')
const jwt = require('jsonwebtoken')
const db = require('../db')

const secret = '#$@^%$^%*&%$$@&'

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    registrasi: (req, res) => {
        const { nama, email, password } = req.body
        if(!nama, !email || !password)
            res.status(402).json({
                message: 'nama, email, dan passwordharus diisi'
            })
        return db.query('INSERT INTO pengguna SET ?', { nama, email, password: hashPassword(password) }, (err, result) => {
            if(err) return res.status(500).json({ err })

            return res.json({
                message: 'registrasi berhasil',
                data: result
            })
        })
    },
    login: (req, res) => {
        const { email, password } = req.body
        if(!email || !password)
            res.status(402).json({
                message: 'email dan password harus diisi.'
            })
        return db.query('SELECT * FROM pengguna WHERE email = ?', email, (err,result) => {
            if(err) return res.status(402).json({ err })

            const user = result[0]
            if(typeof user === 'undefined')
                return res.status(401).json({
                    message: 'user tidak ditemukan'
                })
            if(!bcrypt.compareSync(password, user.password))
                return res.status(401).json({
                    message: 'email atau password tidak sesuai'
                })
            
            const token = jwt.sign({data: user}, secret)
            return res.json({
                message: 'login berhasil. silahkan menggunakan token dibawah ini untuk mengakses endpoint private lain',
                token
            })
        })
    },
    index: (req, res) => {
        db.query(`SELECT * FROM pengguna`, (err,result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message: "get success",
                    result
                })
            }
        })
    }
}