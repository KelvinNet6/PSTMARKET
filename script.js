document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("candlestickChart").getContext("2d");

    let candlestickChart = new Chart(ctx, {
        type: "candlestick",
        data: {
            datasets: [{
                label: "Candlestick Data",
                data: generateCandlestickData(),
                borderColor: "#3b82f6",
                color: {
                    up: "#22c55e",
                    down: "#ef4444",
                    unchanged: "#eab308"
                }
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

    function generateCandlestickData() {
        let data = [];
        let time = Date.now();
        for (let i = 0; i < 20; i++) {
            let open = Math.random() * 50 + 2000;
            let close = open + (Math.random() - 0.5) * 20;
            let high = Math.max(open, close) + Math.random() * 10;
            let low = Math.min(open, close) - Math.random() * 10;
            data.push({ x: time, o: open, h: high, l: low, c: close });
            time += 60000;
        }
        return data;
    }

    function updateChart() {
        let newData = generateCandlestickData();
        candlestickChart.data.datasets[0].data.push(...newData);
        if (candlestickChart.data.datasets[0].data.length > 50) {
            candlestickChart.data.datasets[0].data.splice(0, newData.length);
        }
        candlestickChart.update();
    }

    setInterval(updateChart, 5000);
});

