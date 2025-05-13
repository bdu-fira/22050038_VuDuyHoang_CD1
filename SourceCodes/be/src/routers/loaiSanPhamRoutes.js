const express = require('express');
const router = express.Router();
const LoaiSanPhamController = require('../controllers/loaiSanPhamController');

// Thêm loại sản phẩm
router.post('/loai-san-pham', LoaiSanPhamController.addLoaiSanPham);

// Sửa loại sản phẩm
router.put('/loai-san-pham/:maLoaiSanPham', LoaiSanPhamController.updateLoaiSanPham);

// Xóa loại sản phẩm
router.delete('/loai-san-pham/:maLoaiSanPham', LoaiSanPhamController.deleteLoaiSanPham);

module.exports = router;
