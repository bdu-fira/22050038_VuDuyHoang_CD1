const { AppError } = require("../helpers/error");
const jwt = require("jsonwebtoken");
const db = require("../models");
const configs = require("../config");

const TaiKhoan = db.TaiKhoan;

const extractTokenFromHeaders = (headers) => {
  const bearerToken = headers.authorization;
  if (bearerToken) {
    const parts = bearerToken.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
      throw new AppError(401, "Token không hợp lệ");
    }
    return parts[1];
  }
  throw new AppError(401, "Không có token");
};

const authorization = async (req, res, next) => {
  try {
    const token = extractTokenFromHeaders(req.headers);
    const payload = jwt.verify(token, "CHV");
    console.log(payload);
    

    const taiKhoan = await TaiKhoan.findByPk(payload.idUser); // Hoặc payload.id nếu token chứa id
    if (!taiKhoan) {
      throw new AppError(401, "Token không hợp lệ");
    }

    res.locals.user = taiKhoan;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, "Token không hợp lệ"));
    } else {
      next(error);
    }
  }
};

const onlyNhanVien = (req, res, next) => {
    const user = res.locals.user;
  
    if (!user) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }
  
    if (user.loaiTaiKhoan !== "ADMIN" && user.loaiTaiKhoan !== "NHAN_VIEN") {
      return res.status(403).json({ message: "Không có quyền thực hiện chức năng này" });
    }
  
    next();
  };
  
  module.exports = {
    authorization,
    onlyNhanVien,
  };
