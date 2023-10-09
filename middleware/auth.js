// const express = require('express');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const Pemesanan= require('../models/pemesanan');
const DetailPemesanan= require('../models/detail_pemesanan');

// router.use(express.json());
// router.use(cookieParser()); 

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


module.exports = authenticateToken;

