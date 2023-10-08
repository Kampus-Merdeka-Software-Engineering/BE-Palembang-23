const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil.');
  })
  .catch((err) => {
    console.error('Tidak dapat terhubung ke database:', err);
  });

module.exports = sequelize;
