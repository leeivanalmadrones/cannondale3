<?php
include 'db_connect.php';  // Adjust the path to your database connection if needed


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// Fetch product details based on product_id
$product_id = $_GET['product_id'];
$query = "SELECT * FROM products WHERE product_id = :product_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':product_id', $product_id);
$stmt->execute();

$product = $stmt->fetch(PDO::FETCH_ASSOC);

// Return product details as JSON
header('Content-Type: application/json');
echo json_encode($product);
?>
