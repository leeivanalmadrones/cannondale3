<?php
include 'db_connect.php';  // Adjust the path to your database connection if needed

header('Content-Type: application/json');  // Ensure response is JSON

// Get the search query from the GET request
$search_query = isset($_GET['search_query']) ? '%' . $_GET['search_query'] . '%' : '%';

try {
    // Prepare the SQL query to search for products by name (case-insensitive)
    $query = "SELECT product_id, name, price, image FROM products WHERE name LIKE :search_query LIMIT 10";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':search_query', $search_query, PDO::PARAM_STR);
    $stmt->execute();

    // Fetch matching products
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the results as JSON
    echo json_encode($products);

} catch (Exception $e) {
    // Return error message as JSON if something goes wrong
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
?>
