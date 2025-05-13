const {LoaiSanPham} = require("../models");

class LoaiSanPhamService {
  // Thêm loại sản phẩm
  static async addLoaiSanPham(tenLoaiSanPham) {
    try {
      const loaiSanPham = await LoaiSanPham.create({ tenLoaiSanPham });
      return loaiSanPham;
    } catch (error) {
      throw error;
    }
  }

  // Sửa loại sản phẩm
  static async updateLoaiSanPham(maLoaiSanPham, tenLoaiSanPham) {
    try {
      const loaiSanPham = await LoaiSanPham.findByPk(maLoaiSanPham);
      if (!loaiSanPham) {
        throw new Error('Loại sản phẩm không tồn tại');
      }
      loaiSanPham.tenLoaiSanPham = tenLoaiSanPham;
      await loaiSanPham.save();
      return loaiSanPham;
    } catch (error) {
      throw error;
    }
  }

  // Xóa loại sản phẩm
  static async deleteLoaiSanPham(maLoaiSanPham) {
    try {
      const loaiSanPham = await LoaiSanPham.findByPk(maLoaiSanPham);
      if (!loaiSanPham) {
        throw new Error('Loại sản phẩm không tồn tại');
      }
      await loaiSanPham.destroy();
      return { message: 'Loại sản phẩm đã được xóa' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoaiSanPhamService;
