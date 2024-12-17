// Add event listeners for product image click to change main image
document.querySelectorAll('.product-img-item').forEach(e => {
    e.addEventListener('click', () => {
        let img = e.querySelector('img').getAttribute('src');
        document.querySelector('#product-img > img').setAttribute('src', img);
    });
});

// Toggle Product Description View
document.querySelector('#view-all-description').addEventListener('click', () => {
    let content = document.querySelector('.product-detail-description-content');
    content.classList.toggle('active');
    document.querySelector('#view-all-description').innerHTML = content.classList.contains('active') ? 'view less' : 'view all';
});


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
    {
        product_id: 7,  // Add unique product ID
        name: 'Habit 3',
        image1: './images/habit.png',
        image2: './images/habit.webp',
        old_price: '₱265,000.00',
        curr_price: '₱198,750.00 ',
        isOnSale: true,
        rating: 5
    },
    {
        product_id: 8,
        name: 'Habit Carbon 1 AXS',
        image1: './images/hcarbon.jpg',
        image2: './images/hcarbon1.jpg',
        curr_price: '₱165,000.00',
        isOnSale: false,
        rating: 4
    },
    {
        product_id: 9,
        name: 'Habit Carbon LT 1',
        image1: './images/lt1.jpg',
        image2: './images/lt.png',
        old_price: '₱145,000.00',
        curr_price: '₱116,000.00 ',
        isOnSale: true,
        rating: 4
    },
    {
        product_id: 10,
        name: 'SHabit HT 1',
        image1: './images/htt.webp',
        image2: './images/htt1.webp',
        old_price: '₱265,000.00',
        curr_price: '₱160,000.00 ',
        isOnSale: true,
        rating: 5
    },
    {
        product_id: 11,
        name: 'Habit LT LTD',
        image1: './images/lt1.jpg',
        image2: './images/lt.png',
        curr_price: '₱365,000.00',
        isOnSale: false,
        rating: 3
    },
    {
        product_id: 12,
        name: 'Scalpel HT Carbon',
        image1: './images/se1.webp',
        image2: './images/se.png',
        curr_price: '₱365,000.00',
        isOnSale: false,
        rating: 5
    },
];

let product_list = document.querySelector('#related-products')

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

}; 

// Initial render
renderProducts(products);

// Filter products based on checkboxes
const filterProducts = () => {
    // Get filter criteria
    const onSale = document.querySelector('#status1').checked;
    const rating5 = document.querySelector('#rating5').checked;
    const rating4 = document.querySelector('#rating4').checked;
    const rating3 = document.querySelector('#rating3').checked;
    const rating2 = document.querySelector('#rating2').checked;
    const rating1 = document.querySelector('#rating1').checked;

    // Filter products
    let filteredProducts = products.filter((product) => {
        const matchesSale = onSale ? product.isOnSale : true;
        const matchesRating =
            (rating5 && product.rating === 5) ||
            (rating4 && product.rating === 4) ||
            (rating3 && product.rating === 3) ||
            (rating2 && product.rating === 2) ||
            (rating1 && product.rating === 1) ||
            (!rating5 && !rating4 && !rating3 && !rating2 && !rating1);
        return matchesSale && matchesRating;
    });

    // Re-render products
    renderProducts(filteredProducts);
};

// Add event listeners to filters
document.querySelectorAll('.filter-list input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', filterProducts);
});


window.onload = function() {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const product_id = urlParams.get('product_id');
    const productName = urlParams.get('name');
    const productImage1 = urlParams.get('image1');
    const productImage2 = urlParams.get('image2');
    const productPrice = urlParams.get('curr_price');
    const productRating = parseInt(urlParams.get('rating'), 10); // Convert to integer

    // Ensure data exists before trying to update the page
    if (productName && productPrice && productImage1 && !isNaN(productRating)) {
        // Update the page with the product details
        document.querySelector('.product-title').innerText = productName;
        document.querySelector('.product-price').innerText = productPrice;
        document.querySelector('#product-image').src = productImage1; // Update the image
        document.querySelector('.product-rating').innerHTML = `<i class='bx bxs-star'></i>`.repeat(productRating); // Repeat stars

        // Add event listener to the "Buy Now" button
        const buyNowButton = document.getElementById('buy-now-btn');
        buyNowButton.addEventListener('click', function() {
            // Store the selected item in sessionStorage
            const selectedItem = {
                product_id: product_id,
                name: productName,
                price: parseFloat(productPrice.replace('₱', '').replace(',', '')), // Convert price to a number
                quantity: 1 // Default quantity for Buy Now is 1
            };
            
            // Save to sessionStorage to keep the cart state consistent
            sessionStorage.setItem('checkoutCart', JSON.stringify([selectedItem]));

            // Redirect to the checkout page
            window.location.href = 'checkout.html';
        });

        // Add event listener to the "Add to Cart" button
        const addToCartButton = document.getElementById('add-to-cart-btn');
        addToCartButton.addEventListener('click', function() {
            addToCart(product_id, productName, productPrice, productImage1);
        });
    } else {
        console.error('Missing or invalid product data in URL parameters');
    }
};

// Function to add product to cart
function addToCart(product_id, name, price, image) {
    // Get current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.product_id === product_id);

    if (existingItem) {
        // If product is already in the cart, update the quantity
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
        // Otherwise, create a new cart item
        const newItem = {
            product_id,
            name,
            price: parseFloat(price.replace('₱', '').replace(',', '')), // Ensure price is a number
            image,
            quantity: 1,
            totalPrice: parseFloat(price.replace('₱', '').replace(',', '')) // Set total price
        };
        cartItems.push(newItem);
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Optionally, you can update the cart icon count or other UI elements here
    alert('Product added to cart!');
}
