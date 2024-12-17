<?php
session_start();

// Clear all session variables
session_unset();
session_destroy();  // Destroy the session

// Redirect to login page (or admin-login.html if logged in as admin)
header("Location: ../login.html"); 
exit();
?>
