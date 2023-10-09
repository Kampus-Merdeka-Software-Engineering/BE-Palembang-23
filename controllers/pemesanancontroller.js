
const pemesananService = require('../services/pemesananService');

const adminwaitingpemesananbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pemesananService.adminApprovePemesananById(id);

    res.json({ message: result });
  } catch (error) {
    console.error('Gagal mengubah status pemesanan:', error);
    res.status(500).json({ error: 'Gagal mengubah status pemesanan' });
  }
};

  const adminorderhistory = async (req, res) => {
    try {
      const result = await pemesananService.getAdminOrderHistory();
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan daftar pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
    }
  };
  const admincancel = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pemesananService.adminCancelPemesananById(id);
  
      res.json({ message: result });
    } catch (error) {
      console.error('Gagal mengubah status pemesanan:', error);
      res.status(500).json({ error: 'Gagal mengubah status pemesanan' });
    }
  };
  const adminwaitingpemesanan = async (req, res) => {
    try {
      const result = await pemesananService.getAdminWaitingPemesanan();
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan daftar pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
    }
  };
  const userorderhistory = async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await pemesananService.getUserOrderHistory(userId);
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan daftar pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
    }
  };



  const userordercancel = async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await pemesananService.getUserCancelledPemesanan(userId);
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan daftar pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
    }
  };
  const adminordercancel = async (req, res) => {
    try {
      const result = await pemesananService.getCancelledPemesanan();
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan daftar pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
    }
  };
  const userupdatepemesanan = async (req, res) => {
    try {
      const userId = req.user.id;
      const pemesananId = req.params.id;
      const updatedData = req.body;
      const result = await pemesananService.updatePemesananById(userId, pemesananId, updatedData);
  
      res.json({ message: result });
    } catch (error) {
      console.error('Gagal mengupdate pemesanan:', error);
      res.status(500).json({ error: 'Gagal mengupdate pemesanan' });
    }
  };

  const deletePemesanan = async (req, res) => {
    try {
      const userId = req.user.id;
      const pemesananId = req.params.id;
      const result = await pemesananService.deletePemesananById(userId, pemesananId);
  
      res.json({ message: result });
    } catch (error) {
      console.error('Gagal menghapus pemesanan:', error);
      res.status(500).json({ error: 'Gagal menghapus pemesanan' });
    }
  };
  const waitinglist = async (req, res) => {
    try {
      const userId = req.user.id; // Menggunakan destructuring untuk mengambil id dari req.user
      const result = await pemesananService.getWaitingList(userId);
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan daftar pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan daftar pemesanan' });
    }
  };
  
  
  const pemesanan = async (req, res) => {
    try {
      const {
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
      } = req.body;
      const userId = req.user.id;
  
      const result = await pemesananService.createPemesanan(
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
      );
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal membuat pemesanan' });
    }
  };
  
  const getDetailPemesanan = async (req, res) => {
    try {
      const id_pemesanan = req.params.id_pemesanan;
      const result = await pemesananService.getDetailPemesananByIdPemesanan(id_pemesanan);
  
      res.json(result);
    } catch (error) {
      console.error('Gagal mendapatkan detail pemesanan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan detail pemesanan' });
    }
  };
  
  module.exports =  {
  adminwaitingpemesananbyid,adminorderhistory,admincancel,adminwaitingpemesananbyid,userorderhistory,waitinglist,userordercancel,adminwaitingpemesanan,
  adminordercancel,userupdatepemesanan,deletePemesanan,pemesanan,getDetailPemesanan
};