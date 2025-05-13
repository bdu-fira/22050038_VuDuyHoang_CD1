module.exports = (sequelize, DataTypes) => {
  const SanPham = sequelize.define(
    "SanPham",
    {
      maSanPham: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      tenSanPham: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      anhSanPham: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      kichThuoc: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      mauSac: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      soLuong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      giaTien: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      moTa: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      maLoaiSanPham: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "sanpham",
      timestamps: false, // Nếu không sử dụng createdAt và updatedAt
    }
  );

  SanPham.associate = function (models) {
    SanPham.belongsTo(models.LoaiSanPham, {
      foreignKey: "maLoaiSanPham",
      targetKey: "maLoaiSanPham",
      as: "loai",
    });
  };
  return SanPham;
};
