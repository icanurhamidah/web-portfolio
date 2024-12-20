document.addEventListener('DOMContentLoaded', function () {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            datasets: [{
                label: 'Pendapatan',
                data: [120000000, 190000000, 300000000, 500000000, 230000000, 340000000, 290000000, 430000000, 320000000, 410000000, 380000000, 450000000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Jumlah Pesanan',
                data: [120, 150, 200, 300, 180, 220, 190, 250, 210, 240, 220, 280],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }, {
                label: 'Pertumbuhan (%)',
                data: [2.5, 3.8, 4.2, 5.1, 2.8, 3.2, 2.9, 4.1, 3.5, 3.9, 3.6, 4.2],
                type: 'line',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                yAxisID: 'growth'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Pendapatan & Pesanan'
                    }
                },
                growth: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Pertumbuhan (%)'
                    }
                }
            }
        }
    });
});
