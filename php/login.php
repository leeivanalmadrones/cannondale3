<?php
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    if (!empty($email) && !empty($password)) {
        // Check if the user exists
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Start the session
            session_start();  // Start the session
            
            // Store user ID and other details in the session
            $_SESSION['user_id'] = $user['user_id'];  // Store the user ID
            $_SESSION['first_name'] = $user['first_name'];  // Optional, store name for convenience
            $_SESSION['email'] = $user['email'];  // Optional, store email
            
            // Redirect the user to the homepage or dashboard
            echo "<script>
                    window.location.href = '../index.html';  // Or any other page
                  </script>";
        } else {
            echo "<script>
                    alert('Invalid credentials. Please try again.');
                    window.history.back();
                  </script>";
        }
    } else {
        echo "<script>
                alert('Please provide both email and password.');
                window.history.back();
              </script>";
    }
}

?>
