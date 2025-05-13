module.exports = (sequelize, DataTypes) => {
  const ChiTietDonHang = sequelize.define("ChiTietDonHang", {
    maChiTietDonHang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    soLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tongTien: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    maDonHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'chitietdonhang',
    timestamps: false, // Nếu không sử dụng createdAt và updatedAt
  });

  ChiTietDonHang.associate = function(models) {
    ChiTietDonHang.belongsTo(models.DonHang, {
      foreignKey: 'maDonHang',
      as: 'donHang',
      onDelete: 'CASCADE'
    });
  
    ChiTietDonHang.belongsTo(models.SanPham, {
      foreignKey: 'maSanPham',
      as: 'sanPham',
      onDelete: 'CASCADE'
    });
  };
  

  return ChiTietDonHang;
};
