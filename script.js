let cart = [];

// Show Product Modal
function showModal(name, price, image, description) {
  document.getElementById("modalProductName").innerText = name;
  document.getElementById("modalProductPrice").innerText = `฿${price}`;
  document.getElementById("modalProductImage").src = image;
  document.getElementById("modalProductDescription").innerText = description;

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

function addToCart() {
  const name = document.getElementById("modalProductName").innerText;
  const price = parseFloat(
    document.getElementById("modalProductPrice").innerText.replace("฿", "")
  );
  const image = document.getElementById("modalProductImage").src;
  const quantity = parseInt(document.getElementById("productQuantity").value);

  // ตรวจสอบว่า `localStorage` มีสินค้าอยู่หรือไม่
  let storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  // ตรวจสอบว่าสินค้านี้มีอยู่แล้วหรือไม่
  const existingProductIndex = storedCart.findIndex(
    (item) => item.name === name
  );

  if (existingProductIndex !== -1) {
    // ถ้ามีสินค้าอยู่แล้ว เพิ่มจำนวนสินค้า
    storedCart[existingProductIndex].quantity += quantity;
  } else {
    // ถ้าไม่มีสินค้า ให้เพิ่มรายการใหม่
    const product = { name, price, image, quantity };
    storedCart.push(product);
  }

  // บันทึกข้อมูลกลับเข้า `localStorage`
  localStorage.setItem("cart", JSON.stringify(storedCart));

  cart = storedCart; // อัปเดตอาร์เรย์ `cart`
  updateCartCount(); // อัปเดตตัวนับสินค้า
  showToast(); // แสดงข้อความแจ้งเตือน
}

function increaseQuantity() {
  const quantityInput = document.getElementById("productQuantity");
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
  const quantityInput = document.getElementById("productQuantity");
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

function updateCartCount() {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = storedCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = totalQuantity; // อัปเดตจำนวนสินค้าในตะกร้า
  cartCount.style.display = totalQuantity > 0 ? "inline" : "none"; // ซ่อนถ้าไม่มีสินค้า
}

// Show Toast
function showToast() {
  const toast = new bootstrap.Toast(document.getElementById("toast"));
  toast.show();
}
