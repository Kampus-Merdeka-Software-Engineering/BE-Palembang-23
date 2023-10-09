// pemesananService.js

const Pemesanan= require('../models/pemesanan');
const DetailPemesanan= require('../models/detail_pemesanan');
const sequelize = require('../config/sequelize'); 
const Pengiriman= require('../models/pengiriman');

const createPemesanan = async (
  nama_pelanggan,
  email,
  nomor_telepon,
  alamat_asal,
  alamat_tujuan,
  nama_hewan1,
  tipe_hewan1,
  berat1,
  nama_hewan2,
  tipe_hewan2,
  berat2,
  userId
) => {
  let transaction;
  try {
    const status_pemesanan = "belum disetujui";

    // Menghitung harga1 dan harga2
    const harga1 = beratToHarga(berat1);
    const harga2 = beratToHarga(berat2);

    const total_harga = harga1 + (nama_hewan2 ? harga2 : 0);

    // Tambahkan baris berikut untuk mendapatkan tanggal pemesanan saat ini
    const tanggal_pemesanan = new Date();

    transaction = await sequelize.transaction(); // Mulai transaksi

    const pemesanan = await Pemesanan.create(
      {
        nama_pelanggan,
        email,
        nomor_telepon,
        alamat_asal,
        alamat_tujuan,
        total_harga,
        tanggal_pemesanan,
        status_pemesanan,
        id_users: userId,
      },
      { transaction }
    );

    const detailPemesananHewan1 = await createDetailPemesanan(
      pemesanan.id,
      nama_hewan1,
      tipe_hewan1,
      berat1,
      harga1,
      transaction
    );

    let detailPemesananHewan2;
    if (nama_hewan2) {
      detailPemesananHewan2 = await createDetailPemesanan(
        pemesanan.id,
        nama_hewan2,
        tipe_hewan2,
        berat2,
        harga2,
        transaction
      );
    }

    const totalHargaDetailPemesanan = await DetailPemesanan.sum('harga', {
      where: { id_pemesanan: pemesanan.id },
      transaction,
    });

    // Update total harga di pemesanan sesuai dengan total harga detail pemesanan
    await Pemesanan.update(
      { total_harga: totalHargaDetailPemesanan },
      { where: { id: pemesanan.id }, transaction }
    );

    await transaction.commit(); // Commit transaksi jika semuanya berhasil

    return { pemesanan, detailPemesananHewan1, detailPemesananHewan2 };
  } catch (error) {
    console.error('Gagal membuat pemesanan:', error);

    // Rollback transaksi jika ada kesalahan
    if (transaction) {
      await transaction.rollback();
    }

    throw error;
  }
};

function beratToHarga(berat) {
  if (berat < 15) {
    return 75000;
  } else if (berat >= 15 && berat <= 80) {
    return 125000;
  } else {
    return 225000;
  }
}

async function createDetailPemesanan(id_pemesanan, nama_hewan, tipe_hewan, berat, harga, transaction) {
  return await DetailPemesanan.create(
    {
      nama_hewan,
      tipe_hewan,
      berat,
      harga,
      id_pemesanan,
    },
    { transaction }
  );
}
const getWaitingList = async (userId) => {
    try {
      const status = 'belum disetujui';
  
      const pemesananList = await Pemesanan.findAll({
        where: { id_users: userId, status_pemesanan: status },
      });
  
      return { pemesananList };
    } catch (error) {
      throw error;
    }
  };
  const deletePemesananById = async (userId, pemesananId) => {
    try {
      const pemesanan = await Pemesanan.findOne({
        where: { id: pemesananId, id_users: userId },
      });
  
      if (!pemesanan) {
        throw new Error('Pemesanan tidak ditemukan');
      }
  
      await pemesanan.destroy();
  
      return 'Pemesanan berhasil dihapus';
    } catch (error) {
      throw error;
    }
  };
  const updatePemesananById = async (userId, pemesananId, updatedData) => {
    try {
      const pemesanan = await Pemesanan.findOne({
        where: { id: pemesananId, id_users: userId },
      });
  
      if (!pemesanan) {
        throw new Error('Pemesanan tidak ditemukan');
      }
  
      const allowedUpdates = ['nama_pelanggan', 'email', 'nomor_telepon', 'alamat_asal', 'alamat_tujuan'];
      for (const field of allowedUpdates) {
        if (updatedData[field]) {
          pemesanan[field] = updatedData[field];
        }
      }
  
      await pemesanan.save();
  
      return 'Pemesanan berhasil diupdate';
    } catch (error) {
      throw error;
    }
  };
  const getCancelledPemesanan = async () => {
    try {
      const pemesananList = await Pemesanan.findAll({
        where: { status_pemesanan: 'dibatalkan' },
      });
  
      return { pemesananList };
    } catch (error) {
      throw error;
    }
  };
  const getUserCancelledPemesanan = async (userId) => {
    try {
      const pemesananList = await Pemesanan.findAll({
        where: { id_users: userId, status_pemesanan: 'dibatalkan' },
      });
  
      return { pemesananList };
    } catch (error) {
      throw error;
    }
  };
  const getUserOrderHistory = async (userId) => {
    try {
      const pemesananList = await Pemesanan.findAll({
        where: { id_users: userId },
      });
  
      return { pemesananList };
    } catch (error) {
      throw error;
    }
  };
  const getAdminWaitingPemesanan = async () => {
    try {
      const pemesananList = await Pemesanan.findAll({
        where: { status_pemesanan: 'belum disetujui' },
      });
  
      return { pemesananList };
    } catch (error) {
      throw error;
    }
  };
  const adminCancelPemesananById = async (id) => {
    try {
      const pemesanan = await Pemesanan.findByPk(id);
  
      if (!pemesanan) {
        throw new Error('Pemesanan tidak ditemukan');
      }
  
      if (pemesanan.status_pemesanan === 'belum disetujui') {
        await pemesanan.update({ status_pemesanan: 'dibatalkan' });
  
        return 'Pemesanan dibatalkan';
      } else {
        throw new Error('Pemesanan telah disetujui sebelumnya');
      }
    } catch (error) {
      throw error;
    }
  };
  const getAdminOrderHistory = async () => {
    try {
      const pemesananList = await Pemesanan.findAll();
  
      return { pemesananList };
    } catch (error) {
      throw error;
    }
  };
  const adminApprovePemesananById = async (id) => {
    try {
      const pemesanan = await Pemesanan.findByPk(id);
  
      if (!pemesanan) {
        throw new Error('Pemesanan tidak ditemukan');
      }
  
      if (pemesanan.status_pemesanan === 'belum disetujui') {
        await pemesanan.update({ status_pemesanan: 'disetujui' });
  
        function generateRandomResi() {
          const prefix = 'PAW';
          const randomNumber = Math.floor(100000 + Math.random() * 900000);
          return `${prefix}${randomNumber}`;
        }
  
        const nomor_resi = generateRandomResi();
        const pengiriman = await Pengiriman.create({
          nomor_resi,
          status_pengiriman: 'dalam proses',
          detail_pengiriman: 'dalam proses',
          nama_penerima: pemesanan.nama_pelanggan,
          review: null,
          pemesananId: pemesanan.id,
        });
  
        return 'Pemesanan telah disetujui';
      } else {
        throw new Error('Pemesanan telah disetujui sebelumnya');
      }
    } catch (error) {
      throw error;
    }
  };
  const getDetailPemesananByIdPemesanan = async (id_pemesanan) => {
    try {
      const detailPemesanan = await DetailPemesanan.findAll({
        where: { id_pemesanan: id_pemesanan },
      });
  
      if (!detailPemesanan) {
        throw new Error('Pemesanan tidak ditemukan');
      }
  
      return { detailPemesanan };
    } catch (error) {
      throw error;
    }
  };
module.exports = {
  createPemesanan,getWaitingList,deletePemesananById,updatePemesananById,getCancelledPemesanan,getUserCancelledPemesanan,getUserOrderHistory,
  getAdminWaitingPemesanan,adminCancelPemesananById,getAdminOrderHistory,adminApprovePemesananById,getDetailPemesananByIdPemesanan
};
