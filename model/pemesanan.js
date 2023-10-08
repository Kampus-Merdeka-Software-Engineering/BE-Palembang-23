const { DataTypes } = require('sequelize');
const Sequelize = require('../config/sequelize');
const User = require('./users');
const Pemesanan = Sequelize.define('pemesanan', {
  nama_pelanggan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomor_telepon: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat_asal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat_tujuan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_harga: {
    type: DataTypes.INTEGER,
   
  },
  tanggal_pemesanan: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status_pemesanan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_users: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  freezeTableName: true,
  timestamps: false
});
User.hasMany(Pemesanan, { foreignKey: 'id_users' });
Pemesanan.belongsTo(User, { foreignKey: 'id_users' });

Sequelize.sync()
  .then(() => {
    console.log('Tabel "pemesanan" telah dibuat atau sudah ada.');
  })
  .catch(err => {
    console.error('Gagal menjalankan sinkronisasi tabel:', err);
  });
  
module.exports = Pemesanan;
