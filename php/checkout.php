<?php
include 'db_connect.php';

session_start();
// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Fetch user details from the database
$stmt = $pdo->prepare("SELECT first_name, last_name, phone, address, email FROM users WHERE user_id = :user_id");
$stmt->bindParam(':user_id', $user_id);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

// If no user found, return an error
if (!$user) {
    echo json_encode(['error' => 'User not found']);
    exit;
}

// Return user details as JSON, including the user_id
echo json_encode([
    'user_id' => $user_id,  // Add user_id to the response
    'first_name' => $user['first_name'],
    'last_name' => $user['last_name'],
    'phone' => $user['phone'],
    'address' => $user['address'],
    'email' => $user['email']
]);
?>
