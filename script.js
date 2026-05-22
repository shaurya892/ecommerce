const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    price: 899,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500'
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProducts() {
  const productList = document.getElementById('product-list');

  if (!productList) return;

  productList.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">

      <div class="card-content">
        <h3>${product.name}</h3>

        <p class="price">₹${product.price}</p>

        <button class="add-btn" onclick="addToCart(${product.id})">
          Add To Cart
        </button>
      </div>
    </div>
  `).join('');

  updateCartCount();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  cart.push(product);

  saveCart();

  updateCartCount();

  alert(product.name + ' added to cart');

  console.log('AddToCart Event Fired');
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');

  if(cartCount) {
    cartCount.innerText = cart.length;
  }
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if(!cartItems) return;

  let total = 0;

  cartItems.innerHTML = '';

  cart.forEach(item => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
      </div>
    `;
  });

  cartTotal.innerText = total;
}

function placeOrder() {

  if(cart.length === 0) {
    alert('Cart is empty');
    return;
  }

  const orderId = 'ORD' + Math.floor(Math.random() * 1000000);

  localStorage.setItem('latestOrderId', orderId);

  console.log('Purchase Event Fired');

  cart = [];

  saveCart();

  window.location.href = 'thankyou.html';
}

function loadThankYouPage() {
  const orderIdText = document.getElementById('order-id');

  if(orderIdText) {
    const latestOrderId = localStorage.getItem('latestOrderId');
    orderIdText.innerText = 'Order ID: ' + latestOrderId;
  }
}

renderProducts();
renderCart();
updateCartCount();
loadThankYouPage();
