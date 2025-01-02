window.onload = function() {
    var semuaButton = document.getElementById('semuaButton');
    // Tambahkan efek hover ke tombol "SEMUA"
    setTimeout(function() {
        semuaButton.classList.add('hover');
        // Untuk menghilangkan efek hover setelah beberapa detik (opsional)
        setTimeout(function() {
            semuaButton.classList.remove('hover');
        }, 500); // Waktu berapa lama efek hover akan berlangsung
    }, 100); // Waktu delay sebelum efek hover dimulai
};
