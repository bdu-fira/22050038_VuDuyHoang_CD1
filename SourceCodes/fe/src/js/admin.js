const API_URL = window.config.API_URL
const IMG_URL = window.config.IMG_URL

// Kiểm tra xem người dùng đã đăng nhập hay chưa
// Nếu chưa, chuyển hướng đến trang đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");  // Hoặc key bạn đang dùng
  if (!token) {
      alert("Vui lòng đăng nhập trước.");
      window.location.href = "login.html";
  }
});

function logout() {
  localStorage.clear();  // Xóa toàn bộ localStorage
  window.location.href = "index.html";  // Chuyển hướng về trang đăng nhập (bạn thay đường dẫn nếu khác)
}


// ========================= Quản lý Loại sản phẩm =========================
// Hàm lấy danh sách loại sản phẩm từ API và hiển thị trên bảng
const fetchLoaiSanPhamList = async () => {
  const res = await fetch(`${API_URL}/loai-san-pham`);
  const data = await res.json();
  const tbody = document.querySelector('#loaiSanPhamTable tbody');
  tbody.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
  data.forEach(loai => {
    const row = `
      <tr>
        <td>${loai.maLoaiSanPham}</td>
        <td>${loai.tenLoaiSanPham}</td>
        <td>
          <button class="edit-loai-sp-btn" data-loai='${JSON.stringify(loai)}'>Sửa</button>
          <button class="delete-loai-sp-btn" data-ma='${loai.maLoaiSanPham}'>Xoá</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
};

// Hàm được gọi khi nút "Sửa" loại sản phẩm được nhấn (thông qua event delegation)
// Đổ dữ liệu của loại sản phẩm được chọn vào form để chỉnh sửa
const editLoaiSanPham = (loai) => {
  const formTitleLoai = document.querySelector("#loaiSanPham h2 + h3");
  if (formTitleLoai) {
    formTitleLoai.innerText = "Sửa Loại sản phẩm"; // Thay đổi tiêu đề form
    document.getElementById("maLoaiSanPhamHidden").value = loai.maLoaiSanPham;
    document.getElementById("tenLoaiSanPham").value = loai.tenLoaiSanPham;
  } else {
    console.error("Không tìm thấy tiêu đề form loại sản phẩm để chỉnh sửa.");
  }
};

// Hàm được gọi khi nút "Huỷ" form loại sản phẩm được nhấn
// Reset form và đặt lại tiêu đề thành "Thêm Loại sản phẩm"
const resetLoaiForm = () => {
  const formTitleLoai = document.querySelector("#loaiSanPham h2 + h3");
  if (formTitleLoai) {
    formTitleLoai.innerText = "Thêm Loại sản phẩm"; // Đặt lại tiêu đề form
    document.getElementById("loaiSanPhamForm").reset();
    document.getElementById("maLoaiSanPhamHidden").value = "";
  } else {
    console.error("Không tìm thấy tiêu đề form loại sản phẩm để reset.");
  }
};

// Hàm gọi API để xóa loại sản phẩm dựa trên mã
const deleteLoaiSanPham = async (ma) => {
  if (confirm("Bạn có chắc muốn xoá loại sản phẩm này không?")) {
    await fetch(`${API_URL}/loai-san-pham/${ma}`, { method: "DELETE" });
    await fetchLoaiSanPhamList(); // Tải lại danh sách sau khi xóa
    await fetchLoaiSanPham(); // Cập nhật dropdown sản phẩm (nếu cần)
  }
};

// Event listener cho form "Loại sản phẩm" khi submit
document.getElementById("loaiSanPhamForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const tenLoaiSanPham = document.getElementById("tenLoaiSanPham").value;
  const maLoaiSanPham = document.getElementById("maLoaiSanPhamHidden").value;
  const data = { tenLoaiSanPham };

  const method = maLoaiSanPham ? "PUT" : "POST";
  const url = maLoaiSanPham ? `${API_URL}/loai-san-pham/${maLoaiSanPham}` : `${API_URL}/loai-san-pham`;

  await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  resetLoaiForm(); // Reset form sau khi lưu
  await fetchLoaiSanPhamList(); // Tải lại danh sách
  await fetchLoaiSanPham(); // Cập nhật dropdown sản phẩm
});

// ========================= Quản lý Sản phẩm =========================
// Hàm lấy danh sách loại sản phẩm từ API và cập nhật dropdown trong form sản phẩm
const fetchLoaiSanPham = async () => {
  const res = await fetch(`${API_URL}/loai-san-pham`);
  const data = await res.json();
  const select = document.getElementById('maLoaiSanPham');
  select.innerHTML = data.map(loai => `<option value="${loai.maLoaiSanPham}">${loai.tenLoaiSanPham}</option>`).join('');
};

// Hàm lấy danh sách sản phẩm từ API và hiển thị trên bảng
const fetchSanPham = async () => {
  const res = await fetch(`${API_URL}/san-pham`);
  const data = await res.json();
  const tbody = document.querySelector('#sanPhamTable tbody');
  tbody.innerHTML = ''; // Xóa nội dung cũ
  data.forEach(sp => {
    const row = `
      <tr>
        <td>${sp.maSanPham}</td>
        <td>${sp.tenSanPham}</td>
        <td><img src="${IMG_URL+sp.anhSanPham}" style="max-width: 50px; height: auto;" /></td>
        <td>${sp.kichThuoc}</td>
        <td>${sp.mauSac}</td>
        <td>${sp.soLuong}</td>
        <td>${sp.giaTien + " VND"}</td>
        <td>${sp.moTa}</td>
        <td>${sp.maLoaiSanPham}</td>
        <td>
          <button class="edit-sp-btn" data-sp='${JSON.stringify(sp)}'>Sửa</button>
          <button class="delete-sp-btn" data-ma='${sp.maSanPham}'>Xoá</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
  searchSanPham(); // Gọi hàm tìm kiếm sau khi tải lại dữ liệu
};

// Hàm được gọi khi nút "Sửa" sản phẩm được nhấn (thông qua event delegation)
// Đổ dữ liệu của sản phẩm được chọn vào form để chỉnh sửa
const editSanPham = (sp) => {
  const formTitleSanPham = document.querySelector("#sanPham h3");
  if (formTitleSanPham) {
    formTitleSanPham.innerText = "Sửa sản phẩm"; // Thay đổi tiêu đề form
    document.getElementById("maSanPham").value = sp.maSanPham;
    document.getElementById("tenSanPham").value = sp.tenSanPham;
    document.getElementById("kichThuoc").value = sp.kichThuoc;
    document.getElementById("mauSac").value = sp.mauSac;
    document.getElementById("soLuong").value = sp.soLuong;
    document.getElementById("giaTien").value = sp.giaTien;
    document.getElementById("moTa").value = sp.moTa;
    document.getElementById("maLoaiSanPham").value = sp.maLoaiSanPham;
  } else {
    console.error("Không tìm thấy tiêu đề form sản phẩm để chỉnh sửa.");
  }
};

// Hàm được gọi khi nút "Huỷ" form sản phẩm được nhấn
// Reset form và đặt lại tiêu đề thành "Thêm sản phẩm"
const resetForm = () => {
  const formTitleSanPham = document.querySelector("#sanPham h1 + h3");
  if (formTitleSanPham) {
    formTitleSanPham.innerText = "Thêm sản phẩm"; // Đặt lại tiêu đề form
    document.getElementById("sanPhamForm").reset();
    document.getElementById("maSanPham").value = ""; // Reset cả mã sản phẩm khi thêm mới
  } else {
    console.error("Không tìm thấy tiêu đề form sản phẩm để reset.");
  }
};

// Hàm gọi API để xóa sản phẩm dựa trên mã
const deleteSanPham = async (ma) => {
  if (confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
    await fetch(`${API_URL}/san-pham/${ma}`, { method: "DELETE" });
    fetchSanPham(); // Tải lại danh sách sau khi xóa
  }
};

// Event listener cho form "Sản phẩm" khi submit
document.getElementById("sanPhamForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = document.forms["sanPhamForm"];
  const maSanPham = document.getElementById("maSanPham").value;

  const formData = new FormData();
  formData.append("tenSanPham", form["tenSanPham"].value);
  formData.append("kichThuoc", form["kichThuoc"].value);
  formData.append("mauSac", form["mauSac"].value);
  formData.append("soLuong", form["soLuong"].value);
  formData.append("giaTien", form["giaTien"].value);
  formData.append("moTa", form["moTa"].value);
  formData.append("maLoaiSanPham", form["maLoaiSanPham"].value);

  const fileInput = form["anhSanPham"];
  if (fileInput && fileInput.files.length > 0) {
    formData.append("anhSanPham", fileInput.files[0]);
  }

  const method = maSanPham ? "PUT" : "POST";
  const url = maSanPham ? `${API_URL}/san-pham/${maSanPham}` : `${API_URL}/san-pham`;

  await fetch(url, {
    method: method,
    body: formData,
  });

  fetchSanPham();
  resetForm();
});


// Hàm tìm kiếm sản phẩm (không thay đổi)
const searchSanPham = () => {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll('#sanPhamTable tbody tr');

  rows.forEach(row => {
    const tenSanPham = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    if (tenSanPham.includes(searchTerm)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
};

// Event delegation cho nút "Sửa" và "Xóa" sản phẩm
document.querySelector('#sanPhamTable tbody').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-sp-btn')) {
    const spData = JSON.parse(event.target.dataset.sp);
    console.log(spData);
    
    editSanPham(spData);
  } else if (event.target.classList.contains('delete-sp-btn')) {
    const maSanPham = event.target.dataset.ma;
    deleteSanPham(maSanPham);
  }
});

// Event delegation cho nút "Sửa" và "Xóa" loại sản phẩm
document.querySelector('#loaiSanPhamTable tbody').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-loai-sp-btn')) {
    const loaiData = JSON.parse(event.target.dataset.loai);
    editLoaiSanPham(loaiData);
  } else if (event.target.classList.contains('delete-loai-sp-btn')) {
    const maLoaiSanPham = event.target.dataset.ma;
    deleteLoaiSanPham(maLoaiSanPham);
  }
});


// ========================= Quản lý Đơn hàng =========================

// Hàm lấy danh sách đơn hàng từ API và hiển thị trên bảng
const fetchDonHangList = async () => {
  const res = await fetch(`${API_URL}/donhang`);
  const data = await res.json();
  const tbody = document.querySelector('#donHangTable tbody');
  tbody.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới

  // Lặp qua danh sách đơn hàng và tạo các dòng trong bảng
  data.data.forEach(donHang => {
    // Tạo danh sách sản phẩm và số lượng
    const sanPhamList = donHang.chiTietDonHang.map(item => `${item.sanPham.tenSanPham} (x${item.soLuong})`).join(', ');

    // Tạo dòng mới cho mỗi đơn hàng
    const row = `
      <tr>
        <td>${donHang.maDonHang}</td>
        <td>${donHang.taiKhoanKhachHang ? donHang.taiKhoanKhachHang : 'N/A'}</td>
        <td>${sanPhamList}</td>
        <td>${donHang.chiTietDonHang.map(item => item.soLuong).join(', ')}</td>
        <td>${donHang.tongTien}</td> <!-- Thay Địa chỉ bằng Tổng tiền -->
        <td>${donHang.ngayLapDon}</td>
        <td>${donHang.trangThai}</td>
        <td>
          <button class="confirm-don-hang-btn" data-ma='${donHang.maDonHang}'>Xác nhận</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row; // Thêm dòng vào bảng
  });
};

// Hàm gọi API để xác nhận đơn hàng
const confirmDonHang = async (ma) => {
  if (confirm("Bạn có chắc muốn xác nhận đơn hàng này không?")) {
    await fetch(`${API_URL}/donhang/xacnhan/${ma}`, { method: "PUT" }); // Sử dụng PATCH để cập nhật trạng thái
    await fetchDonHangList(); // Tải lại danh sách đơn hàng sau khi xác nhận
  }
};

// Event listener cho các nút "Xác nhận" đơn hàng
document.querySelector('#donHangTable tbody').addEventListener('click', (event) => {
  if (event.target.classList.contains('confirm-don-hang-btn')) {
    const maDonHang = event.target.dataset.ma;
    confirmDonHang(maDonHang);
  }
});

// ========================= Quản lý Tài khoản =========================
async function fetchTaiKhoanList() {
  try {
      const res = await fetch(`${API_URL}/taiKhoan`);
      const data = await res.json();
      const tbody = document.querySelector("#taiKhoanTable tbody");
      tbody.innerHTML = "";

      data.forEach(tk => {
          const row = document.createElement("tr");

          row.innerHTML = `
              <td>${tk.taiKhoan}</td>
              <td>${tk.soDienThoai}</td>
              <td>${tk.loaiTaiKhoan}</td>
              <td>${tk.ngayTao}</td>
              <td>${tk.khachHang?.hoTen || ""}</td>
              <td>${tk.khachHang?.email || ""}</td>
              <td>${tk.trangThai === 1 ? "Hoạt động" : "Đã khóa"}</td>
              <td>
                  <button onclick="toggleTrangThai(${tk.taiKhoan}, ${tk.trangThai})">
                      ${tk.trangThai === 1 ? "Khoá" : "Mở"}
                  </button>
              </td>
          `;

          tbody.appendChild(row);
      });
  } catch (err) {
      console.error("Lỗi khi tải danh sách tài khoản:", err);
  }
}

async function toggleTrangThai(taiKhoanId, currentStatus) {
  const newStatus = currentStatus === 1 ? 0 : 1;

  try {
    const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/taiKhoan/${taiKhoanId}/trang-thai`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Thêm token vào header
           },
          body: JSON.stringify({ trangThai: newStatus })
      });

      if (res.ok) {
          alert('Cập nhật thành công');
          fetchTaiKhoanList();
      } else {
          alert('Cập nhật thất bại');
      }
  } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
  }
  searchSoDienThoai();
}

// Hàm tìm kiếm theo số điện thoại
const searchSoDienThoai = () => {
  const searchTerm = document.getElementById("searchSDTInput").value.toLowerCase(); // Lấy giá trị tìm kiếm từ input

  const rows = document.querySelectorAll('#taiKhoanTable tbody tr'); // Lấy tất cả các dòng trong bảng
  
  rows.forEach(row => {
    console.log(row);
    const soDienThoai = row.querySelector("td:nth-child(2)").textContent.toLowerCase(); // Lấy số điện thoại từ cột thứ 3
    if (soDienThoai.includes(searchTerm)) {
      row.style.display = ""; // Hiển thị dòng nếu số điện thoại có chứa từ khóa tìm kiếm
    } else {
      row.style.display = "none"; // Ẩn dòng nếu số điện thoại không chứa từ khóa tìm kiếm
    }
  });
};



// Load dữ liệu khi trang được tải (không thay đổi)
window.onload = async () => {
  await fetchLoaiSanPhamList();
  await fetchLoaiSanPham();
  await fetchTaiKhoanList(); // Lấy danh sách tài khoản khi trang được tải
  await fetchSanPham();
  await fetchDonHangList(); // Lấy danh sách đơn hàng khi trang được tải
  searchSanPham();
};



