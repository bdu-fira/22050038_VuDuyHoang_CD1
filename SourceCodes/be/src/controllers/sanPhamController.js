const sanPhamService = require('../services/sanPhamService');

const getAllLoaiSanPham = async (req, res) => {
  try {
    const loaiSanPham = await sanPhamService.getAllLoaiSanPham();
    res.json(loaiSanPham);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllSanPham = async (req, res) => {
  try {
    const sanPham = await sanPhamService.getAllSanPham();
    res.json(sanPham);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSanPhamByMaSanPham = async (req, res) => {
  const { maSanPham } = req.params; // Lấy maSanPham từ params của URL
  try {
    const sanPham = await sanPhamService.getSanPhamByMaSanPham(maSanPham);
    res.status(200).json(sanPham);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createSanPham = async (req, res) => {
  try {
    const data = req.body;
    
    // Thêm tên file ảnh vào dữ liệu
    if (req.file) {
      data.anhSanPham = req.file.filename; // hoặc `req.file.path` nếu bạn lưu cả đường dẫn
    }

    const sanPham = await sanPhamService.createSanPham(data);
    res.status(201).json(sanPham);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSanPham = async (req, res) => {
  try {
    const sanPham = await sanPhamService.updateSanPham(req.params.maSanPham, req.body);
    res.json(sanPham);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSanPham = async (req, res) => {
  try {
    await sanPhamService.deleteSanPham(req.params.maSanPham);
    res.json({ message: "Xoá sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
