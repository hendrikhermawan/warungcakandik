<?php
header('Content-Type: application/json');

// Koneksi ke database
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'warungmakan';

$conn = new mysqli($host, $user, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die(json_encode(['error' => 'Koneksi gagal: ' . $conn->connect_error]));
}

// Ambil kategori dari parameter
$category = isset($_GET['category']) ? $_GET['category'] : '';
$allowed_categories = ['Makanan', 'Minuman', 'all'];

// Validasi kategori
if (!in_array($category, $allowed_categories)) {
    die(json_encode(['error' => 'Kategori tidak valid']));
}

// Query SQL
if ($category === 'all') {
    $sql = "SELECT * FROM menu_items";
    $stmt = $conn->prepare($sql);
} else {
    $sql = "SELECT * FROM menu_items WHERE category = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);
}

// Eksekusi query
if ($stmt->execute()) {
    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Query gagal: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
