<?php
$host = 'localhost';
$dbname = 'u143688490_cannondale_db';
$username = 'u143688490_cannondale';
$password = 'Cannondale54321';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}
?>
