<?php
require_once 'db_connect.php';

// Check if the ID is passed in the URL
if (isset($_GET['id'])) {
    $user_id = $_GET['id'];

    // Fetch the user data
    $stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // If the user doesn't exist, redirect to users page
    if (!$user) {
        header('Location: users.php');
        exit;
    }
} else {
    header('Location: users.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the updated data from the form
    $username = $_POST['username'];
    $email = $_POST['email'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $role = $_POST['role'];

    // Update the user in the database
    $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, address = ?, phone = ?, role = ? WHERE user_id = ?");
    $stmt->execute([$username, $email, $first_name, $last_name, $address, $phone, $role, $user_id]);

    // Redirect to users page after update
    header('Location: users.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
</head>
<body>
    <h1>Edit User</h1>
    <form action="edit_user.php?id=<?php echo $user['user_id']; ?>" method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" value="<?php echo $user['username']; ?>" required><br>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" value="<?php echo $user['email']; ?>" required><br>

        <label for="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name" value="<?php echo $user['first_name']; ?>" required><br>

        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" value="<?php echo $user['last_name']; ?>" required><br>

        <label for="address">Address</label>
        <input type="text" id="address" name="address" value="<?php echo $user['address']; ?>"><br>

        <label for="phone">Phone</label>
        <input type="text" id="phone" name="phone" value="<?php echo $user['phone']; ?>"><br>

        <label for="role">Role</label>
        <select name="role" id="role">
            <option value="admin" <?php echo $user['role'] == 'admin' ? 'selected' : ''; ?>>Admin</option>
            <option value="customer" <?php echo $user['role'] == 'customer' ? 'selected' : ''; ?>>Customer</option>
        </select><br>

        <button type="submit">Update User</button>
    </form>
</body>
</html>
