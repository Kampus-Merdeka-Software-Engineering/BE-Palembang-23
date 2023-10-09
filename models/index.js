const users = require('./users');
const pemesanan = require('./pemesanan');
const detail_pemesanan = require('./detail_pemesanan');
const pengiriman = require('./pengiriman');
const model = {};

model.users = users;
model.pemesanan = pemesanan;
model.detail_pemesanan = detail_pemesanan;
model.pengiriman = pengiriman;

module.exports = model;