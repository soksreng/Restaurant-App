document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
});

// Displays the items in the shopping cart and calculates the total cost
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    const totalDiv = document.getElementById('total');
    const checkoutButton = document.querySelector('.checkout-button');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        totalDiv.innerText = '';
        checkoutButton.disabled = true;
        return;
    }

    checkoutButton.disabled = false;  //Enable the checkout button if cart is not empty


    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="price">Price: $${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <p class="subtotal">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="remove-button">Remove</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    totalDiv.innerText = `Total: $${total.toFixed(2)}`;
}

// Updates the quantity of a cart item and refreshes the cart display
function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id); // Find the item to update
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to local storage
        loadCartItems(); // Refresh the cart display
    }
}

// Removes an item from the cart and refreshes the cart display
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id); // Remove the item by filtering it out
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Handles the checkout process by clearing the cart and redirecting to the homepage
function checkout() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart'); // Clear the cart from local storage
    window.location.href = 'index.html'; // Redirect to the homepage
} 
