// script.js

// Load cart from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(id, name, price) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Display cart items on the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
    });
}

// Place order and display confirmation
function placeOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    if (name && address) {
        const orderNumber = `ORD-${Math.floor(Math.random() * 100000)}`;
        const order = {
            orderNumber,
            items: cart,
            name,
            address,
            payment: 'Cash on Delivery',
        };

        // Save order details to localStorage
        localStorage.setItem('order', JSON.stringify(order));
        localStorage.removeItem('cart'); // Clear cart after order

        document.getElementById('order-confirmation').innerHTML = `
            <h2>Order Placed Successfully!</h2>
            <p>Order Number: ${orderNumber}</p>
            <p>Payment Method: Cash on Delivery</p>
            <p>Thank you for your purchase, ${name}!</p>
        `;
    } else {
        alert('Please fill out your details.');
    }
}

// Display cart items when the cart page loads
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
