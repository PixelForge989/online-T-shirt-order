// JavaScript for Online T-Shirt Ordering Website

const products = [
    { id: 1, name: "T-Shirt 1", price: 19.99, category: "tshirts", image: "https://via.placeholder.com/250?text=T-Shirt+1", rating: 4, description: "A comfortable cotton t-shirt." },
    { id: 2, name: "Hoodie 1", price: 29.99, category: "hoodies", image: "https://via.placeholder.com/250?text=Hoodie+1", rating: 5, description: "A warm and cozy hoodie." },
    { id: 3, name: "T-Shirt 2", price: 24.99, category: "tshirts", image: "https://via.placeholder.com/250?text=T-Shirt+2", rating: 4, description: "A stylish t-shirt for everyday wear." },
    { id: 4, name: "Hoodie 2", price: 34.99, category: "hoodies", image: "https://via.placeholder.com/250?text=Hoodie+2", rating: 5, description: "A trendy hoodie with a modern fit." },
];

function registerUser(username, password, name, phone, country, state, email) {
    const userData = { username, password, name, phone, country, state, email };
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle success message
        window.location.href = 'user-info.html'; // Redirect to user info page
    })
    .catch(error => console.error('Error:', error));
}

function loginUser(username, password) {
    // Logic to log in user
    console.log(`User logged in: ${username}`);
}

function placeOrder(orderDetails) {
    // Logic to place an order and save to database
    console.log(`Order placed: ${JSON.stringify(orderDetails)}`);
}

function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Rating: ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProduct(${product.id})">View Details</button>
        `;
        productGrid.appendChild(productDiv);
    });
}

// Add event listener for search functionality
document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayFilteredProducts(filteredProducts);
});

function displayFilteredProducts(filteredProducts) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing products

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Rating: ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProduct(${product.id})">View Details</button>
        `;
        productGrid.appendChild(productDiv);
    });
}

function addToCart() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const quantity = document.getElementById('quantity').value;

    console.log(`Product ${productId} added to cart with Size: ${size}, Color: ${color}, Quantity: ${quantity}.`);
}

function viewProduct(productId) {
    // Redirect to product details page with product ID
    window.location.href = `product-details.html?id=${productId}`;
}

function populateProductDetails() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id == productId);

    if (product) {
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-price').innerText = `Price: $${product.price.toFixed(2)}`;
        document.getElementById('product-rating').innerText = `Rating: ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}`;
        document.getElementById('product-description').innerText = `Description: ${product.description}`;
    } else {
        document.getElementById('product-name').innerText = "Product not found";
    }
}

// Add event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    loginUser(username, password);
});

// Add event listener for registration form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    registerUser(newUsername, newPassword);
});

// Call populateProductDetails on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    populateProductDetails();
});
