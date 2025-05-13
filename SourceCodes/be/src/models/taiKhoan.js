module.exports = (sequelize, DataTypes) => {
  const TaiKhoan = sequelize.define("TaiKhoan", {
    taiKhoan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Đảm bảo cột này tự tăng
      allowNull: false,
    },
    matKhau: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    soDienThoai: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    trangThai: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    ngayTao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    loaiTaiKhoan: {
      type: DataTypes.ENUM('KHACH_HANG', 'NHAN_VIEN'),
      allowNull: false,
    }
  }, {
    tableName: 'taikhoan',
    timestamps: false, // Nếu không sử dụng createdAt và updatedAt
  });
  TaiKhoan.associate = (models) => {
    TaiKhoan.hasOne(models.KhachHang, {
      foreignKey: 'taiKhoan',  // đây là tên cột khóa ngoại trong bảng KhachHang
      as: 'khachHang',         // alias này phải trùng với phần include ở login
    });
  };
  
  return TaiKhoan;
};
