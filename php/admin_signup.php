<?php
// admin_signup.php
session_start();
require 'db_connect.php';  // Assuming db.php contains the PDO connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Capture the form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Basic validation
    if ($password != $confirm_password) {
        die("Passwords do not match.");
    }

    // Hash the password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        // Insert into the database
        $sql = "INSERT INTO users (first_name, last_name, email, username, password, role) VALUES (:first_name, :last_name, :email, :username, :password, 'admin')";
        $stmt = $pdo->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password_hash);

        // Execute query
        if ($stmt->execute()) {
            // Redirect to admin login page after successful signup
            header("Location: ../admin_login.html");
        } else {
            echo "Error creating admin account.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
