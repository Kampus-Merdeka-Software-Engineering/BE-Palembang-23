const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const pemesanan = require('./pemesanan');

const DetailPemesanan = sequelize.define('DetailPemesanan', {
  nama_hewan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipe_hewan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  berat: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_pemesanan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: pemesanan, 
      key: 'id', 
    },
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
pemesanan.hasMany(DetailPemesanan, { foreignKey: 'id_pemesanan' });
DetailPemesanan.belongsTo(pemesanan, { foreignKey: 'id_pemesanan' });

sequelize.sync()
  .then(() => {
    console.log('Tabel "pemesanan" telah dibuat atau sudah ada.');
  })
  .catch(err => {
    console.error('Gagal menjalankan sinkronisasi tabel:', err);
  });

module.exports = DetailPemesanan;
