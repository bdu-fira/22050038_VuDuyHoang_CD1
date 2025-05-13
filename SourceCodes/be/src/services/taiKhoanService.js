const {TaiKhoan, KhachHang} = require("../models");

const getAllTaiKhoan = async () => {
    try {
      const taiKhoans = await TaiKhoan.findAll({
        include: [
          {
            model: KhachHang,
            as: "khachHang"
          }
        ]
      });
      return taiKhoans;
    } catch (error) {
      throw error;
    }
  };

  const updateTrangThaiTaiKhoan = async (taiKhoanId, trangThaiMoi) => {
    try {
      const taiKhoan = await TaiKhoan.findByPk(taiKhoanId);
      if (!taiKhoan) {
        throw new Error("Tài khoản không tồn tại");
      }
  
      taiKhoan.trangThai = trangThaiMoi;
      await taiKhoan.save();
      return taiKhoan;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
    getAllTaiKhoan,
    updateTrangThaiTaiKhoan
};