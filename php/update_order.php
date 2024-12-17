<?php
require_once 'db_connect.php';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['order_id'], $_POST['order_status'])) {
    $order_id = $_POST['order_id']; // Get the order ID from the hidden input
    $order_status = $_POST['order_status']; // Get the selected order status

    // Validate the status value
    $valid_statuses = ['pending', 'shipped', 'delivered', 'canceled'];
    if (in_array($order_status, $valid_statuses)) {
        // Update the order status in the database
        $stmt = $pdo->prepare("UPDATE orders SET order_status = ? WHERE order_id = ?");
        $stmt->execute([$order_status, $order_id]);
        $_SESSION['order_update_success'] = 'Order updated successfully';

        // Redirect to the orders management page after the update
        header('Location: orders.php');
        exit; // Ensure no further code is executed after the redirect
    } else {
        echo "Invalid order status!";
    }
} else {
    echo "Invalid request!";
}
?>
