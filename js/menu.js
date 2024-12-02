const menuItems = [
    { 
        id: 1, 
        name: 'Bruschetta', 
        price: 8.99, 
        category: 'appetizers', 
        image: "./images/Bruschetta.jpg", 
        description: 'Grilled bread with tomato and basil.' 
    },
    { 
        id: 2, 
        name: 'Caesar Salad', 
        price: 10.99, 
        category: 'appetizers', 
        image: './images/Caesar-Salad.jpg', 
        description: 'Crisp romaine lettuce with Caesar dressing.' 
    },
    { 
        id: 3, 
        name: 'Grilled Salmon', 
        price: 22.99, 
        category: 'mains', 
        image: './images/grilled-salmon.jpg', 
        description: 'Fresh salmon with a lemon butter sauce.' 
    },
    { 
        id: 4, 
        name: 'Ribeye Steak', 
        price: 29.99, 
        category: 'mains', 
        image: './images/Ribeye-steak.jpg', 
        description: 'Juicy ribeye grilled to perfection.' 
    },
    { 
        id: 5, 
        name: 'Cheesecake', 
        price: 7.99, 
        category: 'desserts', 
        image: './images/cheesecake.jpg', 
        description: 'Creamy cheesecake with berry compote.' 
    },
    { 
        id: 6, 
        name: 'Chocolate Lava Cake', 
        price: 8.99, 
        category: 'desserts', 
        image: './images/Chocolate-Lava-Cake.jpg',
        description: 'Warm chocolate cake with molten center.' 
    },
    { 
        id: 7, 
        name: 'Red Wine', 
        price: 9.99, 
        category: 'drinks', 
        image: './images/red-wine.jpg', 
        description: 'Glass of our finest red wine.' 
    },
    { 
        id: 8, 
        name: 'Cocktail', 
        price: 11.99, 
        category: 'drinks', 
        image: './images/cocktail.jpg', 
        description: 'Signature house cocktail.' 
    }
];
// Runs once the webpage is fully loaded and sets up the menu display and cart count
document.addEventListener('DOMContentLoaded', () => {
    displayMenu(menuItems); // Display all items by default
    updateCartCount();
    setupFilter(); // Attach filter event
});

function setupFilter() {
    const filterDropdown = document.getElementById('category'); // Ensure dropdown has this ID
    filterDropdown.addEventListener('change', filterMenu);
}

function filterMenu() {
    const selectedCategory = document.getElementById('category').value; // Get the selected value
    const filteredItems = selectedCategory === 'all'
        ? menuItems // Show all items if "all" is selected
        : menuItems.filter(item => item.category === selectedCategory.toLowerCase()); // Match category
    displayMenu(filteredItems); // Redisplay menu with filtered items
}

function displayMenu(items) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart state
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = ''; // Clear previous items
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        // Check if the item is already in the cart
        const cartItem = cart.find(cartItem => cartItem.id === item.id);

        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>$${item.price.toFixed(2)}</strong></p>
            <div id="action-${item.id}">
                ${
                    cartItem
                        ? `<div class="quantity-control">
                               <button onclick="updateMenuQuantity(${item.id}, -1)">-</button>
                               <span>${cartItem.quantity}</span>
                               <button onclick="updateMenuQuantity(${item.id}, 1)">+</button>
                           </div>
                           <p>Added</p>`
                        : `<button onclick="addToCart(${item.id})">Add to Cart</button>`
                }
            </div>
        `;
        menuDiv.appendChild(menuItem);
    });
}


function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = menuItems.find(item => item.id === id); // Find the item to add
    const existingItem = cart.find(cartItem => cartItem.id === id); // Check if already in cart

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 }); // Add new item with quantity 1
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
    updateCartCount();

    // Change the Add to Cart button to quantity controls
    const actionDiv = document.getElementById(`action-${id}`);
    actionDiv.innerHTML = `
        <div class="quantity-control">
            <button onclick="updateMenuQuantity(${id}, -1)">-</button>
            <span>${existingItem ? existingItem.quantity : 1}</span>
            <button onclick="updateMenuQuantity(${id}, 1)">+</button>
        </div>
        <p>Added</p>
    `;
}

// Updates the quantity of a menu item in the cart
function updateMenuQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(cartItem => cartItem.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            // Remove the item if quantity goes to 0
            cart = cart.filter(cartItem => cartItem.id !== id);
            const actionDiv = document.getElementById(`action-${id}`);
            actionDiv.innerHTML = `<button onclick="addToCart(${id})">Add to Cart</button>`;
        } else {
            const quantitySpan = document.querySelector(`#action-${id} span`);
            quantitySpan.innerText = item.quantity;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
// Updates the cart count displayed in the header or on the page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    document.getElementById('cart-count').innerText = cartCount;
}
