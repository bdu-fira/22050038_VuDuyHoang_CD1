const { Sequelize } = require("sequelize");
const configs = require("../config");

// Lấy giá trị từ biến môi trường
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);  

// Khởi tạo model
const TaiKhoan = require("./taiKhoan")(sequelize, Sequelize.DataTypes);
const KhachHang = require("./khachHang")(sequelize, Sequelize.DataTypes);
const NhanVien = require("./nhanVien")(sequelize, Sequelize.DataTypes);
const LoaiSanPham = require("./loaiSanPham")(sequelize, Sequelize.DataTypes);
const SanPham = require("./sanPham")(sequelize, Sequelize.DataTypes);
const DonHang = require("./donHang")(sequelize, Sequelize.DataTypes);
const ChiTietDonHang = require("./chiTietDonHang")(sequelize, Sequelize.DataTypes);

// Tạo object db
const db = {
  sequelize,
  Sequelize,
  TaiKhoan,
  KhachHang,
  NhanVien,
  LoaiSanPham,
  SanPham,
  DonHang,
  ChiTietDonHang
};

// Gọi associate để thiết lập quan hệ
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
