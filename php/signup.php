<?php
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = filter_var($_POST['first_name'], FILTER_SANITIZE_STRING);
    $lastName = filter_var($_POST['last_name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $address = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $username = !empty($_POST['username']) ? filter_var($_POST['username'], FILTER_SANITIZE_STRING) : null;
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    // Validate password match
    if ($password !== $confirmPassword) {
        echo "<script>
                alert('Passwords do not match.');
                window.history.back();
              </script>";
        exit;
    }

    // Validate password strength
    if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/', $password)) {
        echo "<script>
                alert('Password must be at least 8 characters long and include both letters and numbers.');
                window.history.back();
              </script>";
        exit;
    }

    // Check if email is unique
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch()) {
        echo "<script>
                alert('This email is already registered. Please log in.');
                window.location.href = '../login.html';
              </script>";
        exit;
    }

    // Insert new user into the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (first_name, last_name, email, address, phone, username, password) 
                           VALUES (:first_name, :last_name, :email, :address, :phone, :username, :password)');
    $stmt->execute([
        'first_name' => $firstName,
        'last_name' => $lastName, 
        'email' => $email,
        'address' => $address,
        'phone' => $phone,
        'username' => $username,
        'password' => $hashedPassword
    ]);

    if ($stmt->rowCount()) {
        echo "<script>
                alert('Account created successfully! Redirecting to login...');
                window.location.href = '../login.html';
              </script>";
    } else {
        echo "<script>
                alert('Error creating account. Please try again.');
                window.history.back();
              </script>";
    }
}
?>
