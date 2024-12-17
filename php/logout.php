<?php
session_start();  // Start the session to access session variables

// Destroy the session and clear session data
session_unset();  // Remove all session variables
session_destroy();  // Destroy the session

// Return a success message or any needed response
echo json_encode(['success' => true]);
?>
