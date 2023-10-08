const express = require('express');
const router = express.Router();
// const controller = require('../controller/index');
const authcontrollerController = require('../controller/authcontroller');
const User = require('../model/users');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
const authenticateToken = require('../middleware/auth')
router.use(express.json());
router.use(cookieParser()); 

router.post('/logout', authcontrollerController.logout);
module.exports = router;
