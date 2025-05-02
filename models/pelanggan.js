const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pelanggan = sequelize.define('Pelanggan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telepon: {
    type: DataTypes.STRING
  },
  tanggal_registrasi: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
}, {
    tableName: 'pelanggan',
    timestamps: false
  });

module.exports = Pelanggan;
