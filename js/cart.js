document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    // Get cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Loop through cart items and display them
    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item" data-product-id="${item.product_id}">
                <input type="checkbox" class="select-item-checkbox" data-product-id="${item.product_id}" id="checkbox-${item.product_id}" />
                <label for="checkbox-${item.product_id}"></label> <!-- Custom label for the checkbox -->
                <img src="${item.image || './images/default-image.png'}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₱${formatPrice(item.price)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₱${formatPrice(item.totalPrice)}</p>
                     <!-- Remove button -->
                <button class="remove-item-btn" data-product-id="${item.product_id}">Remove</button>
            </div>
        </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;  // Get the product_id from the button's data attribute
            removeCartItem(productId);  // Call removeCartItem with the product_id
        });
    });    

    // Attach event listeners for checkboxes to update cart summary
    document.querySelectorAll('.select-item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateCartSummary);
    });
    
    
});

function removeCartItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems = cartItems.filter(item => item.product_id !== productId);  // Filter out the item to remove

    // Save updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Re-render the cart to show updated items
    renderCartItems();

    // Update the cart icon count
    updateCartIcon();
}



// Function to format price
function formatPrice(price) {
    // Check if price is a valid number
    if (price && !isNaN(price)) {
        return price.toLocaleString();
    } else {
        console.error('Invalid price:', price);
        return '0.00'; // Default value if price is invalid
    }
}


// Function to re-render cart items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Loop through cart items and display them again
    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item" data-product-id="${item.product_id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₱${formatPrice(item.price)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₱${formatPrice(item.totalPrice)}</p>
                    <!-- Remove button -->
                    <button class="remove-item-btn" data-product-id="${item.product_id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;  // Get the product_id from the button's data attribute
            removeCartItem(productId);  // Call removeCartItem with the product_id
        });
    });
        
}

// Function to update cart icon (item count)
function updateCartIcon() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let cartIcon = document.querySelector('.cart-icon');  // Assuming your cart icon has class .cart-icon

    // Get total item count from cart
    let totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart icon
    if (cartIcon) {
        cartIcon.textContent = totalItems;
    }
}

function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const selectedItems = [];
    let subtotal = 0;
    let shipping = 1500;  // Fixed shipping cost

    // Loop through each cart item and calculate subtotal based on selected items
    cartItems.forEach(item => {
        const checkbox = document.querySelector(`.select-item-checkbox[data-product-id="${item.product_id}"]`);
        if (checkbox && checkbox.checked) {
            selectedItems.push(item);  // Add to selected items if checked
            subtotal += item.totalPrice;  // Add to subtotal if selected
        }
    });

    // Calculate the total (subtotal + shipping)
    const total = subtotal + shipping;

    // Update the summary content
    const itemsSummary = `
        <p>Items: ${selectedItems.length}</p>
        <p>Shipping: ₱${shipping}</p>
        <p>Total: ₱${total.toLocaleString()}</p>
    `;
    
    // Update the cart summary UI
    const summaryContainer = document.querySelector('.cart-summary');
    if (summaryContainer) {
        const itemsSummaryContainer = summaryContainer.querySelector('.items-summary');
        if (itemsSummaryContainer) {
            itemsSummaryContainer.innerHTML = itemsSummary;  // Update only the summary part
        } else {
            // If .items-summary doesn't exist, log an error
            console.error("No .items-summary element found in .cart-summary.");
        }
    } else {
        // If .cart-summary doesn't exist, log an error
        console.error("No .cart-summary element found.");
    }

    // Always keep the checkout button enabled
    const checkoutButton = document.querySelector('#checkout-btn');
    if (checkoutButton) {
        checkoutButton.disabled = false;  // Ensure it's always enabled
    }
}

// When the document is ready
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.querySelector('#checkout-btn');

    // Add event listener to checkout button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Get all cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            
            // Filter selected items (checked checkboxes)
            const selectedItems = cartItems.filter(item => {
                const checkbox = document.querySelector(`.select-item-checkbox[data-product-id="${item.product_id}"]`);
                return checkbox && checkbox.checked; // Only include checked items
            });

            // Optionally, store selected cart data for checkout
            sessionStorage.setItem('checkoutCart', JSON.stringify(selectedItems));  // Storing selected items

            // Redirect to the checkout page
            window.location.href = 'checkout.html';
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();

    // Event delegation for Add/Minus buttons
    document.querySelector('.cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-plus')) {
            const productId = event.target.dataset.productId;
            updateCartQuantity(productId, 1); // Increase quantity by 1
        } else if (event.target.classList.contains('quantity-minus')) {
            const productId = event.target.dataset.productId;
            updateCartQuantity(productId, -1); // Decrease quantity by 1
        }
    });
});

// Function to update quantity
function updateCartQuantity(productId, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemIndex = cartItems.findIndex(item => item.product_id === productId);

    if (itemIndex !== -1) {
        // Update quantity and recalculate total price
        cartItems[itemIndex].quantity += change;

        // Ensure quantity does not go below 1
        if (cartItems[itemIndex].quantity < 1) {
            cartItems[itemIndex].quantity = 1;
        }

        cartItems[itemIndex].totalPrice = cartItems[itemIndex].price * cartItems[itemIndex].quantity;

        // Save updated cart back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Re-render the cart items and summary
        renderCartItems();
        updateCartSummary();
    }
}

// Reuse existing renderCartItems and updateCartSummary functions
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item" data-product-id="${item.product_id}">
                <img src="${item.image || './images/default-image.png'}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₱${formatPrice(item.price)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-minus" data-product-id="${item.product_id}">-</button>
                        <span class="quantity-value" id="quantity-${item.product_id}">${item.quantity}</span>
                        <button class="quantity-plus" data-product-id="${item.product_id}">+</button>
                    </div>
                    <p>Total: ₱${formatPrice(item.totalPrice)}</p>
                    <button class="remove-item-btn" data-product-id="${item.product_id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Reattach remove item functionality
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            removeCartItem(productId);
        });
    });
}

// Utility function for formatting price
function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();

    // Event delegation for Add/Minus buttons
    document.querySelector('.cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-plus')) {
            const productId = event.target.dataset.productId;
            updateCartQuantity(productId, 1); // Increase quantity by 1
        } else if (event.target.classList.contains('quantity-minus')) {
            const productId = event.target.dataset.productId;
            updateCartQuantity(productId, -1); // Decrease quantity by 1
        }
    });

    // Attach event listeners for checkboxes to update the summary
    document.querySelectorAll('.select-item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateCartSummary); // Update summary on checkbox state change
    });
});

// Function to update cart summary
function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const selectedItems = {};
    let subtotal = 0;
    const shipping = 1500; // Fixed shipping cost

    // Loop through cart items and calculate subtotal based on selected items
    cartItems.forEach(item => {
        const checkbox = document.querySelector(`.select-item-checkbox[data-product-id="${item.product_id}"]`);
        if (checkbox && checkbox.checked) {
            selectedItems[item.product_id] = true; // Mark as selected
            subtotal += item.totalPrice; // Add totalPrice if checkbox is selected
        }
    });

    // Save selected items to sessionStorage
    sessionStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));

    // Calculate total (subtotal + shipping)
    const total = subtotal + (subtotal > 0 ? shipping : 0); // Add shipping only if subtotal > 0

    // Update the summary content
    const summaryContainer = document.querySelector('.cart-summary .items-summary');
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <p>Items: ${Object.keys(selectedItems).length}</p>
            <p>Shipping: ₱${subtotal > 0 ? shipping : 0}</p>
            <p>Total: ₱${total.toLocaleString()}</p>
        `;
    } else {
        console.error("No .items-summary element found in .cart-summary.");
    }
}

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const selectedItems = JSON.parse(sessionStorage.getItem('selectedCartItems') || '{}');

    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const isChecked = selectedItems[item.product_id] ? 'checked' : ''; // Check the state from sessionStorage

        const cartItemHTML = `
            <div class="cart-item" data-product-id="${item.product_id}">
                <input type="checkbox" class="select-item-checkbox" data-product-id="${item.product_id}" id="checkbox-${item.product_id}" ${isChecked} />
                <label for="checkbox-${item.product_id}"></label> <!-- Custom label for the checkbox -->
                <img src="${item.image || './images/default-image.png'}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₱${formatPrice(item.price)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-minus" data-product-id="${item.product_id}">-</button>
                        <span class="quantity-value" id="quantity-${item.product_id}">${item.quantity}</span>
                        <button class="quantity-plus" data-product-id="${item.product_id}">+</button>
                    </div>
                    <p>Total: ₱${formatPrice(item.totalPrice)}</p>
                    <button class="remove-item-btn" data-product-id="${item.product_id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Attach event listeners for checkboxes and remove buttons
    document.querySelectorAll('.select-item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateCartSummary);
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            removeCartItem(productId);
        });
    });

    // Ensure the summary is updated after rendering
    updateCartSummary();
}

// Function to update item quantity
function updateCartQuantity(productId, change) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemIndex = cartItems.findIndex(item => item.product_id === productId);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += change;

        // Ensure quantity does not go below 1
        if (cartItems[itemIndex].quantity < 1) {
            cartItems[itemIndex].quantity = 1;
        }

        // Recalculate the total price
        cartItems[itemIndex].totalPrice = cartItems[itemIndex].price * cartItems[itemIndex].quantity;

        // Save updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Re-render the cart and update the summary
        renderCartItems();
    }
}

// Utility function to format price
function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
