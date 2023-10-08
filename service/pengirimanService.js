const express = require('express');
const { Op } = require('sequelize');
const cookieParser = require('cookie-parser');
const Pemesanan= require('../model/pemesanan');
const Pengiriman= require('../model/pengiriman');
const router = express.Router();
router.use(express.json());
router.use(cookieParser()); 
const getAdminProcessingPengiriman = async () => {
    try {
      const pengirimanList = await Pengiriman.findAll({
        where: { status_pengiriman: 'dalam proses' },
      });
  
      return { pengirimanList };
    } catch (error) {
      throw error;
    }
  };
  const getUserDeliveryProcessingPengiriman = async (userId) => {
    try {
      const userOrders = await Pemesanan.findAll({
        where: { id_users: userId },
      });
  
      const pengirimanList = await Pengiriman.findAll({
        where: {
          status_pengiriman: 'dalam proses',
          pemesananId: userOrders.map((order) => order.id),
        },
      });
  
      return { pengirimanList };
    } catch (error) {
      throw error;
    }
  };
  const getUserOnDeliveryPengiriman = async (userId) => {
    try {
      const userOrders = await Pemesanan.findAll({
        where: { id_users: userId },
      });
  
      const pengirimanList = await Pengiriman.findAll({
        where: {
          status_pengiriman: {
            [Op.not]: ['dalam proses', 'diterima'],
          },
          pemesananId: userOrders.map((order) => order.id),
        },
      });
  
      return { pengirimanList };
    } catch (error) {
      throw error;
    }
  };
  const getUserDeliveryClaimPengiriman = async (userId) => {
    try {
      const userOrders = await Pemesanan.findAll({
        where: { id_users: userId },
      });
  
      const pengirimanList = await Pengiriman.findAll({
        where: {
          status_pengiriman: 'diterima',
          pemesananId: userOrders.map((order) => order.id),
        },
      });
  
      return { pengirimanList };
    } catch (error) {
      throw error;
    }
  };
  const claimUserDeliveryById = async (userId, pengirimanId) => {
    try {
      const pengiriman = await Pengiriman.findOne({
        where: {
          id: pengirimanId,
        },
        include: [
          {
            model: Pemesanan,
            where: {
              id_users: userId,
            },
          },
        ],
      });
  
      if (!pengiriman) {
        throw new Error('Pengiriman tidak ditemukan atau tidak dimiliki oleh pengguna');
      }
  
      pengiriman.status_pengiriman = 'diterima';
      await pengiriman.save();
  
      return { message: 'Status pengiriman berhasil diupdate menjadi "diterima"' };
    } catch (error) {
      throw error;
    }
  };
  const getAdminDeliveryPengiriman = async () => {
    try {
      const pengirimanList = await Pengiriman.findAll({
        where: { status_pengiriman: {
          [Op.not]: ['dalam proses', 'diterima'],
        }, },
      });
  
      return { pengirimanList };
    } catch (error) {
      throw error;
    }
  };
  const getAdminDeliveryClaimPengiriman = async () => {
    try {
      const pengirimanList = await Pengiriman.findAll({
        where: { status_pengiriman: 'diterima' },
      });
  
      return { pengirimanList };
    } catch (error) {
      throw error;
    }
  };
  const getUserDeliveryDataByNomorResi = async (userId, nomorResi) => {
    try {
      const pengirimanData = await Pengiriman.findOne({
        where: {
          nomor_resi: nomorResi,
        },
        include: [
          {
            model: Pemesanan,
            where: { id_users: userId },
          },
        ],
      });
  
      if (pengirimanData) {
        return { pengirimanData };
      } else {
        throw new Error('Data pengiriman tidak ditemukan');
      }
    } catch (error) {
      throw error;
    }
  };
  const getDeliveryDataByNomorResi = async (nomorResi) => {
    try {
      const pengirimanData = await Pengiriman.findOne({
        where: {
          nomor_resi: nomorResi,
        },
        include: [
          {
            model: Pemesanan,
          },
        ],
      });
  
      if (pengirimanData) {
        return { pengirimanData };
      } else {
        throw new Error('Data pengiriman tidak ditemukan');
      }
    } catch (error) {
      throw error;
    }
  };
  const updateAdminDeliveryData = async (id_pengiriman, updatedData) => {
    try {
      const pengiriman = await Pengiriman.findOne({
        where: { id: id_pengiriman },
      });
  
      if (!pengiriman) {
        throw new Error('Pemesanan tidak ditemukan');
      }
  
      const allowedUpdates = ['status_pengiriman', 'detail_pengiriman'];
      for (const field of allowedUpdates) {
        if (updatedData[field]) {
          pengiriman[field] = updatedData[field];
        }
      }
  
      await pengiriman.save();
      return { message: 'Pemesanan berhasil diupdate' };
    } catch (error) {
      throw error;
    }
  };
  module.exports = {
    getAdminProcessingPengiriman,getUserDeliveryProcessingPengiriman,getUserOnDeliveryPengiriman,getUserDeliveryClaimPengiriman,claimUserDeliveryById,
    getAdminDeliveryPengiriman,getAdminDeliveryClaimPengiriman,getUserDeliveryDataByNomorResi,getDeliveryDataByNomorResi,updateAdminDeliveryData
  };