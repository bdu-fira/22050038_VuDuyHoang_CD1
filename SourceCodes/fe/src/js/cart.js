const API_URL = window.config.API_URL
const IMG_URL = window.config.IMG_URL

// Thêm nút "Xóa" cho từng sản phẩm trong giỏ hàng
function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElem = document.getElementById('total-price');
  const cartCountElem = document.getElementById('cart-count');

  cartItemsContainer.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const price = parseFloat(item.giaTien) || 0;
    const qty = item.quantity || 1;
    const itemTotal = price * qty;
    total += itemTotal;

    const itemElem = document.createElement('div');
    itemElem.classList.add('cart-item');

    itemElem.innerHTML = `
      <img src="${IMG_URL + item.anhSanPham}" alt="${item.tenSanPham}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.tenSanPham}</h3>
        <p>Giá: ${price.toLocaleString()} VNĐ</p>
        <p>Số lượng: ${qty}</p>
        <p>Thành tiền: ${(itemTotal).toLocaleString()} VNĐ</p>
      </div>
      <button class="remove-btn">Xóa</button>
    `;

    // Thêm sự kiện click cho nút "Xóa"
    const removeBtn = itemElem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => removeItemFromCart(item.maSanPham));

    cartItemsContainer.appendChild(itemElem);
  });

  totalPriceElem.textContent = `Tổng: ${total.toLocaleString()} VNĐ`;
  cartCountElem.textContent = cart.reduce((total, item) => total + (item.quantity || 0), 0);
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItemFromCart(maSanPham) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.maSanPham !== maSanPham);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// Gửi đơn hàng lên server khi thanh toán
async function checkout() {
  const userRaw = localStorage.getItem('user');
  if (!userRaw) {
    alert('Bạn cần đăng nhập trước khi thanh toán!');
    window.location.href = 'login.html';  
    return;
  }
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
  }

  let userData = null;
  try {
    userData = JSON.parse(userRaw);
  } catch (e) {
    console.error('Lỗi parse user:', e);
    localStorage.removeItem('user');
  }

  const taiKhoanNhanVien = 1
  const taiKhoanKhachHang = userData.user.khachHang.maKhachHang;

  const tongTien = cart.reduce((sum, item) => {
    const gia = parseFloat(item.giaTien) || 0;
    const qty = item.quantity || 1;
    return sum + gia * qty;
  }, 0);

  const data = {
    ngayLapDon: new Date().toISOString(),
    tongTien: tongTien,
    trangThai: 'Chờ xác nhận',
    taiKhoanNhanVien,
    taiKhoanKhachHang,
    chiTietDonHang: cart.map(item => ({
      maSanPham: item.maSanPham,
      soLuong: item.quantity || 1,
      tongTien: (parseFloat(item.giaTien) || 0) * (item.quantity || 1)
    }))
  };

  try {
    const response = await fetch(`${API_URL}/donhang`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Đơn hàng đã được tạo thành công!');
      localStorage.removeItem('cart');
      updateCart();
      window.location.href = 'index.html'; 
    } else {
      alert('Lỗi khi tạo đơn hàng: ' + result.message);
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    alert('Đã xảy ra lỗi khi kết nối đến server!');
  }
}

// Khởi động khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  updateCart();

  const checkoutBtn = document.getElementById('checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }
});
