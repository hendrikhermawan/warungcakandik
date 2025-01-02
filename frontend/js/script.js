if (window.location.pathname !== '/WARUNGCAKANDIK/frontend/index.html') {
    window.location.href = '/WARUNGCAKANDIK/frontend/index.html';
}

window.onload = function () {
    var semuaButton = document.getElementById('semuaButton');
    var buttons = document.querySelectorAll('.category-buttons button');
    var menuList = document.querySelector('.main-content');

    // Fungsi untuk memuat data menu dari backend
    async function loadMenu(category) {
        try {
            const response = await fetch(`/WARUNGCAKANDIK/backend/get_menu.php?category=${category}`);
            const menuItems = await response.json();

            if (menuItems.error) {
                console.error(menuItems.error);
                menuList.innerHTML = `<p class="error">${menuItems.error}</p>`;
                return;
            }

            menuList.innerHTML = ''; // Bersihkan konten sebelumnya

            menuItems.forEach(item => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}">
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <p class="price">Rp. ${parseInt(item.price).toLocaleString('id-ID')}</p>
                        <p class="rating">Rating: 4.9</p>
                        <button data-id="${item.menu_id}" class="add-to-cart">+</button>
                    </div>
                `;
                menuList.appendChild(productItem);
            });
        } catch (error) {
            console.error('Error loading menu:', error);
            menuList.innerHTML = `<p class="error">Gagal memuat menu. Silakan coba lagi.</p>`;
        }
    }

    // Tambahkan efek hover otomatis pada tombol "SEMUA" saat halaman dimuat
    setTimeout(function () {
        semuaButton.classList.add('hover');
    }, 100); // Delay 100ms sebelum efek hover dimulai

    // Tambahkan event listener untuk setiap tombol
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Hapus efek hover dari tombol "SEMUA" jika tombol lain diklik
            buttons.forEach(btn => btn.classList.remove('hover'));
            button.classList.add('hover');

            // Panggil fungsi loadMenu berdasarkan kategori tombol
            if (button.id === 'semuaButton') {
                loadMenu('all');
            } else if (button.id === 'makananButton') {
                loadMenu('Makanan');
            } else if (button.id === 'minumanButton') {
                loadMenu('Minuman');
            }
        });
    });

    // Muat semua menu saat halaman dimuat
    loadMenu('all');
};
