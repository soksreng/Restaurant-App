// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Updates the cart count displayed on the page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate the total quantity of items in the cart
    document.getElementById('cart-count').innerText = cartCount; // Update the cart count display on the webpage
}
