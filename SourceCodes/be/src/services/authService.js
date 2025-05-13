const { TaiKhoan, KhachHang } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const registerUser = async (hoTen, email, soDienThoai, matKhau, loaiTaiKhoan) => {
  try {
    // Kiểm tra đầu vào
    if (!hoTen || !email || !soDienThoai || !matKhau || !loaiTaiKhoan) {
      return { status: 400, message: "Vui lòng cung cấp đầy đủ thông tin!" };
    }

    // Kiểm tra tài khoản đã tồn tại
    const existingUser = await TaiKhoan.findOne({ where: { soDienThoai } });
    if (existingUser) {
      return { status: 400, message: "Số điện thoại đã được đăng ký!" };
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(matKhau, 10);

    // Tạo tài khoản mới
    const taiKhoan = await TaiKhoan.create({
      matKhau: hashedPassword,
      soDienThoai,
      trangThai: 1, // Giả sử trạng thái tài khoản là 1 cho tài khoản hoạt động
      ngayTao: new Date(),
      loaiTaiKhoan
    });

    // Tạo thông tin người dùng nếu là KHACH_HANG
    if (loaiTaiKhoan === "KHACH_HANG") {
      await KhachHang.create({
        hoTen,
        email,
        taiKhoan: taiKhoan.taiKhoan
      });
    }

    return { status: 201, message: "Đăng ký thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Có lỗi xảy ra khi đăng ký.");
  }
};


const login = async (taiKhoanHoacSDT, matKhau) => {
  const user = await TaiKhoan.findOne({
    where: {
      [Op.or]: [
        { taiKhoan: taiKhoanHoacSDT },
        { soDienThoai: taiKhoanHoacSDT }
      ],
      trangThai: 1,
    },
    include: {
      model: KhachHang,
      as: "khachHang",
      attributes: ["hoTen", "email", "maKhachHang"],
    }
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(matKhau, user.matKhau);
  if (!isMatch) return null;

  const payload = {
    idUser: user.taiKhoan,
    loaiTaiKhoan: user.loaiTaiKhoan,
  };

  const token = jwt.sign(payload, "CHV", { expiresIn: "1d" });

  return {
    token,
    user,
  };
};


module.exports = {
  registerUser,
  login
};
