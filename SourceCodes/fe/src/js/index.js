const API_URL = window.config.API_URL
const IMG_URL = window.config.IMG_URL
document.addEventListener("DOMContentLoaded", async () => {
    await renderCategoryOptions(); // Render dropdown loại sản phẩm
    await renderProductList();     // Hiển thị toàn bộ sản phẩm mặc định
  
    // Gắn sự kiện filter
    document.getElementById("categoryFilter").addEventListener("change", applyFilters);
    document.getElementById("searchInput").addEventListener("input", applyFilters);
  
    // Cập nhật số lượng giỏ hàng khi trang được tải
    updateCartCount();
  });
  
  async function renderCategoryOptions() {
    const select = document.getElementById("categoryFilter");
    try {
      const res = await fetch(`${API_URL}/loai-san-pham`); // Dùng API_URL
      const categories = await res.json();
  
      categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat.maLoaiSanPham;
        opt.textContent = cat.tenLoaiSanPham;
        select.appendChild(opt);
      });
    } catch (error) {
      console.error("Không thể tải loại sản phẩm:", error);
    }
  }
  
  async function applyFilters() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  
    // Gọi lại renderProductList với các filter đã chọn
    await renderProductList(selectedCategory, keyword);
  }
  
  export async function renderProductList(filterCategory = "all", keyword = "") {
    const productListElement = document.querySelector(".product-list");
    if (!productListElement) return;
  
    // Làm mới danh sách sản phẩm trước khi thêm mới
    productListElement.innerHTML = "";
  
    try {
      const response = await fetch(`${API_URL}/san-pham`); // Dùng API_URL
      const products = await response.json();
  
      // Lọc sản phẩm dựa trên category và từ khóa tìm kiếm
      const filtered = products.filter((product) => {
        const matchCategory =
          filterCategory === "all" || product.maLoaiSanPham == filterCategory;
        const matchKeyword = product.tenSanPham.toLowerCase().includes(keyword);
        return matchCategory && matchKeyword;
      });
  
      if (filtered.length === 0) {
        productListElement.innerHTML = "<p>Không có sản phẩm phù hợp.</p>";
        return;
      }
  
      filtered.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("product-item");
  
        item.innerHTML = `
          <img src="${IMG_URL + product.anhSanPham}" alt="${product.tenSanPham}" />
          <h3>${product.tenSanPham}</h3>
          <p><strong>Loại:</strong> ${product.loai?.tenLoaiSanPham || "Không rõ"}</p>
          <p><strong>Kích thước:</strong> ${product.kichThuoc}</p>
          <p><strong>Màu sắc:</strong> ${product.mauSac}</p>
          <p><strong>Mô tả:</strong> ${product.moTa}</p>
          <p><strong>Giá:</strong> ${Number(product.giaTien).toLocaleString()} VNĐ</p>
          <div class="product-actions" style="display: flex; gap: 10px; align-items: center; margin-top: 8px;">
              <button class="decrease-qty" style="width: 24px;">-</button>
              <span class="quantity-display">1</span>
              <button class="increase-qty" style="width: 24px;">+</button>
              <button class="add-to-cart">Thêm vào giỏ hàng</button>
          </div>
        `;
  
        const decreaseBtn = item.querySelector(".decrease-qty");
        const increaseBtn = item.querySelector(".increase-qty");
        const quantityDisplay = item.querySelector(".quantity-display");
        const addToCartBtn = item.querySelector(".add-to-cart");
  
        let quantity = 1;
  
        increaseBtn.addEventListener("click", () => {
          quantity++;
          quantityDisplay.textContent = quantity;
        });
  
        decreaseBtn.addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
          }
        });
  
        addToCartBtn.addEventListener("click", () => {
          addToCart(product, quantity);
        });
  
        productListElement.appendChild(item);
      });
  
      updateCartCount(); // Cập nhật giỏ hàng sau khi render sản phẩm
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      productListElement.innerHTML = "<p>Không thể tải sản phẩm.</p>";
    }
  }
  
  
  // Thêm sản phẩm vào giỏ hàng
  function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Kiểm tra nếu sản phẩm đã có thì cộng thêm số lượng
    const existing = cart.find((item) => item.maSanPham === product.maSanPham);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Cập nhật giỏ hàng sau khi thêm sản phẩm
    alert(`Đã thêm ${quantity} x ${product.tenSanPham} vào giỏ hàng!`);
  }
  
  // Cập nhật tổng số lượng sản phẩm ở header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Tổng số lượng sản phẩm
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity; // Hiển thị tổng số lượng
  }
}

  