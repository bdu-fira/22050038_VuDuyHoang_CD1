const authService = require("../services/authService");

const register = async (req, res) => {
  const { hoTen, email, soDienThoai, matKhau, loaiTaiKhoan } = req.body;

  try {
    const result = await authService.registerUser(hoTen, email, soDienThoai, matKhau, loaiTaiKhoan);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau!" });
  }
};

const login = async (req, res) => {
  const { taiKhoan, matKhau } = req.body;

  if (!taiKhoan || !matKhau) {
    return res.status(400).json({ message: 'Thiếu tài khoản hoặc mật khẩu' });
  }

  try {
    const result = await authService.login(taiKhoan, matKhau);
    if (!result) {
      return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    }

    res.json({ message: 'Đăng nhập thành công', taiKhoan: result });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = {
  register,
  login
};
