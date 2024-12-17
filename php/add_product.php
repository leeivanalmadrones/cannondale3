<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];

    // Insert product into database
    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $description, $price, $quantity]);

    header('Location: products.php'); // Redirect to products list
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="../css/products.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <h1>Add Product</h1>
    <form action="add_product.php" method="POST" class="add-product-form">
        <label for="name">Product Name</label>
        <input type="text" id="name" name="name" required><br>
        
        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea><br>
        
        <label for="price">Price</label>
        <input type="number" step="0.01" id="price" name="price" required><br>
        
        
        <button type="submit">Add Product</button>
    </form>
</body>
</html>
