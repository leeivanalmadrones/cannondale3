<?php
// Include the database connection
require_once 'db_connect.php'; // PDO connection to the MySQL database
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../css/admin.css">
</head>
<body>
    <div class="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
            <li><a href="products.php">Manage Products</a></li>
            <li><a href="orders.php">Manage Orders</a></li>
            <li><a href="users.php">Manage Users</a></li>
            <a href="../admin_login.html" class="dropdown-item">Log Out</a>
                   
        </ul>
    </div>

    <div class="content">
        <h1>Welcome to Admin Dashboard</h1>
        <!-- Here you can include the dynamic content like tables or forms based on what is selected -->
    </div>
</body>
</html>
