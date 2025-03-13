document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".logout-btn").addEventListener("click", function () {
        alert("You have been logged out.");
        window.location.href = "index.html";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("candlestickChart").getContext("2d");
    let tradeList = document.getElementById("trade-list");
    let tradePoints = [];

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

    function updateChart() {
        let newData = parseFloat((Math.random() * 50 + 2000).toFixed(2));
        lineChart.data.labels.push(lineChart.data.labels.length + 1);
        lineChart.data.datasets[0].data.push(newData);

        if (lineChart.data.datasets[0].data.length > 50) {
            lineChart.data.labels.shift();
            lineChart.data.datasets[0].data.shift();
        }

        updateProfitLoss();
        lineChart.update();
    }

    setInterval(updateChart, 5000);

    function placeTrade(type) {
        let tradeAmount = parseFloat(document.getElementById("trade-amount").value);
        if (!tradeAmount || tradeAmount <= 0) {
            alert("Please enter a valid trade amount.");
            return;
        }

        let currentPrice = lineChart.data.datasets[0].data[lineChart.data.datasets[0].data.length - 1];
        let tradeIndex = lineChart.data.labels.length - 1;

        tradePoints.push({ type, entryPrice: currentPrice, amount: tradeAmount, index: tradeIndex });

        lineChart.data.datasets[1].data.push({ x: tradeIndex, y: currentPrice });
        lineChart.update();
    }

    function updateProfitLoss() {
        let currentPrice = lineChart.data.datasets[0].data[lineChart.data.datasets[0].data.length - 1];
        let ctx = lineChart.ctx;
        let chartArea = lineChart.chartArea;

        ctx.clearRect(0, 0, chartArea.right, chartArea.bottom);
        tradePoints.forEach(trade => {
            let profitLoss = ((currentPrice - trade.entryPrice) * trade.amount).toFixed(2);
            let color = profitLoss >= 0 ? "green" : "red";
            let text = $${profitLoss};
            drawTradeLabel(trade.index, trade.entryPrice, text, color);
        });
    }

    function drawTradeLabel(x, y, text, color) {
        let ctx = lineChart.ctx;
        let xPos = lineChart.scales.x.getPixelForValue(x);
        let yPos = lineChart.scales.y.getPixelForValue(y);
        ctx.fillStyle = color;
        ctx.font = "12px Arial";
        ctx.fillText(text, xPos, yPos - 10);
    }

    document.querySelector(".buy-btn").addEventListener("click", function () {
        placeTrade("buy");
    });

    document.querySelector(".sell-btn").addEventListener("click", function () {
        placeTrade("sell");
    });
});
    // Account & Wallet Event Listeners
    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", function () {
            alert("Settings saved successfully!");
        });
    });

    document.querySelector(".connect-wallet")?.addEventListener("click", function () {
        window.location.href = "https://kelvinnet6.github.io/PaySheet/";
    });
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("settings-btn")) {
            window.location.href = "AccountManager.html";
        }
    });
    // Opening Market Overview Modal
    const openModalButton = document.getElementById("open-market-overview");
    const modal = document.getElementById("market-overview-modal");
    const closeModalButton = document.getElementById("close-market-overview");

    openModalButton.addEventListener("click", function () {
        modal.classList.add("open"); // Add "open" class to slide the modal in
    });

    closeModalButton.addEventListener("click", function () {
        modal.classList.remove("open"); // Remove "open" class to slide the modal out
    });

    // Event listener for updating pair details and closing the modal
    document.querySelectorAll(".trade-btn").forEach(button => {
        button.addEventListener("click", function () {
            const pair = this.getAttribute("data-pair");
            const price = this.getAttribute("data-price");
            const high = this.getAttribute("data-high");
            const low = this.getAttribute("data-low");
            const liquidity = this.getAttribute("data-liquidity");

            // Update pair details with selected pair's data
            updatePairDetails(pair, price, high, low, liquidity);

            // Close the modal after the trade button is clicked
            modal.classList.remove("open");

            // Trigger chart update with selected pair
            updateChart();
        });
    });
});

document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", function () {
            alert("Settings saved successfully!");
        });
    });
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("change-password")) {
            let newPassword = prompt("Enter your new password:");
            if (newPassword) alert("Password changed successfully!");
        }

        if (event.target.classList.contains("wallet-btn")) {
            window.location.href = "https://kelvinnet6.github.io/PaySheet/";
        }

        if (event.target.classList.contains("connect-wallet")) {
            window.location.href = "https://kelvinnet6.github.io/PaySheet/"; 
        }
    });
});
//open market overview modal
document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById("open-market-overview");
    const modal = document.getElementById("market-overview-modal");
    const closeModalButton = document.getElementById("close-market-overview");

    // Open the modal when "Market Overview" is clicked
    openModalButton.addEventListener("click", function () {
        modal.classList.add("open"); // Add "open" class to slide the modal in
    });

    // Close the modal when the close button is clicked
    closeModalButton.addEventListener("click", function () {
        modal.classList.remove("open"); // Remove "open" class to slide the modal out
    });
})
