window.onload = function() {
    var semuaButton = document.getElementById('semuaButton');
    var buttons = document.querySelectorAll('.category-buttons button');

    // Menambahkan efek hover otomatis pada tombol "SEMUA" saat halaman dimuat
    setTimeout(function() {
        semuaButton.classList.add('hover');
    }, 100);  // Delay 100ms sebelum efek hover dimulai

    // Menambahkan event listener untuk setiap tombol
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Menghapus efek hover dari tombol "SEMUA" jika tombol lain diklik
            if (button !== semuaButton) {
                semuaButton.classList.remove('hover');
            }
        });
    });
};
