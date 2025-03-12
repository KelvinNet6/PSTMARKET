document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("candlestickChart").getContext("2d");

    // Generate Initial Price Data
    function generateLineData() {
        return Array.from({ length: 20 }, () => parseFloat((Math.random() * 50 + 2000).toFixed(2)));
    }

    let priceData = generateLineData();
    let lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: priceData.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: "Price Data",
                    data: priceData,
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: true
                },
                {
                    label: "Trade Points",
                    data: [],
                    borderColor: "red",
                    backgroundColor: "red",
                    borderWidth: 2,
                    pointRadius: 5,
                    showLine: false,
                    parsing: false
                },
                {
                    label: "Trade Lines",
                    data: [],
                    borderColor: "yellow",
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false,
                    stepped: true,
                    parsing: false
                }
            ]
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

    // Function to Update Chart Periodically
    function updateChart() {
        let newData = parseFloat((Math.random() * 50 + 2000).toFixed(2));
        lineChart.data.labels.push(lineChart.data.labels.length + 1);
        lineChart.data.datasets[0].data.push(newData);

        if (lineChart.data.datasets[0].data.length > 50) {
            lineChart.data.labels.shift();
            lineChart.data.datasets[0].data.shift();
        }

        lineChart.update();
    }

    setInterval(updateChart, 5000);

    // Buy & Sell Button Event Listeners
    document.querySelector(".buy-btn").addEventListener("click", function () {
        placeTrade("buy");
    });

    document.querySelector(".sell-btn").addEventListener("click", function () {
        placeTrade("sell");
    });

    // Function to Mark Trades on Chart
    function placeTrade(type) {
        let tradeAmount = parseFloat(document.getElementById("trade-amount").value) || 1;
        let currentPrice = lineChart.data.datasets[0].data[lineChart.data.datasets[0].data.length - 1];
        let tradeIndex = lineChart.data.labels.length - 1;

        // Add Trade Point
        lineChart.data.datasets[1].data.push({ x: tradeIndex, y: currentPrice });

        // Add Trade Line (Extending Forward)
        let futureIndex = tradeIndex + 5;
        if (futureIndex > lineChart.data.labels.length - 1) {
            futureIndex = lineChart.data.labels.length - 1;
        }

        lineChart.data.datasets[2].data.push(
            { x: tradeIndex, y: currentPrice },
            { x: futureIndex, y: currentPrice }
        );

        lineChart.update();
    }

    // Account & Wallet Event Listeners
    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", function () {
            alert("Settings saved successfully!");
        });
    });

    document.querySelector(".connect-wallet")?.addEventListener("click", function () {
        window.location.href = "https://kelvinnet6.github.io/PaySheet/";
    });

    document.querySelector(".change-password")?.addEventListener("click", function () {
        let newPassword = prompt("Enter your new password:");
        if (newPassword) alert("Password changed successfully!");
    });

    document.querySelector(".wallet-btn")?.addEventListener("click", function () {
        window.location.href = "https://kelvinnet6.github.io/PaySheet/";
    });

    document.querySelector(".settings-btn")?.addEventListener("click", function () {
        window.location.href = "AccountManager.html";
    });

});


