const express = require('express');
const router = express.Router();
const ordercontroller = require('../controllers/pemesanancontroller');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
router.use(express.json());
router.use(cookieParser()); 
const authenticateToken = require('../middleware/auth')


// router.get('/', controller.pemesanan_dan_detail_pemesanan.getAllPemesanan);
// router.get('/:id', controller.pemesanan_dan_detail_pemesanan.getPemesananById);
// router.post('/order', controller.pemesanan_dan_detail_pemesanan.createPeminjaman);
// router.put('/:id/update-status', controller.pemesanan_dan_detail_pemesanan.updateStatusPemesanan);
// router.put('/pengiriman/:id/update-status-and-detail', controller.pemesanan_dan_detail_pemesanan.updateStatusAndDetailPengiriman); 
// router.delete('/:id', controller.pemesanan_dan_detail_pemesanan.deletePemesanan);
router.patch('/adminwaitingpemesanan/:id', authenticateToken,ordercontroller.adminwaitingpemesananbyid);

router.patch('/adminwaitingpemesanancancelled/:id', authenticateToken,ordercontroller.admincancel);
router.get('/adminwaitingpemesanan', authenticateToken,ordercontroller.adminwaitingpemesanan);

router.get('/adminorderhistory', authenticateToken, ordercontroller.adminorderhistory);
router.get('/userorderhistory', authenticateToken, ordercontroller.userorderhistory);

router.get('/userordercancel', authenticateToken, ordercontroller.userordercancel);
router.get('/adminordercancel', authenticateToken,ordercontroller.adminordercancel);
router.patch('/pemesanan-list/:id', authenticateToken,ordercontroller.userupdatepemesanan);
router.delete('/pemesanan-list/:id', authenticateToken,ordercontroller.deletePemesanan);
router.post('/pemesanan', authenticateToken, ordercontroller.pemesanan);
router.get('/waitinglist', authenticateToken, ordercontroller.waitinglist);
router.get('/detailpemesanan/:id_pemesanan', authenticateToken, ordercontroller.getDetailPemesanan);

module.exports = router;
