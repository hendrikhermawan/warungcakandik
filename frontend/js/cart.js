document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Kosongkan kontainer awal
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        return;
    }

    // Render item di keranjang
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Rp. ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="item-actions">
                <button class="decrement">-</button>
                <span>${item.quantity}</span>
                <button class="increment">+</button>
                <span class="trash">&#128465;</span>
            </div>
        `;

        cartContainer.appendChild(orderItem);

        // Hitung total harga
        totalPrice += item.subTotal;

        // Tambahkan event listener untuk tombol increment
        orderItem.querySelector('.increment').addEventListener('click', () => {
            item.quantity += 1;
            item.subTotal += item.price;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });

        // Tambahkan event listener untuk tombol decrement
        orderItem.querySelector('.decrement').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                item.subTotal -= item.price;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });

        // Hapus item
        orderItem.querySelector('.trash').addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem.name !== item.name);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // Tambahkan total harga
    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = `TOTAL HARGA = Rp. ${totalPrice.toLocaleString('id-ID')}`;
    cartContainer.appendChild(totalElement);

    // Tambahkan tombol "Pesan Sekarang"
    const orderButton = document.createElement('button');
    orderButton.classList.add('order-now');
    orderButton.textContent = 'Pesan Sekarang';
    cartContainer.appendChild(orderButton);

    // Tambahkan event listener untuk mengirim pesanan
    orderButton.addEventListener('click', async () => {
        const tableId = prompt('Masukkan nomor meja:');
        if (!tableId) {
            alert('Nomor meja harus diisi!');
            return;
        }

        try {
            const response = await fetch('/WARUNGCAKANDIK/backend/upload_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table_id: tableId,
                    orders: cart,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Pesanan berhasil disimpan!');
                localStorage.removeItem('cart');
                window.location.href = `/WARUNGCAKANDIK/print.html?table_id=${encodeURIComponent(tableId)}`;
            } else {
                alert(result.error || 'Terjadi kesalahan saat menyimpan pesanan');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('pesanan sedang di proses');
        }
    });
});

// Fungsi untuk merender ulang keranjang
function renderCart() {
    document.dispatchEvent(new Event('DOMContentLoaded'));
}
