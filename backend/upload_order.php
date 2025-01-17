<?php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'warungmakan';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['orders']) || !isset($data['table_id'])) {
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

$table_id = $data['table_id'];
$orders = $data['orders'];

$stmt = $conn->prepare("INSERT INTO orders (table_id, order_status, total_price) VALUES (?, 'pending', ?)");
$total_price = array_sum(array_column($orders, 'subTotal'));
$stmt->bind_param("id", $table_id, $total_price);

if ($stmt->execute()) {
    $order_id = $stmt->insert_id;
    $detail_stmt = $conn->prepare("INSERT INTO order_details (order_id, menu_id, quantity, sub_total) VALUES (?, ?, ?, ?)");

    foreach ($orders as $order) {
        $menu_id = $order['menu_id'];
        $quantity = $order['quantity'];
        $sub_total = $order['subTotal'];

        $detail_stmt->bind_param("iiid", $order_id, $menu_id, $quantity, $sub_total);
        $detail_stmt->execute();
    }

    echo json_encode(['success' => true, 'message' => 'Order successfully saved']);
} else {
    echo json_encode(['error' => 'Failed to save order']);
}

$stmt->close();
$conn->close();
