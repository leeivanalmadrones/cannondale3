
<?php
require_once 'db_connect.php';

if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

    // Delete product from the database
    $stmt = $pdo->prepare("DELETE FROM products WHERE product_id = ?");
    $stmt->execute([$product_id]);

    header('Location: products.php'); // Redirect to products list
}
?>
