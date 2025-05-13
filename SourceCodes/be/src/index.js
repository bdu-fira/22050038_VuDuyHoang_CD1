const express = require("express");
const cors = require("cors"); 
const { handleErrors } = require("./helpers/error.js");
const { sequelize } = require("./models");
const authRoutes = require("./routers/authRoutes.js"); // Đảm bảo rằng đường dẫn này đúng
const sanPhamRoutes = require("./routers/sanPhamRoutes.js"); // Đảm bảo rằng đường dẫn này đúng
const loaiSanPhamRoutes = require("./routers/loaiSanPhamRoutes.js"); // Đảm bảo rằng đường dẫn này đúng
const donHangRoutes = require("./routers/donHangRoutes.js"); // Đảm bảo rằng đường dẫn này đúng
const taiKhoanRoutes = require("./routers/taiKhoanRoutes.js"); // Đảm bảo rằng đường dẫn này đúng
const path = require('path');

const app = express();

app.use(cors()); // 
app.use(express.json()); // Middleware để parse JSON

const port = 4000;

// Sử dụng route đăng ký
app.use("/api/auth", authRoutes);
app.use("/api", loaiSanPhamRoutes)
app.use("/api", sanPhamRoutes);
app.use("/api/donhang", donHangRoutes);
app.use("/api/taiKhoan", taiKhoanRoutes);

// Xử lý lỗi
app.use(handleErrors);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
