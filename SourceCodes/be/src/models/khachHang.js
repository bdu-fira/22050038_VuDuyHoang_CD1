module.exports = (sequelize, DataTypes) => {
  const KhachHang = sequelize.define("KhachHang", {
    maKhachHang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Đảm bảo cột này tự tăng
      allowNull: false,
    },
    hoTen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    diaChi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    taiKhoan: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
    }
  }, {
    tableName: 'khachhang',
    timestamps: false, // Nếu không sử dụng createdAt và updatedAt
  });

  KhachHang.associate = function(models) {
    KhachHang.belongsTo(models.TaiKhoan, { foreignKey: 'taiKhoan', targetKey: 'taiKhoan',as: 'taiKhoanInfo' });
  };

  return KhachHang;
};
