<?php
require_once 'db_connect.php';

// Fetch users from the database
$stmt = $pdo->prepare("SELECT * FROM users");
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users</title>
    <link rel="stylesheet" href="../css/users.css">
</head>
<body>
    <h1>Manage Users</h1>
    <table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td><?php echo $user['user_id']; ?></td>
                    <td><?php echo $user['username']; ?></td>
                    <td><?php echo $user['email']; ?></td>
                    <td><?php echo ucfirst($user['role']); ?></td>
                    <td>
                        <!-- Edit User -->
                        <a href="edit_user.php?id=<?php echo $user['user_id']; ?>">Edit</a> | 
                        <!-- Delete User -->
                        <a href="delete_user.php?id=<?php echo $user['user_id']; ?>" onclick="return confirm('Are you sure you want to delete this user?');">Delete</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
