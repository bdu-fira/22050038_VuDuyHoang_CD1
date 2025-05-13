const taiKhoanService = require("../services/taiKhoanService.js");

const getAllTaiKhoan = async (req, res) => {
  try {
    const taiKhoans = await taiKhoanService.getAllTaiKhoan();
    res.status(200).json(taiKhoans);
  } catch (error) {
    console.error("Lỗi lấy danh sách tài khoản:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const khoaMoTaiKhoan = async (req, res) => {
  const { id } = req.params;
  const { trangThai } = req.body;

  if (![0, 1].includes(trangThai)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ (chỉ chấp nhận 0 hoặc 1)" });
  }

  try {
    const taiKhoan = await taiKhoanService.updateTrangThaiTaiKhoan(id, trangThai);
    res.status(200).json({ message: "Cập nhật trạng thái thành công", taiKhoan });
  } catch (error) {
    res.status(500).json({ message: error.message || "Lỗi máy chủ" });
  }
};

module.exports = {
  getAllTaiKhoan,
  khoaMoTaiKhoan
};
