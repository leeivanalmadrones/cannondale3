<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product_id = $_POST['product_id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];

    // Update product in the database
    $stmt = $pdo->prepare("UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE product_id = ?");
    $stmt->execute([$name, $description, $price, $quantity, $product_id]);

    header('Location: products.php'); // Redirect to products list
}

// Fetch the product to edit
$product_id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM products WHERE product_id = ?");
$stmt->execute([$product_id]);
$product_id = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>
    <link rel="stylesheet" href="../css/products.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <h1>Edit Product</h1>
    <form action="edit_product.php" method="POST"  class="edit-product-form">
        <input type="hidden" name="id" value="<?php echo $product_id['product_id']; ?>">

        <label for="name">Product Name</label>
        <input type="text" id="name" name="name" value="<?php echo $product_id['name']; ?>" required><br>

        <label for="description">Description</label>
        <textarea id="description" name="description" required><?php echo $product_id['description']; ?></textarea><br>

        <label for="price">Price</label>
        <input type="number" step="0.01" id="price" name="price" value="<?php echo $product_id['price']; ?>" required><br>


        <button type="submit">Update Product</button>
    </form>
</body>
</html>
