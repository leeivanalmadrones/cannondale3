<?php
session_start();
require 'db_connect.php'; // Ensure this includes your database connection logic

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Fetch user details from the database
$stmt = $pdo->prepare("SELECT first_name, last_name, username, email, phone, address FROM users WHERE user_id = :user_id");
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode($user); // Return user data as JSON
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
