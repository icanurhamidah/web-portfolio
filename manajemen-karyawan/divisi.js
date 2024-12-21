// Ambil semua elemen yang akan dimanipulasi
const tombolTambah = document.getElementById("tambah");
const tombolSimpan = document.getElementById("simpan");
const tombolBatal = document.getElementById("batal");
const daftarDivisi = document.getElementById("daftar_divisi");
const formDivisi = document.getElementById("form_divisi");
const inputDivisi = document.querySelector("#form_divisi input[type='text']");
const tabelDivisi = document.querySelector("#daftar_divisi table tbody");

// Fungsi untuk mengubah kelas elemen
function toggleClass(element, kelas1, kelas2) {
  element.classList.remove(kelas1);
  element.classList.add(kelas2);
}

// Event listener untuk tombol tambah
tombolTambah.addEventListener("click", function() {
  toggleClass(daftarDivisi, "d-block", "d-none");
  toggleClass(formDivisi, "d-none", "d-block");
  inputDivisi.value = ""; // Kosongkan input saat membuka form
});

// Event listener untuk tombol simpan
tombolSimpan.addEventListener("click", function(event) {
  event.preventDefault(); // Mencegah submit form default

  // Ambil nilai Divisi dari input
  const divisiBaru = inputDivisi.value.trim();
  if (divisiBaru === "") return; // Cegah penambahan jika input kosong

  // Hitung jumlah baris untuk nomor urut dan kode Divisi baru
  const noBaru = tabelDivisi.rows.length + 1;
  const kodeDivisi = `JAB00${noBaru}`;

  // Buat baris baru dan tambahkan ke tabel
  const row = tabelDivisi.insertRow();
  row.innerHTML = `
    <td class="py-5">${noBaru}</td>
    <td class="py-5">${kodeDivisi}</td>
    <td class="py-5">${divisiBaru}</td>
    <td>
      <button class="btn btn-sm btn-danger" title="Delete">
        <i class="bi bi-trash"></i>
      </button>
    </td>
  `;

  // Pindah kembali ke tampilan daftar Divisi
  toggleClass(formDivisi, "d-block", "d-none");
  toggleClass(daftarDivisi, "d-none", "d-block");

  // Tambahkan event listener hapus untuk tombol delete baru
  const tombolHapus = row.querySelector(".btn-danger");
  tombolHapus.addEventListener("click", function() {
    row.remove();
    updateTableNumbers(); // Update nomor urut setelah penghapusan
  });
});

// Event listener untuk tombol batal
tombolBatal.addEventListener("click", function() {
  toggleClass(formDivisi, "d-block", "d-none");
  toggleClass(daftarDivisi, "d-none", "d-block");
});

// Fungsi untuk memperbarui nomor urut setelah baris dihapus
function updateTableNumbers() {
  const rows = tabelDivisi.rows;
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].textContent = i + 1; // Update nomor urut
    rows[i].cells[1].textContent = `JAB00${i + 1}`; // Update kode Divisi
  }
}

// Event listener untuk semua tombol hapus yang ada
tabelDivisi.addEventListener("click", function(event) {
  if (event.target.closest(".btn-danger")) {
    const rowToDelete = event.target.closest("tr");
    rowToDelete.remove();
    updateTableNumbers();
  }
});
