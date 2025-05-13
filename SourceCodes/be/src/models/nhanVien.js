module.exports = (sequelize, DataTypes) => {
  const NhanVien = sequelize.define("NhanVien", {
    maNhanVien: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    hoTen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    chucVu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    taiKhoan: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    }
  }, {
    tableName: 'nhanvien',
    timestamps: false, // Nếu không sử dụng createdAt và updatedAt
  });

  NhanVien.associate = function(models) {
    NhanVien.belongsTo(models.TaiKhoan, { foreignKey: 'taiKhoan', targetKey: 'taiKhoan' });
  };

  return NhanVien;
};
