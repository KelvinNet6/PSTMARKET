document.addEventListener("DOMContentLoaded", function () {
    // Logout functionality
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }

    // Initialize chart
    let ctx = document.getElementById("candlestickChart");
    if (!ctx) return;
    ctx = ctx.getContext("2d");

    let tradeList = document.getElementById("trade-list");
    let balanceDisplay = document.getElementById("balance");
    let balance = parseFloat(balanceDisplay?.textContent) || 10000;

    function updateBalance(amount) {
        balance += amount;
        if (balanceDisplay) balanceDisplay.textContent = balance.toFixed(2);
    }

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

    function placeTrade(type) {
        let tradeAmountInput = document.getElementById("trade-amount");
        if (!tradeAmountInput) return;
        
        let tradeAmount = parseFloat(tradeAmountInput.value);
        if (!tradeAmount || tradeAmount <= 0) {
            alert("Please enter a valid trade amount.");
            return;
        }

        let currentPrice = lineChart.data.datasets[0].data.at(-1);
        let tradeIndex = lineChart.data.labels.length - 1;

        lineChart.data.datasets[1].data.push({ x: tradeIndex, y: currentPrice });
        let futureIndex = tradeIndex + 5;
        if (futureIndex > lineChart.data.labels.length - 1) {
            futureIndex = lineChart.data.labels.length - 1;
        }

        lineChart.data.datasets[2].data.push(
            { x: tradeIndex, y: currentPrice },
            { x: futureIndex, y: currentPrice }
        );
        lineChart.update();

        let tradeItem = document.createElement("div");
        tradeItem.classList.add("trade-item");
        tradeItem.innerHTML = 
            `<span>${type.toUpperCase()} - $${tradeAmount} @ ${currentPrice}</span>
            <button class="close-trade">Close</button>`;

        tradeItem.querySelector(".close-trade").addEventListener("click", function () {
            tradeItem.remove();
            updateBalance(type === "buy" ? tradeAmount : -tradeAmount);
        });

        tradeList?.appendChild(tradeItem);

        updateBalance(type === "buy" ? -tradeAmount : tradeAmount);
    }

    document.querySelector(".buy-btn")?.addEventListener("click", () => placeTrade("buy"));
    document.querySelector(".sell-btn")?.addEventListener("click", () => placeTrade("sell"));

    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", () => alert("Settings saved successfully!"));
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("change-password")) {
            let newPassword = prompt("Enter your new password:");
            if (newPassword) alert("Password changed successfully!");
        }
        if (event.target.classList.contains("wallet-btn") || event.target.classList.contains("connect-wallet")) {
            window.location.href = "https://kelvinnet6.github.io/PaySheet/";
        }
        if (event.target.classList.contains("settings-btn")) {
            window.location.href = "AccountManager.html";
        }
    });


 const openModalButton = document.getElementById("open-market-overview");
    const modal = document.getElementById("market-overview-modal");
    const closeModalButton = document.getElementById("close-market-overview");

    if (openModalButton && modal && closeModalButton) {
        openModalButton.addEventListener("click", () => modal.classList.add("open"));
        closeModalButton.addEventListener("click", () => modal.classList.remove("open"));

        document.querySelectorAll(".trade-btn").forEach(button => {
            button.addEventListener("click", function () {
                const pair = this.getAttribute("data-pair");
                const price = this.getAttribute("data-price");
                const high = this.getAttribute("data-high");
                const low = this.getAttribute("data-low");
                const liquidity = this.getAttribute("data-liquidity");
                updatePairDetails(pair, price, high, low, liquidity);
                modal.classList.remove("open");
                updateChart();
            });
        });
    }
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
//ecomonic calendar modal
document.addEventListener("DOMContentLoaded", function () {
    const openCalendarBtn = document.getElementById("open-economic-calendar");
    const calendarModal = document.getElementById("economic-calendar-modal");
    const closeCalendarBtn = document.getElementById("close-economic-calendar");

    if (openCalendarBtn && calendarModal && closeCalendarBtn) {
        openCalendarBtn.addEventListener("click", function () {
            calendarModal.classList.add("open");
        });

        closeCalendarBtn.addEventListener("click", function () {
            calendarModal.classList.remove("open");
        });

        // Close modal when clicking outside the content area
        calendarModal.addEventListener("click", function (event) {
            if (event.target === calendarModal) {
                calendarModal.classList.remove("open");
            }
        });
    }
});
//news feed modal
document.addEventListener("DOMContentLoaded", function () {
    const openNewsButton = document.getElementById("open-news-feed");
    const newsModal = document.getElementById("news-feed-modal");
    const closeNewsButton = document.getElementById("close-news-feed");
    const newsContainer = document.querySelector(".news-articles");

    async function fetchForexNews() {
        const apiKey = "000f61be42364a83bd5545c9a39a08d7"; // Replace with your API Key
        const url = `https://newsapi.org/v2/everything?q=forex OR trading OR market&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data.articles.length > 0) {
                newsContainer.innerHTML = ""; // Clear old news

                data.articles.slice(0, 5).forEach(article => {
                    let newsItem = document.createElement("div");
                    newsItem.classList.add("news-item");
                    newsItem.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                        <hr>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = "<p>No recent news found.</p>";
            }
        } catch (error) {
            newsContainer.innerHTML = "<p>Error fetching news.</p>";
            console.error("News Fetch Error:", error);
        }
    }

    if (openNewsButton && newsModal && closeNewsButton) {
        openNewsButton.addEventListener("click", function () {
            newsModal.classList.add("open");
            fetchForexNews(); // Fetch news when modal opens
        });

        closeNewsButton.addEventListener("click", function () {
            newsModal.classList.remove("open");
        });
    }
});
