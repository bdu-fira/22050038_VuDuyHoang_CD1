const { DonHang, ChiTietDonHang, SanPham, TaiKhoan, sequelize } = require('../models');

exports.taoDonHang = async (data) => {
  const { ngayLapDon, tongTien, trangThai, taiKhoanNhanVien, taiKhoanKhachHang, chiTietDonHang } = data;

  if (!Array.isArray(chiTietDonHang) || chiTietDonHang.length === 0) {
    throw new Error("Chi tiết đơn hàng không được bỏ trống");
  }

  return await sequelize.transaction(async (t) => {
    // Tạo đơn hàng
    const donHang = await DonHang.create({
      ngayLapDon,
      tongTien,
      trangThai,
      taiKhoanNhanVien,
      taiKhoanKhachHang
    }, { transaction: t });

    // Tạo chi tiết đơn hàng
    for (const item of chiTietDonHang) {
      await ChiTietDonHang.create({
        maDonHang: donHang.maDonHang,
        maSanPham: item.maSanPham,
        soLuong: item.soLuong,
        tongTien: item.tongTien
      }, { transaction: t });
    }

    return donHang;
  });
};

exports.getAll = async () => {
  return await DonHang.findAll({
    include: [
      {
        model: ChiTietDonHang,
        as: 'chiTietDonHang', // BẮT BUỘC phải có "as"
        include: [
          {
            model: SanPham,
            as: 'sanPham' // Nếu bạn đã đặt alias cho SanPham
          }
        ]
      }
    ],
    order: [['ngayLapDon', 'DESC']]
  });
};

exports.getByKhachHang = async (taiKhoanKhachHang) => {
  return await DonHang.findAll({
    where: { taiKhoanKhachHang },
    include: [
      {
        model: ChiTietDonHang,
        as: 'chiTietDonHang',
        include: [
          {
            model: SanPham,
            as: 'sanPham'
          }
        ]
      }
    ],
    order: [['ngayLapDon', 'DESC']]
  });
};


exports.confirmOrder = async (maDonHang) => {
  // Tìm đơn hàng theo mã
  const donHang = await DonHang.findOne({
    where: { maDonHang },
  });

  if (!donHang) {
    throw new Error('Đơn hàng không tồn tại');
  }

  // Cập nhật trạng thái đơn hàng thành 'Đã xác nhận'
  donHang.trangThai = 'Đã xác nhận';

  // Lưu đơn hàng đã được xác nhận
  await donHang.save();

  return donHang;
};