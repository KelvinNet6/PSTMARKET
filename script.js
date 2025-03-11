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
            scales: {
                x: {
                    ticks: { color: "white" }
                },
                y: {
                    ticks: { color: "white" }
                }
            }
        }
    });

    function generateCandlestickData() {
        let data = [];
        let time = Date.now();
        for (let i = 0; i < 10; i++) {
            let open = Math.random() * 100 + 2000;
            let close = open + (Math.random() - 0.5) * 20;
            let high = Math.max(open, close) + Math.random() * 10;
            let low = Math.min(open, close) - Math.random() * 10;
            data.push({ x: time, o: open, h: high, l: low, c: close });
            time += 60000;
        }
        return data;
    }

    setInterval(() => {
        candlestickChart.data.datasets[0].data = generateCandlestickData();
        candlestickChart.update();
    }, 5000);
});
