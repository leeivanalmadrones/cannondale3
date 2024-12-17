<?php
session_start();

// Check if the user is logged in by verifying session data
if (isset($_SESSION['user_id'])) {
    // Assuming you have a `users` table, fetch user data using the session `user_id`
    $user_id = $_SESSION['user_id'];

    // Create a connection to the database (adjust based on your database settings)
    include('db_connect.php'); // Make sure to replace with your actual database connection file

    $sql = "SELECT * FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);  // Use prepared statements to prevent SQL injection
    $stmt->execute();
    $result = $stmt->get_result();
    $user_data = $result->fetch_assoc();

    // Return the user data as JSON
    if ($user_data) {
        echo json_encode($user_data);
    } else {
        echo json_encode(['error' => 'User not found']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'User not logged in']);
}
?>
