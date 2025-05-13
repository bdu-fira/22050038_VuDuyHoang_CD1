const express = require("express");
const router = express.Router();
const taiKhoanController = require("../controllers/taiKhoanController.js");
const { authorization, onlyNhanVien } = require("../middlewares/authorization.js");

router.get("/", taiKhoanController.getAllTaiKhoan);
router.put("/:id/trang-thai", authorization, onlyNhanVien, taiKhoanController.khoaMoTaiKhoan);


module.exports = router;