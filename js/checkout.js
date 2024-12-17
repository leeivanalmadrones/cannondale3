document.addEventListener('DOMContentLoaded', function() {
    // Get the selected items from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem('checkoutCart') || '[]');
    cartItems.forEach(item => {
        console.log(item.product_id);  // Check if product_id is available
    });
    
    // If no items in the cart, show a message
    if (cartItems.length === 0) {
        document.querySelector('#checkout-cart tbody').innerHTML = '<tr><td colspan="3">No items.</td></tr>';
        document.querySelector('#sshipping').textContent = '₱0.00';
        document.querySelector('#stotal').textContent = '₱0.00';
        return;
    } 

    let cartHTML = '';
    let subtotal = 0;

    // Loop through selected cart items to populate the table and calculate subtotal
    cartItems.forEach(item => {
        const itemPrice = parseFloat(item.price) || 0; // Ensure price is a valid number
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <tr> 
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₱${itemTotal.toLocaleString()}</td>
            </tr>
        `;
    });

    // Update the cart table with selected items
    document.querySelector('#checkout-cart tbody').innerHTML = cartHTML;

    // Calculate total pricing (Shipping and Total)
    const shipping = 1500;  // You can modify this value or calculate based on cart
    const total = subtotal + shipping;

    document.querySelector('#sshipping').textContent = `₱${shipping.toLocaleString()}`;
    document.querySelector('#stotal').textContent = `₱${total.toLocaleString()}`;
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch user details on page load
    fetch('php/checkout.php')  // This is where you call the PHP endpoint
        .then(response => response.json())
        .then(data => {
            // Check if user data is available
            if (data.error) {
                alert(data.error);
                window.location.href = 'login.html';  // Redirect to login page if not logged in
                return;
            }

            // Populate the checkout form with user data
            document.getElementById('name').value = `${data.first_name} ${data.last_name}`;
            document.getElementById('email').value = data.email;
            document.getElementById('contact').value = data.phone;
            document.getElementById('address').value = data.address;

            // Now set the user_id dynamically from the fetched data
            const userId = data.user_id; // This is now available from the response

            // Proceed with the order submission when the user clicks "Place order"
            document.getElementById("submit-order").addEventListener("click", function() {
                // Get the form data
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const contact = document.getElementById("contact").value; 
                const address = document.getElementById("address").value;

                // Fetch cart items from sessionStorage
                const cartItems = JSON.parse(sessionStorage.getItem('checkoutCart') || '[]');
                const totalPrice = parseFloat(document.querySelector('#stotal').textContent.replace('₱', '').replace(',', ''));

                // Prepare the order data with the dynamically fetched user_id
                const orderData = {
                    user_id: userId, // Use the dynamically fetched user_id
                    order_status: 'Pending',
                    total_price: totalPrice,
                    created_at: new Date().toISOString(),
                    cart_items: cartItems,
                    name: name,
                    email: email,
                    contact: contact,
                    address: address
                };

                // Save the order to localStorage (or in a database in a real scenario)
                let userPurchases = JSON.parse(localStorage.getItem('userPurchases') || '[]');
                userPurchases.push(orderData);
                localStorage.setItem('userPurchases', JSON.stringify(userPurchases));

                // Send the order data via AJAX
                fetch('php/place_order.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => response.json())  // Ensure you parse the JSON response
                .then(data => {
                    if (data.success) {
                        // Order placed successfully
                        alert('Order placed successfully!');
                        window.location.href = 'index.html';  // Redirect to index.html
                    } else {
                        alert('Failed to place order. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Failed to place order. Please try again.', error);
                    alert('Failed to place order. Please try again.');
                    window.location.href = 'index.html';  // Redirect to index.html on error
                });
            });
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
});