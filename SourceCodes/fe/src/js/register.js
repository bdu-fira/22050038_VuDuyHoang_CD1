const API_URL = window.config.API_URL
const IMG_URL = window.config.IMG_URL

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Lấy giá trị từ các trường nhập
    const hoTen = document.getElementById('hoTen').value;
    const email = document.getElementById('email').value;
    const soDienThoai = document.getElementById('soDienThoai').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const loaiTaiKhoan = "KHACH_HANG"
  
    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp. Vui lòng kiểm tra lại!');
      return;
    }
  
    // Gọi API đăng ký
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hoTen,
          email,
          soDienThoai,
          matKhau: password,
          loaiTaiKhoan,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Đăng ký thành công, điều hướng tới trang đăng nhập
        alert('Đăng ký thành công!');
        window.location.href = 'login.html';
      } else {
        // Hiển thị lỗi nếu có
        alert(result.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  });
  