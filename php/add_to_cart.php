<?php
// Assuming you are using MySQL with PDO for database interactions
session_start();

// Include your database connection (replace with your actual connection details)
include 'db_connect.php';

// Check if cartData is received
if (isset($_POST['cartData'])) {
    $cartData = json_decode($_POST['cartData'], true);

    // Example: Assuming you have a cart_items table with the following columns:
    // - product_id
    // - quantity
    // - price
    // - user_id (you can associate cart data with the user if needed)
    
    // Get user ID from session or set a temporary user ID for guest users
    $userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 1; // Example: default to 1 if no user is logged in

    try {
        $conn->beginTransaction();

        // Loop through cart items and insert them into the database
        foreach ($cartData as $item) {
            // Check if product already exists in cart for this user (update if exists, otherwise insert new)
            $stmt = $conn->prepare("SELECT * FROM cart_items WHERE user_id = :user_id AND product_id = :product_id");
            $stmt->execute(['user_id' => $userId, 'product_id' => $item['productId']]);
            $existingItem = $stmt->fetch();
 
            if ($existingItem) {
                // Update quantity if the item already exists
                $newQuantity = $existingItem['quantity'] + $item['quantity'];
                $stmt = $conn->prepare("UPDATE cart_items SET quantity = :quantity WHERE user_id = :user_id AND product_id = :product_id");
                $stmt->execute(['quantity' => $newQuantity, 'user_id' => $userId, 'product_id' => $item['productId']]);
            } else {
                // Insert new item if it doesn't exist in the cart
                $stmt = $conn->prepare("INSERT INTO cart_items (user_id, product_id, quantity, price) VALUES (:user_id, :product_id, :quantity, :price)");
                $stmt->execute([
                    'user_id' => $userId,
                    'product_id' => $item['productId'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }
        }

        // Commit the transaction
        $conn->commit();
        
        echo "Cart data saved successfully!";
    } catch (Exception $e) {
        // Rollback if something goes wrong
        $conn->rollBack();
        echo "Error: " . $e->getMessage();
    }
}
?>
