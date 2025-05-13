const express = require('express');
const router = express.Router();
const donHangController = require('../controllers/donHangController.js');

router.post('/', donHangController.taoDonHang);

// Lấy tất cả đơn hàng
router.get('/', donHangController.getAllDonHang);

// Lấy đơn hàng theo tài khoản khách hàng
router.get('/khachhang/:taiKhoanKhachHang', donHangController.getDonHangByKhachHang);
router.put('/xacnhan/:maDonHang/', donHangController.confirmOrder);

module.exports = router;
