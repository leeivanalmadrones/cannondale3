<?php
require_once 'db_connect.php';

// Check if the ID is passed in the URL
if (isset($_GET['id'])) {
    $user_id = $_GET['id'];

    // Delete the user from the database
    $stmt = $pdo->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->execute([$user_id]);

    // Redirect to users page after deletion
    header('Location: users.php');
    exit;
} else {
    // If no ID is provided, redirect to users page
    header('Location: users.php');
    exit;
}
?>
