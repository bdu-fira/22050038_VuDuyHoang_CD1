module.exports = (sequelize, DataTypes) => {
  const LoaiSanPham = sequelize.define("LoaiSanPham", {
    maLoaiSanPham: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // Thêm thuộc tính autoIncrement
    },
    tenLoaiSanPham: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    tableName: 'loaisanpham',
    timestamps: false, // Nếu không sử dụng createdAt và updatedAt
  });

  return LoaiSanPham;
};
