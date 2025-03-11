document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("candlestickChart").getContext("2d");

    let lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: 20 }, (_, i) => i + 1),
            datasets: [{
                label: "Price Data",
                data: generateLineData(),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderWidth: 2,
                pointRadius: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255, 255, 255, 0.1)" }
                },
                y: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255, 255, 255, 0.1)" }
                }
            }
        }
    });

    function generateLineData() {
        return Array.from({ length: 20 }, () => (Math.random() * 50 + 2000).toFixed(2));
    }

    function updateChart() {
        let newData = (Math.random() * 50 + 2000).toFixed(2);
        lineChart.data.labels.push(lineChart.data.labels.length + 1);
        lineChart.data.datasets[0].data.push(newData);
        if (lineChart.data.datasets[0].data.length > 50) {
            lineChart.data.labels.shift();
            lineChart.data.datasets[0].data.shift();
        }
        lineChart.update();
    }

    setInterval(updateChart, 5000);
});
