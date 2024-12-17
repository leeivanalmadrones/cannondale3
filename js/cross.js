let products = [
    {
        product_id: 1,  // Add unique product ID
        name: 'Scalpel 1',
        image1: './images/scalp1.png',
        image2: './images/scalp.png',
        old_price: '₱265,000.00', 
        curr_price: '₱198,750.00 ',
        isOnSale: true,
        rating: 5
    },
    {
        product_id: 2,
        name: 'Scalpel 2',
        image1: './images/scalpp.png',
        image2: './images/scalpp1.jpg',
        curr_price: '₱165,000.00',
        isOnSale: false,
        rating: 4
    
    },
    {
        product_id: 3,
        name: 'Scalpel Carbon SE 1',
        image1: './images/se1.webp',
        image2: './images/se.png',
        old_price: '₱145,000.00',
        curr_price: '₱116,000.00 ',
        isOnSale: true,
        rating: 4
    },
    {
        product_id: 4,
        name: 'Scalpel Carbon SE ultimate',
        image1: './images/ulti.webp',
        image2: './images/ulti1.jpg',
        old_price: '₱265,000.00',
        curr_price: '₱160,000.00 ',
        isOnSale: true,
        rating: 5
    },
    {
        product_id: 5,
        name: 'Scalpel Hi-MOD Ultimate',
        image1: './images/mod.png',
        image2: './images/mod1.jpg',
        curr_price: '₱365,000.00',
        isOnSale: false,
        rating: 5
    },
    {
        product_id: 6,
        name: 'Scalpel HT Carbon',
        image1: './images/ht.jpg',
        image2: './images/ht1.png',
        curr_price: '₱365,000.00',
        isOnSale: false,
        rating: 5
    },
];

let product_list = document.querySelector('#products');

// Render products dynamically
const renderProducts = (products) => {
    product_list.innerHTML = ''; // Clear existing products
    products.forEach((e) => {
        let saleLabel = e.isOnSale
            ? `<div class="sale-label">Sale</div>`
            : '';
        let oldPrice = e.old_price
            ? `<span><del>${e.old_price}</del></span>`
            : '';

        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += (i < e.rating)
                ? `<i class='bx bxs-star'></i>` // Filled star
                : `<i class='bx bx-star'></i>`; // Empty star
        }

        let prod = `
            <div class="col-4 col-md-6 col-sm-12">
                 <div class="product-card">
                    ${saleLabel}
                    <div class="product-card-img">
                         <img src="${e.image1}" alt="">
                        <img src="${e.image2}" alt="">
                    </div>
                    <div class="product-card-info">
                        <div class="product-btn">
                            <!-- Dynamic Shop Now Button -->
                            <a href="product-detail.html?product_id=${e.product_id}&name=${encodeURIComponent(e.name)}&image1=${encodeURIComponent(e.image1)}&image2=${encodeURIComponent(e.image2)}&curr_price=${encodeURIComponent(e.curr_price)}&rating=${e.rating}" 
                               class="btn-flat btn-hover btn-shop-now">Shop Now</a>
                            <button class="btn-flat btn-hover btn-cart-add" data-product-id="${e.product_id}" data-product-price="${e.curr_price}">
                                <i class='bx bxs-cart-add'></i>
                            </button>
                        </div>
                        <div class="product-card-name">${e.name}</div>
                        <div class="product-card-price">
                            ${oldPrice}
                            <span class="curr-price">${e.curr_price}</span>
                        </div>
                        <div class="product-card-rating">${stars}</div>
                    </div>
                </div>
            </div>
        `;
        product_list.insertAdjacentHTML('beforeend', prod);
    });

    // Add event listener for "Add to Cart" buttons after rendering products
    document.querySelectorAll('.btn-cart-add').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            let product_id = this.getAttribute('data-product-id');  // Use product_id here
            let productPrice = this.getAttribute('data-product-price');
            let quantity = 1;  // Default to 1 for now (you can add a quantity input if needed)

            // Call the add-to-cart function
            addToCart(product_id, productPrice, quantity);
        });
    });
};

// Call the renderProducts function to render the products dynamically
renderProducts(products);
// Corrected addToCart function
function addToCart(product_id, productPrice, quantity) {
    let cleanPrice = productPrice.replace(/[₱,]/g, ''); // Remove currency symbols and commas
    cleanPrice = parseFloat(cleanPrice); // Ensure price is a number

    console.log('Product ID:', product_id);
    console.log('Product Price:', cleanPrice);
    console.log('Quantity:', quantity); 

    // Get the product details from the products array
    let product = products.find(p => p.product_id == product_id);  // Use product_id here
    if (!product) {
        console.error("Product not found!");
        return;
    }

    // Get cart items from localStorage (or initialize empty array if not found)
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Check if the product already exists in the cart
    let existingItemIndex = cartItems.findIndex(item => item.product_id === product_id);  // Use product_id here

    if (existingItemIndex === -1) {
        // If product is not in cart, add it
        cartItems.push({
            product_id: product_id,  // Use product_id here
            name: product.name,            // Save the name
            image: product.image1,         // Save the image (or image2 if you prefer)
            price: cleanPrice,
            quantity: quantity,
            totalPrice: cleanPrice * quantity
        });
    } else { 
        // If product already in cart, update its quantity and total price
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].totalPrice = cartItems[existingItemIndex].price * cartItems[existingItemIndex].quantity;
    }

    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart icon with the new item count
    updateCartIcon();

    // Optionally send the cart data to the server (for persistence in the database)
    sendCartDataToServer(cartItems);
}


// Function to send cart data to the server (PHP)
function sendCartDataToServer(cartItems) {
    console.log("Sending cart data to server:", cartItems);  // Log data to ensure it's being sent

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/add_to_cart.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Cart data saved to database successfully');
        } else {
            console.error('Error saving cart data to database');
        }
    };

    // Prepare data to send (serialize cartItems as JSON string)
    let cartData = JSON.stringify(cartItems);
    
    // Send cart data to the server
    xhr.send('cartData=' + encodeURIComponent(cartData));
}

 
// Call the renderProducts function to render the products dynamically
renderProducts(products);

// Corrected updateCartIcon function to reflect item count
function updateCartIcon() {
    let cartIcon = document.querySelector('.bx-cart');
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity

    // Update the cart icon count with the total number of items
    if (cartIcon) {
        cartIcon.innerHTML = itemCount;
    }
}



// Add event listeners to filters
document.querySelectorAll('.filter-list input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', filterProducts);
});

function filterProducts() {
    let isOnSale = document.querySelector('#status1').checked;
    let rating = 0;
 
    // Check if rating checkboxes are checked
    if (document.querySelector('#rating5').checked) rating = 5;
    else if (document.querySelector('#rating4').checked) rating = 4;
    else if (document.querySelector('#rating3').checked) rating = 3;
    else if (document.querySelector('#rating2').checked) rating = 2;
    else if (document.querySelector('#rating1').checked) rating = 1;

    // Filter products based on conditions
    let filteredProducts = products.filter(product => {
        return (isOnSale ? product.isOnSale : true) && (rating ? product.rating === rating : true);
    });

    // Render the filtered products
    renderProducts(filteredProducts);
}

document.querySelector('a[href="cart.html"]').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default link behavior
    window.location.href = 'cart.html';  // Redirect to the cart page
});

