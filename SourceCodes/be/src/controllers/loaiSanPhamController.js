const LoaiSanPhamService = require('../services/loaiSanPhamService');

class LoaiSanPhamController {
  // Thêm loại sản phẩm
  static async addLoaiSanPham(req, res) {
    const { tenLoaiSanPham } = req.body;
    try {
      const loaiSanPham = await LoaiSanPhamService.addLoaiSanPham(tenLoaiSanPham);
      res.status(201).json(loaiSanPham);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Sửa loại sản phẩm
  static async updateLoaiSanPham(req, res) {
    const { maLoaiSanPham } = req.params;
    const { tenLoaiSanPham } = req.body;
    try {
      const loaiSanPham = await LoaiSanPhamService.updateLoaiSanPham(maLoaiSanPham, tenLoaiSanPham);
      res.status(200).json(loaiSanPham);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Xóa loại sản phẩm
  static async deleteLoaiSanPham(req, res) {
    const { maLoaiSanPham } = req.params;
    try {
      const result = await LoaiSanPhamService.deleteLoaiSanPham(maLoaiSanPham);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = LoaiSanPhamController;
