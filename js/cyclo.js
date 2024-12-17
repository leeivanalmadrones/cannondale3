let products = [
    {
        name: 'Supersix EVO 1',
        image1: './images/ssix.png',
        image2: './images/ssix1.png',
        old_price: '₱260,000.00',
        curr_price: '₱195,000.00 ',
        isOnSale: true,
        rating: 5 
    },
    {
        name: 'Supersix EVO CX',
        image1: './images/cx.webp',
        image2: './images/cxq.jpg',
        curr_price: '₱350,000.00',
        isOnSale: false,
        rating: 4
    }
];

let product_list = document.querySelector('#products');

// Render products dynamically
const renderProducts = (products) => {
    product_list.innerHTML = ''; // Clear existing products
    products.forEach((e) => {
        let saleLabel = e.isOnSale
            ? `<div class="sale-label">Sale</div>` // Add the sale label if the product is on sale
            : '';
        let oldPrice = e.old_price
            ? `<span><del>${e.old_price}</del></span>` // Display old price only if it exists
            : '';

        // Generate star ratings dynamically
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < e.rating) {
                stars += `<i class='bx bxs-star'></i>`; // Filled star
            } else {
                stars += `<i class='bx bx-star'></i>`; // Empty star
            }
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
                            <a href="./product-detail.html" class="btn-flat btn-hover btn-shop-now">shop now</a>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-cart-add'></i>
                            </button>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-heart'></i>
                            </button>
                        </div>
                        <div class="product-card-name">
                            ${e.name}
                        </div>
                        <div class="product-card-price">
                            ${oldPrice}
                            <span class="curr-price">${e.curr_price}</span>
                        </div>
                        <div class="product-card-rating">
                            ${stars}
                        </div>
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
        // Check if product matches the selected filters
        const matchesSale = onSale ? product.isOnSale : true;
        const matchesRating =
            (rating5 && product.rating === 5) ||
            (rating4 && product.rating === 4) ||
            (rating3 && product.rating === 3) ||
            (rating2 && product.rating === 2) ||
            (rating1 && product.rating === 1) ||
            (!rating5 && !rating4 && !rating3 && !rating2 && !rating1); // Show all if no rating is selected
        return matchesSale && matchesRating;
    });

    // Re-render products
    renderProducts(filteredProducts);
};

// Add event listeners to filters
document.querySelectorAll('.filter-list input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', filterProducts);
});
