<?php
require_once 'db_connect.php';

// Fetch products
$stmt = $pdo->prepare("SELECT * FROM products");
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Products</title>
    <link rel="stylesheet" href="../css/products.css">
</head>
<body>
    <h1>Manage Products</h1>
 <div class="add-product">
    <a href="add_product.php">Add New Product</a>
</div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($products as $product): ?>
                <tr>
                    <td><?php echo $product['product_id']; ?></td>
                    <td><?php echo $product['name']; ?></td>
                    <td><?php echo $product['description']; ?></td>
                    <td><?php echo $product['price']; ?></td>
                    <td>
                <div class="action-buttons">
                    <a href="edit_product.php?id=<?php echo $product['product_id']; ?>" class="edit-link">Edit</a>
                    <a href="delete_product.php?id=<?php echo $product['product_id']; ?>" class="delete-link">Delete</a>
                </div>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
