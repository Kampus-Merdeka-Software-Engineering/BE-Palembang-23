const { DataTypes } = require('sequelize');
const Sequelize = require('../config/sequelize');
const Pemesanan = require('./pemesanan'); 

const Pengiriman = Sequelize.define('pengiriman', {
  nomor_resi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status_pengiriman: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  detail_pengiriman: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nama_penerima: {
    type: DataTypes.STRING,
    allowNull: false
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pemesananId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pemesanan',
      key: 'id'
    }
  },
}, {
  freezeTableName: true,
  timestamps: false
});
Pemesanan.hasOne(Pengiriman);
Pengiriman.belongsTo(Pemesanan, { foreignKey: 'pemesananId' });

Sequelize.sync()
  .then(() => {
    console.log('Tabel "pengiriman" telah dibuat atau sudah ada.');
  })
  .catch(err => {
    console.error('Gagal menjalankan sinkronisasi tabel:', err);
  });

module.exports = Pengiriman;
