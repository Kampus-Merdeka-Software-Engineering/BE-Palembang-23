const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hint: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
sequelize.sync()
  .then(() => {
    console.log('Tabel telah berhasil dibuat.');
  })
  .catch((error) => {
    console.error('Terjadi kesalahan saat mencoba membuat tabel:', error);
  });

module.exports = User; 
