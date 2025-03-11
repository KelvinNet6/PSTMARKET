document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("candlestickChart").getContext("2d");

    let candlestickChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
            datasets: [{
                label: "Candlestick Data",
                data: generateRandomData(),
                backgroundColor: "#3b82f6",
                borderColor: "#ffffff",
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                x: {
                    ticks: { color: "white" },
                },
                y: {
                    ticks: { color: "white" },
                },
            },
        },
    });

    function generateRandomData() {
        let data = [];
        for (let i = 0; i < 6; i++) {
            data.push(Math.floor(Math.random() * 1000) + 1000);
        }
        return data;
    }

    setInterval(() => {
        candlestickChart.data.datasets[0].data = generateRandomData();
        candlestickChart.update();
    }, 5000);
});

