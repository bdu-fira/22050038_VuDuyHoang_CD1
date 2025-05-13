module.exports = (sequelize, DataTypes) => {
  const DonHang = sequelize.define("DonHang", {
    maDonHang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ngayLapDon: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tongTien: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    trangThai: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    taiKhoanNhanVien: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taiKhoanKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'donhang',
    timestamps: false, // Nếu không sử dụng createdAt và updatedAt
  });

  DonHang.associate = function(models) {
    DonHang.belongsTo(models.TaiKhoan, {
      foreignKey: 'taiKhoanNhanVien',
      targetKey: 'taiKhoan',
      as: 'nhanVien'
    });
  
    DonHang.belongsTo(models.TaiKhoan, {
      foreignKey: 'taiKhoanKhachHang',
      targetKey: 'taiKhoan',
      as: 'khachHang'
    });
  
    DonHang.hasMany(models.ChiTietDonHang, {
      foreignKey: 'maDonHang',
      as: 'chiTietDonHang'
    });
  };
  
  return DonHang;
};
