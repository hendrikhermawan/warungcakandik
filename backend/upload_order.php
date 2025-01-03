<?php
header('Content-Type: application/json');

// Konfigurasi koneksi database
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'warungmakan';

$conn = new mysqli($host, $user, $password, $database);

// Periksa koneksi database
if ($conn->connect_error) {
    die(json_encode(['error' => 'Koneksi gagal: ' . $conn->connect_error]));
}

// Ambil data JSON dari permintaan
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

// Debugging: Tampilkan data yang diterima
error_log("Data diterima: $rawData");

// Validasi data input
if (!$data || !isset($data['table_id']) || !isset($data['orders']) || !is_array($data['orders'])) {
    echo json_encode(['error' => 'Data tidak valid']);
    exit;
}

$table_id = $data['table_id'];
$orders = $data['orders'];

// Hitung total harga
$total_price = array_sum(array_column($orders, 'subTotal'));

// Mulai transaksi database
$conn->begin_transaction();

try {
    // Simpan data pesanan ke tabel "orders"
    $stmt = $conn->prepare("INSERT INTO orders (table_id, order_status, total_price) VALUES (?, 'pending', ?)");
    $stmt->bind_param("id", $table_id, $total_price);
    $stmt->execute();

    $order_id = $stmt->insert_id; // Dapatkan ID pesanan yang baru saja disimpan

    // Simpan detail pesanan ke tabel "order_details"
    $detail_stmt = $conn->prepare("INSERT INTO order_details (order_id, menu_id, quantity, sub_total) VALUES (?, ?, ?, ?)");

    foreach ($orders as $order) {
        if (!isset($order['menu_id'], $order['quantity'], $order['subTotal'])) {
            throw new Exception("Format data pesanan tidak valid");
        }

        $menu_id = $order['menu_id'];
        $quantity = $order['quantity'];
        $sub_total = $order['subTotal'];

        $detail_stmt->bind_param("iiid", $order_id, $menu_id, $quantity, $sub_total);
        $detail_stmt->execute();
    }

    // Komit transaksi
    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Pesanan berhasil disimpan']);
} catch (Exception $e) {
    // Batalkan transaksi jika terjadi kesalahan
    $conn->rollback();

    error_log("Error: " . $e->getMessage());
    echo json_encode(['error' => 'Gagal menyimpan pesanan: ' . $e->getMessage()]);
}

// Tutup koneksi
$stmt->close();
if (isset($detail_stmt)) {
    $detail_stmt->close();
}
$conn->close();
?>
