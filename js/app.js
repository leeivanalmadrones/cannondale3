// Add this script to your cross.html or trail.html to handle the cart button click
document.querySelector('a[href="#"]').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default link behavior
    
    // If the user is logged in, you can redirect to cart.html
    window.location.href = 'cart.html';  // Redirect to the shopping cart page
});


document.querySelectorAll('.dropdown > a').forEach(e => {
    e.addEventListener('click', (event) => event.preventDefault())
})

document.querySelectorAll('.mega-dropdown > a').forEach(e => {
    e.addEventListener('click', (event) => event.preventDefault())
})

document.querySelector('#mb-menu-toggle').addEventListener('click', () => document.querySelector('#header-wrapper').classList.add('active'))

document.querySelector('#mb-menu-close').addEventListener('click', () => document.querySelector('#header-wrapper').classList.remove('active'))

