const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('mysql://root:fczN5McfofpDu1Lm8uVz@containers-us-west-146.railway.app:7623/railway');

sequelize
  .authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil.');
  })
  .catch((err) => {
    console.error('Tidak dapat terhubung ke database:', err);
  });

module.exports = sequelize;
