// Ambil semua elemen yang akan dimanipulasi
const tombolTambah = document.getElementById("tambah");
const tombolSimpan = document.getElementById("simpan");
const tombolBatal = document.getElementById("batal");
const daftarKaryawan = document.getElementById("daftar_karyawan");
const formKaryawan = document.getElementById("form_karyawan");
const tabelKaryawan = document.querySelector("#daftar_karyawan tbody");

// Fungsi untuk mengubah kelas elemen
function toggleClass(element, kelas1, kelas2) {
  element.classList.remove(kelas1);
  element.classList.add(kelas2);
}

// Event listener untuk tombol tambah
tombolTambah.addEventListener("click", function() {
  toggleClass(daftarKaryawan, "d-block", "d-none");
  toggleClass(formKaryawan, "d-none", "d-block");
});

// Event listener untuk tombol simpan
tombolSimpan.addEventListener("click", function(event) {
  event.preventDefault(); // Mencegah submit form

  // Ambil nilai dari form input
  const namaLengkap = formKaryawan.querySelector("input[type='text']").value;
  const email = formKaryawan.querySelector("input[type='email']").value;
  const alamat = formKaryawan.querySelector("textarea").value;
  const jabatan = document.getElementById("jabatan-select").value;

  // Buat baris tabel baru
  const row = tabelKaryawan.insertRow();

  // Tambahkan sel dan isi dengan data dari form
  row.innerHTML = `
    <tr>
      <td class="py-5">${tabelKaryawan.rows.length}</td>
      <td class="py-5">K00${tabelKaryawan.rows.length}</td>
      <td class="py-5">${namaLengkap}</td>
      <td class="py-5">${email}</td>
      <td class="py-5">${alamat}</td>
      <td class="py-5">${jabatan}</td>
      <td>
        <button class="btn btn-sm btn-danger" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `;

  // Reset form setelah data ditambahkan
  formKaryawan.querySelector("form").reset();

  // Kembali ke tampilan daftar karyawan
  toggleClass(formKaryawan, "d-block", "d-none");
  toggleClass(daftarKaryawan, "d-none", "d-block");
});

// Event listener untuk tombol batal
tombolBatal.addEventListener("click", function() {
  toggleClass(formKaryawan, "d-block", "d-none");
  toggleClass(daftarKaryawan, "d-none", "d-block");
});

// Event listener untuk tombol hapus pada tabel
tabelKaryawan.addEventListener("click", function(event) {
    if (event.target.closest(".btn-danger")) {
      // Cari baris yang harus dihapus
      const rowToDelete = event.target.closest("tr");
      rowToDelete.remove();
  
      // Update nomor urut setelah penghapusan
      updateTableNumbers();
    }
  });
  
  // Fungsi untuk memperbarui nomor urut setelah baris dihapus
  function updateTableNumbers() {
    const rows = tabelKaryawan.rows;
    for (let i = 0; i < rows.length; i++) {
      rows[i].cells[0].textContent = i + 1; // Update nomor urut
      rows[i].cells[1].textContent = `K00${i + 1}`; // Update kode karyawan
    }
  }
  