const express = require('express');
const { Op } = require('sequelize');
const cookieParser = require('cookie-parser');
const Pemesanan= require('../models/pemesanan');
const Pengiriman= require('../models/pengiriman');
const router = express.Router();
router.use(express.json());
router.use(cookieParser()); 

const pengirimanService = require('../services/pengirimanService');

const adminprocess = async (req, res) => {
  try {
    const result = await pengirimanService.getAdminProcessingPengiriman();

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan daftar pengiriman:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar pengiriman' });
  }
};

const userdeliveryprocess = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pengirimanService.getUserDeliveryProcessingPengiriman(userId);

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan daftar pengiriman:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar pengiriman' });
  }
};
const userondelivery = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pengirimanService.getUserOnDeliveryPengiriman(userId);

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan daftar pengiriman:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar pengiriman' });
  }
};
const userdeliveryclaim = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pengirimanService.getUserDeliveryClaimPengiriman(userId);

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan daftar pengiriman:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar pengiriman' });
  }
};
const userdeliveryclaimbyid = async (req, res) => {
  try {
    const userId = req.user.id;
    const pengirimanId = req.params.id;
    const result = await pengirimanService.claimUserDeliveryById(userId, pengirimanId);

    res.json(result);
  } catch (error) {
    console.error('Gagal mengupdate status pengiriman:', error);
    res.status(500).json({ error: 'Gagal mengupdate status pengiriman' });
  }
};

const admindelivery = async (req, res) => {
  try {
    const result = await pengirimanService.getAdminDeliveryPengiriman();

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan daftar pemesanan:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
  }
};
const admindeliveryclaim = async (req, res) => {
  try {
    const result = await pengirimanService.getAdminDeliveryClaimPengiriman();

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan daftar pemesanan:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
  }
};
const userdelivery = async (req, res) => {
  try {
    const userId = req.user.id;
    const nomorResi = req.params.nomorResi;
    const result = await pengirimanService.getUserDeliveryDataByNomorResi(userId, nomorResi);

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan data pengiriman:', error);
    res.status(500).json({ error: 'Gagal mendapatkan data pengiriman' });
  }
};
const checkdelivery = async (req, res) => {
  try {
    const nomorResi = req.params.nomorResi;
    const result = await pengirimanService.getDeliveryDataByNomorResi(nomorResi);

    res.json(result);
  } catch (error) {
    console.error('Gagal mendapatkan data pengiriman:', error);
    res.status(500).json({ error: 'Gagal mendapatkan data pengiriman' });
  }
};
const admindeliveryedit = async (req, res) => {
  try {
    const id_pengiriman = req.params.id;
    const updatedData = req.body;
    const result = await pengirimanService.updateAdminDeliveryData(id_pengiriman, updatedData);

    res.json(result);
  } catch (error) {
    console.error('Gagal mengupdate pemesanan:', error);
    res.status(500).json({ error: 'Gagal mengupdate pemesanan' });
  }
};
  
  module.exports =  {
    adminprocess,userdeliveryprocess,userdeliveryclaim,
    userdeliveryclaimbyid,admindelivery,checkdelivery,userdelivery,admindeliveryedit,userondelivery,admindeliveryclaim
};