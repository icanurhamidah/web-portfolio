// Ambil semua elemen yang akan dimanipulasi
const tombolTambah = document.getElementById("tambah");
const tombolSimpan = document.getElementById("simpan");
const tombolBatal = document.getElementById("batal");
const daftarJabatan = document.getElementById("daftar_jabatan");
const formJabatan = document.getElementById("form_jabatan");
const inputJabatan = document.querySelector("#form_jabatan input[type='text']");
const tabelJabatan = document.querySelector("#daftar_jabatan table tbody");

// Fungsi untuk mengubah kelas elemen
function toggleClass(element, kelas1, kelas2) {
  element.classList.remove(kelas1);
  element.classList.add(kelas2);
}

// Event listener untuk tombol tambah
tombolTambah.addEventListener("click", function() {
  toggleClass(daftarJabatan, "d-block", "d-none");
  toggleClass(formJabatan, "d-none", "d-block");
  inputJabatan.value = ""; // Kosongkan input saat membuka form
});

// Event listener untuk tombol simpan
tombolSimpan.addEventListener("click", function(event) {
  event.preventDefault(); // Mencegah submit form default

  // Ambil nilai jabatan dari input
  const jabatanBaru = inputJabatan.value.trim();
  if (jabatanBaru === "") return; // Cegah penambahan jika input kosong

  // Hitung jumlah baris untuk nomor urut dan kode jabatan baru
  const noBaru = tabelJabatan.rows.length + 1;
  const kodeJabatan = `JAB00${noBaru}`;

  // Buat baris baru dan tambahkan ke tabel
  const row = tabelJabatan.insertRow();
  row.innerHTML = `
    <td class="py-5">${noBaru}</td>
    <td class="py-5">${kodeJabatan}</td>
    <td class="py-5">${jabatanBaru}</td>
    <td>
      <button class="btn btn-sm btn-danger" title="Delete">
        <i class="bi bi-trash"></i>
      </button>
    </td>
  `;

  // Pindah kembali ke tampilan daftar jabatan
  toggleClass(formJabatan, "d-block", "d-none");
  toggleClass(daftarJabatan, "d-none", "d-block");

  // Tambahkan event listener hapus untuk tombol delete baru
  const tombolHapus = row.querySelector(".btn-danger");
  tombolHapus.addEventListener("click", function() {
    row.remove();
    updateTableNumbers(); // Update nomor urut setelah penghapusan
  });
});

// Event listener untuk tombol batal
tombolBatal.addEventListener("click", function() {
  toggleClass(formJabatan, "d-block", "d-none");
  toggleClass(daftarJabatan, "d-none", "d-block");
});

// Fungsi untuk memperbarui nomor urut setelah baris dihapus
function updateTableNumbers() {
  const rows = tabelJabatan.rows;
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].textContent = i + 1; // Update nomor urut
    rows[i].cells[1].textContent = `JAB00${i + 1}`; // Update kode jabatan
  }
}

// Event listener untuk semua tombol hapus yang ada
tabelJabatan.addEventListener("click", function(event) {
  if (event.target.closest(".btn-danger")) {
    const rowToDelete = event.target.closest("tr");
    rowToDelete.remove();
    updateTableNumbers();
  }
});
