let items = [];

function handleMenuChoice() {
    const choice = parseInt(document.getElementById('menuChoice').value);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    switch (choice) {
        case 1:
            showAddItemForm();
            break;
        case 2:
            showRemoveItemForm();
            break;
        case 3:
            showTotalBelanja();
            break;
        case 4:
            showStruk();
            break;
        case 5:
            showExitWithoutStruk();
            break;
        default:
            contentDiv.innerHTML = '<p>Pilihan tidak valid. Silakan pilih 1-5.</p>';
    }
}

function showAddItemForm() {
    const form = `
        <h3>Tambah Item</h3>
        <input type="text" id="itemName" placeholder="Nama item">
        <select id="itemCategory">
            <option value="1">Sembako</option>
            <option value="2">Restoran</option>
            <option value="3">Elektronik</option>
            <option value="4">Pakaian</option>
            <option value="5">Kesehatan dan Kecantikan</option>
            <option value="6">Buku dan Alat Tulis</option>
            <option value="7">Bahan Bangunan</option>
            <option value="8">Mainan</option>
        </select>
        <input type="number" id="itemQuantity" placeholder="Jumlah item">
        <input type="number" id="itemPrice" placeholder="Harga per item">
        <button onclick="addItem()">Simpan</button>
    `;
    document.getElementById('content').innerHTML = form;
    document.getElementById('content').innerHTML += '<br><button onclick="backToMenu()">Kembali ke Menu</button>';
}

function addItem() {
    const name = document.getElementById('itemName').value;
    const category = parseInt(document.getElementById('itemCategory').value);
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseInt(document.getElementById('itemPrice').value);

    if (name && category && quantity && price) {
        items.push({ name, category, quantity, price });
        alert('Barang berhasil ditambahkan');
    } else {
        alert('Mohon isi semua field');
    }
}

function showRemoveItemForm() {
    if (items.length === 0) {
        document.getElementById('content').innerHTML = '<p>Tidak ada barang yang bisa dibatalkan.</p>';
    } else {
        const form = `
            <h3>Batalkan Item</h3>
            <input type="text" id="removeItemName" placeholder="Nama item">
            <button onclick="removeItem()">Hapus</button>
        `;
        document.getElementById('content').innerHTML = form;
    }
    document.getElementById('content').innerHTML += '<br><button onclick="backToMenu()">Kembali ke Menu</button>';
}

function removeItem() {
    const name = document.getElementById('removeItemName').value;
    if (name) {
        const index = items.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            items.splice(index, 1);
            alert(`Barang "${name}" berhasil dibatalkan!`);
            showRemoveItemForm(); // Refresh the form
        } else {
            alert('Barang tidak ditemukan');
        }
    } else {
        alert('Mohon masukkan nama barang');
    }
}

function showTotalBelanja() {
    const total = calculateTotal();
    document.getElementById('content').innerHTML = `<h3>Total Belanja Saat ini: ${total}</h3>`;
    document.getElementById('content').innerHTML += '<br><button onclick="backToMenu()">Kembali ke Menu</button>';
}

function showStruk() {
    if (items.length === 0) {
        document.getElementById('content').innerHTML = '<p>Tidak ada barang yang dibeli</p>';
    } else {
        let strukHtml = `
            <h3>Struk Belanja:</h3>
            <table>
                <tr>
                    <th>Nomor</th>
                    <th>Nama item</th>
                    <th>Banyak</th>
                    <th>Harga/Item</th>
                    <th>Total</th>
                    <th>Setelah Diskon</th>
                </tr>
        `;

        items.forEach((item, index) => {
            const total = item.quantity * item.price;
            const discountedTotal = applyDiscount(total, item.category);
            strukHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${total}</td>
                    <td>${discountedTotal}</td>
                </tr>
            `;
        });

        strukHtml += `</table>
            <p>Terima Kasih telah berbelanja disini!</p>
        `;

        document.getElementById('content').innerHTML = strukHtml;
        items = []; // Reset items after showing struk
    }
    document.getElementById('content').innerHTML += '<br><button onclick="backToMenu()">Kembali ke Menu</button>';
}

function showExitWithoutStruk() {
    const total = calculateTotal();
    document.getElementById('content').innerHTML = `
        <h3>Keluar tanpa struk</h3>
        <p>TOTAL: ${total}</p>
    `;
    items = []; // Reset items after exiting
    document.getElementById('content').innerHTML += '<br><button onclick="backToMenu()">Kembali ke Menu</button>';
}

function calculateTotal() {
    return items.reduce((total, item) => {
        const itemTotal = item.quantity * item.price;
        return total + applyDiscount(itemTotal, item.category);
    }, 0);
}

function applyDiscount(total, category) {
    let discounted = total;
    if (category === 1 && total >= 500000) discounted *= 0.85;
    else if (category === 2 && total >= 200000) discounted *= 0.90;
    else if (category === 3 && total >= 2500000) discounted *= 0.95;
    else if (category === 4 && total >= 500000) discounted *= 0.95;
    else if (category === 5 && total >= 150000) discounted *= 0.80;
    else if (category === 6 && total >= 200000) discounted *= 0.85;
    else if (category === 7 && total >= 1000000) discounted *= 0.95;
    else if (category === 8 && total >= 300000) discounted *= 0.90;
    return Math.floor(discounted);
}

function backToMenu() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('menuChoice').value = '';
}