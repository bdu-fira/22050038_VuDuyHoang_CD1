const API_URL = window.config.API_URL
const IMG_URL = window.config.IMG_URL

document.addEventListener('DOMContentLoaded', async () => {
    const navLinks = document.getElementById('nav-links');
    const userRaw = localStorage.getItem('user');
    let userData = null;
  
    try {
      userData = userRaw ? JSON.parse(userRaw) : null;
    } catch (e) {
      console.error('Lỗi parse user:', e);
      localStorage.removeItem('user');
    }
  
    const cartRaw = localStorage.getItem('cart');
    let cart = [];
    try {
      cart = cartRaw ? JSON.parse(cartRaw) : [];
    } catch (e) {
      console.error('Lỗi parse cart:', e);
      localStorage.removeItem('cart');
    }
  
    const cartCount = cart.reduce((total, item) => total + item.soLuong, 0);
  
    if (userData?.user?.khachHang?.hoTen) {
      const hoTen = userData.user.khachHang.hoTen;
      const khachHangId = userData.user.khachHang.maKhachHang;
  
      navLinks.innerHTML = `
        <li><a href="index.html">Trang Chủ</a></li>
        <li><span>Xin chào, ${hoTen}</span></li>
        <li><a href="#" id="logout-btn">Đăng Xuất</a></li>
        <li><a href="cart.html">Giỏ Hàng (<span id="cart-count">${cartCount}</span>)</a></li>
        <li><a href="DonHang.html">Đơn Hàng</a></li>
      `;
  
      document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        location.href = 'index.html';
      });
  
      // Gọi API lấy đơn hàng
      const res = await fetch(`${API_URL}/donhang/khachhang/${khachHangId}`);
      const json = await res.json();
  
      const container = document.getElementById('donhang-container');
      if (json.success && json.data.length > 0) {
        json.data.forEach(donHang => {
          const donHangEl = document.createElement('div');
          donHangEl.className = 'donhang-item';
          donHangEl.style.border = '1px solid #ccc';
          donHangEl.style.padding = '16px';
          donHangEl.style.marginBottom = '20px';
          donHangEl.innerHTML = `
            <h3>Đơn hàng #${donHang.maDonHang}</h3>
            <p><strong>Ngày lập:</strong> ${donHang.ngayLapDon}</p>
            <p><strong>Trạng thái:</strong> ${donHang.trangThai}</p>
            <p><strong>Tổng tiền:</strong> ${parseInt(donHang.tongTien).toLocaleString()}đ</p>
            <h4>Chi tiết sản phẩm:</h4>
            <ul>
              ${donHang.chiTietDonHang.map(ct => `
                <li>
                  <img src="${IMG_URL + ct.sanPham.anhSanPham}" width="60" style="vertical-align:middle; margin-right:8px;" />
                  <strong>${ct.sanPham.tenSanPham}</strong>
                  (${ct.sanPham.kichThuoc}, ${ct.sanPham.mauSac}) - 
                  SL: ${ct.soLuong} - Tổng: ${parseInt(ct.tongTien).toLocaleString()}đ
                </li>
              `).join('')}
            </ul>
          `;
          container.appendChild(donHangEl);
        });
      } else {
        container.innerHTML = `<p>Bạn chưa có đơn hàng nào.</p>`;
      }
  
    } else {
      navLinks.innerHTML = `
        <li><a href="index.html">Trang Chủ</a></li>
        <li><a href="login.html">Đăng Nhập</a></li>
        <li><a href="register.html">Đăng Ký</a></li>
        <li><a href="cart.html">Giỏ Hàng (<span id="cart-count">${cartCount}</span>)</a></li>
      `;
      document.getElementById('donhang-container').innerHTML = `<p>Vui lòng <a href="login.html">đăng nhập</a> để xem đơn hàng.</p>`;
    }
  });
  