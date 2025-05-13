const donHangService = require('../services/donHangService.js');

exports.taoDonHang = async (req, res) => {
  try {
    const donHangData = req.body;
    const newDonHang = await donHangService.taoDonHang(donHangData);
    res.status(201).json({ success: true, data: newDonHang });
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllDonHang = async (req, res) => {
  try {
    const data = await donHangService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

exports.getDonHangByKhachHang = async (req, res) => {
  const taiKhoanKhachHang = req.params.taiKhoanKhachHang;

  try {
    const data = await donHangService.getByKhachHang(taiKhoanKhachHang);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

exports.confirmOrder = async (req, res) => {
  const { maDonHang } = req.params;

  try {
    // Gọi service để xác nhận đơn hàng
    const result = await donHangService.confirmOrder(maDonHang);
    
    // Trả về kết quả thành công
    return res.status(200).json({
      success: true,
      message: 'Đơn hàng đã được xác nhận thành công!',
    });
  } catch (error) {
    // Trả về lỗi nếu có
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};