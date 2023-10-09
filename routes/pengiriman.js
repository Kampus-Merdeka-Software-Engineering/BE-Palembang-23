const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/pengirimancontrollers');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
router.use(express.json());
router.use(cookieParser()); 
const authenticateToken = require('../middleware/auth')

router.use(express.json());

  

router.get('/userdelivery/:nomorResi',authenticateToken,deliveryController.userdelivery);
router.get('/delivery/:nomorResi',deliveryController.checkdelivery);
router.get('/admindeliveryprocess', authenticateToken,deliveryController.adminprocess);
router.get('/userdeliveryprocess', authenticateToken,deliveryController.userdeliveryprocess);
router.get('/userdeliveryclaim', authenticateToken,deliveryController.userdeliveryclaim);
router.post('/userdeliveryclaim/:id', authenticateToken, deliveryController.userdeliveryclaimbyid);
router.get('/admindelivery', authenticateToken, deliveryController.admindelivery);
router.patch('/admindeliveryedit/:id', authenticateToken, deliveryController.admindeliveryedit);
router.get('/userondelivery', authenticateToken, deliveryController.userondelivery);
router.get('/admindeliveryclaim', authenticateToken, deliveryController.admindeliveryclaim);

module.exports = router;
