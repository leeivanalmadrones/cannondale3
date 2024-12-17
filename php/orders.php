<?php
require_once 'db_connect.php';

// Fetch orders
$stmt = $pdo->prepare("SELECT * FROM orders");
$stmt->execute();
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Check if the success message is set in the session
if (isset($_SESSION['order_update_success'])) {
    echo "<script>alert('" . $_SESSION['order_update_success'] . "');</script>";
    unset($_SESSION['order_update_success']); // Clear the session variable after showing the alert
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Orders</title>
    <link rel="stylesheet" href="../css/orders.css">
</head>
<body>
    <h1>Manage Orders</h1>
    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total Price</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($orders as $order): ?>
                <tr>
                    <td><?php echo $order['order_id']; ?></td>
                    <td><?php echo $order['user_id']; ?></td>
                    <td><?php echo $order['total_price']; ?></td>
                    <td>
                        <form action="update_order.php" method="POST">
                            <input type="hidden" name="order_id" value="<?php echo $order['order_id']; ?>">
                            <select name="order_status">
                                <option value="pending" <?php echo $order['order_status'] == 'pending' ? 'selected' : ''; ?>>Pending</option>
                                <option value="shipped" <?php echo $order['order_status'] == 'shipped' ? 'selected' : ''; ?>>Shipped</option>
                                <option value="delivered" <?php echo $order['order_status'] == 'delivered' ? 'selected' : ''; ?>>Delivered</option>
                                <option value="canceled" <?php echo $order['order_status'] == 'canceled' ? 'selected' : ''; ?>>Canceled</option>
                            </select>
                            <button type="submit">Update</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
