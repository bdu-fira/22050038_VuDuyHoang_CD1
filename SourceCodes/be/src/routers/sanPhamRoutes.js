const express = require('express');
const router = express.Router();
const {
  getAllLoaiSanPham,
  getAllSanPham,
  getSanPhamByMaSanPham,
  createSanPham,
  updateSanPham,
  deleteSanPham
} = require('../controllers/sanPhamController.js');
const upload = require('../middlewares/upload.js');

// Lấy danh sách loại sản phẩm
router.get('/loai-san-pham', getAllLoaiSanPham);

// Lấy danh sách sản phẩm
router.get('/san-pham', getAllSanPham);
router.get("/san-pham/:maSanPham", getSanPhamByMaSanPham);

// 🆕 Thêm, cập nhật, xoá sản phẩm
router.post('/san-pham', (req, res, next) => {
  upload.single('anhSanPham')(req, res, function (err) {
    if (err) {
      console.error('Lỗi khi upload ảnh:', err);
      return res.status(400).json({ error: 'Upload ảnh thất bại', details: err.message });
    }

    // Nếu không có lỗi thì tiếp tục tới controller createSanPham
    next();
  });
}, createSanPham);
router.put("/san-pham/:maSanPham", updateSanPham);
router.delete("/san-pham/:maSanPham", deleteSanPham);

module.exports = router;
