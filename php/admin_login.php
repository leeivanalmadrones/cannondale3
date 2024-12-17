<?php
// admin-login.php
session_start();
require 'db_connect.php';  

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the input
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // Query the database for the user
        $sql = "SELECT * FROM users WHERE email = :email AND role = 'admin'";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if the user exists and verify the password
        if ($user && password_verify($password, $user['password'])) {
            // Create session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];

            // Redirect to the admin dashboard
            header("Location: admin_1.php");
        } else {
            echo "Invalid credentials.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
