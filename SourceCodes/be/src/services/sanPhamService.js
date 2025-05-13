const {SanPham, LoaiSanPham} = require("../models"); // Đảm bảo bạn đã import đúng model

const getAllLoaiSanPham = async () => {
  try {
    const loaiSanPhams = await LoaiSanPham.findAll(); 
    return loaiSanPhams;
  } catch (error) {
    throw error;
  }
};

const getAllSanPham = async () => {
  try {
    const sanPhams = await SanPham.findAll({
      include: [{
        model: LoaiSanPham,
        as: "loai",
        attributes: ['maLoaiSanPham', 'tenLoaiSanPham'] // chỉ lấy 2 field này từ LoaiSanPham
      }]
    });
    return sanPhams;
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết sản phẩm theo mã sản phẩm
const getSanPhamByMaSanPham = async (maSanPham) => {
  try {
    const sanPham = await SanPham.findOne({
      where: { maSanPham },
      include: [{
        model: LoaiSanPham,
        as: "loai",
        attributes: ['maLoaiSanPham', 'tenLoaiSanPham']
      }]
    });

    if (!sanPham) {
      throw new Error("Sản phẩm không tồn tại");
    }

    return sanPham;
  } catch (error) {
    throw error;
  }
};

const createSanPham = async (data) => {
  try {
    return await SanPham.create(data);
  } catch (error) {
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

const updateSanPham = async (maSanPham, newData) => {
  try {
    const sanPham = await SanPham.findByPk(maSanPham);
    if (!sanPham) {
      throw new Error("Không tìm thấy sản phẩm để cập nhật");
    }
    await sanPham.update(newData);
    return sanPham;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật sản phẩm: " + error.message);
  }
};
const deleteSanPham = async (maSanPham) => {
  try {
    const sanPham = await SanPham.findByPk(maSanPham);
    if (!sanPham) {
      throw new Error("Không tìm thấy sản phẩm để xoá");
    }
    await sanPham.destroy();
  } catch (error) {
    throw new Error("Lỗi khi xoá sản phẩm: " + error.message);
  }
};

module.exports = {
  getAllLoaiSanPham,
  getAllSanPham,
  getSanPhamByMaSanPham,
  createSanPham,
  updateSanPham,
  deleteSanPham
};
