document.addEventListener("DOMContentLoaded", function () {
    // Fetch user details from the backend
    fetch('php/profile_data.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            // Populate the profile section with user data
            document.getElementById('name').value = `${data.first_name} ${data.last_name}`;
            document.getElementById('username').value = data.username;
            document.getElementById('email').value = data.email;
            document.getElementById('contact').value = data.phone;
            document.getElementById('address').value = data.address;
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
            alert("Failed to fetch user details. Please try again later.");
        });

         // Logout button functionality
    document.getElementById("logout-button").addEventListener("click", function () {
        // Make an AJAX request to log out the user
        fetch('php/logout.php', {
            method: 'POST'  // Make it a POST request to log out
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect the user to the login page after successful logout
                window.location.href = "login.html";
            } else {
                alert("Logout failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error logging out:", error);
            alert("Error logging out. Please try again.");
        });
});

});

document.addEventListener('DOMContentLoaded', function() {
    // Get the user's purchase data from localStorage
    const userPurchases = JSON.parse(localStorage.getItem('userPurchases') || '[]');
    
    const purchasesList = document.getElementById('purchases-list');
    
    if (userPurchases.length === 0) { 
        purchasesList.innerHTML = '<p>No purchases yet.</p>';
    } else {
        let purchasesHTML = '';

        // Loop through the user's purchases and display them
        userPurchases.forEach(purchase => {
            let purchaseItemsHTML = '';
            purchase.cart_items.forEach(item => {
                const itemTotal = item.price * item.quantity;  // Calculate total price per item

                purchaseItemsHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>₱${itemTotal.toLocaleString()}</td>
                    </tr>
                `;
            });

            purchasesHTML += `
                <div class="purchase-item">
                    <h6>Order ID: ${purchase.created_at}</h6>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${purchaseItemsHTML}
                        </tbody>
                    </table>
                    <p>Total Order Price: ₱${purchase.total_price.toLocaleString()}</p>
                    <p>Shipping: ₱1500.00</p> <!-- Adjust as necessary -->
                    <p>Status: ${purchase.order_status}</p>
                </div>
                <hr>
            `;
        });

        purchasesList.innerHTML = purchasesHTML;
    }
});
