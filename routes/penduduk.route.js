'use strict'

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const router = new express.Router();
const {checkToken} = require('../auth/token_validation')

router.get("/",checkToken,pendudukController.index)
router.post("/registrasi", pendudukController.registrasi)
router.post("/login", pendudukController.login)

module.exports = router

// const {
//     index,
//     getPenduduk,
//     postPenduduk,
//     deletePenduduk,
//     putPenduduk
// } = require("../controllers/penduduk.controller")

// router.route("/:id").get(getPenduduk).delete(deletePenduduk).put(putPenduduk)
// router.route("/").get(checkToken,index).post(checkToken,postPenduduk)