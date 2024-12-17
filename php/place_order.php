<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json'); // Ensure JSON response


require 'db_connect.php';


    $user_id = $data->user_id;
    $order_status = $data->order_status;
    $total_price = $data->total_price;
    $created_at = $data->created_at;

    // Insert order into the 'orders' table
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, order_status, total_price, created_at) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, $order_status, $total_price, $created_at]);

    // Get the ID of the newly created order
    $order_id = $pdo->lastInsertId();

    // Insert each cart item into the 'cart_items' table
    foreach ($data->cart_items as $item) {
        $product_id = $item->product_id; 
        $quantity = $item->quantity;
        $price = $item->price;

        $stmt = $pdo->prepare("INSERT INTO cart_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
        $stmt->execute([$order_id, $product_id, $quantity, $price]);
    }

    // Return a JSON response with success and order ID
    echo json_encode(['success' => true, 'order_id' => $order_id]);

?>