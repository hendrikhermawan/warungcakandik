document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.container');
    const totalElement = document.querySelector('.total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cartContainer.innerHTML = ''; // Kosongkan kontainer

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

        // Tambahkan event listener untuk tombol increment dan decrement
        orderItem.querySelector('.increment').addEventListener('click', () => {
            item.quantity += 1;
            item.subTotal += item.price;
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // Refresh halaman
        });

        orderItem.querySelector('.decrement').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                item.subTotal -= item.price;
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload(); // Refresh halaman
            }
        });

        // Hapus item
        orderItem.querySelector('.trash').addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem.name !== item.name);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // Refresh halaman
        });
    });

    // Tampilkan total harga
    totalElement.textContent = `TOTAL HARGA = Rp. ${totalPrice.toLocaleString('id-ID')}`;
});
