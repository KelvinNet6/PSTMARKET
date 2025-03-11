document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("candlestickChart").getContext("2d");
    
    const candlestickData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
            label: "EUR/USD Price",
            data: [
                { x: "Jan", o: 1.1, h: 1.3, l: 1.0, c: 1.2 },
                { x: "Feb", o: 1.2, h: 1.4, l: 1.1, c: 1.3 },
                { x: "Mar", o: 1.3, h: 1.5, l: 1.2, c: 1.4 },
                { x: "Apr", o: 1.4, h: 1.6, l: 1.3, c: 1.5 },
                { x: "May", o: 1.5, h: 1.7, l: 1.4, c: 1.6 },
                { x: "Jun", o: 1.6, h: 1.8, l: 1.5, c: 1.7 },
                { x: "Jul", o: 1.7, h: 1.9, l: 1.6, c: 1.8 }
            ]
        }]
    };

    new Chart(ctx, {
        type: "candlestick",
        data: candlestickData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    document.querySelector(".buy").addEventListener("click", function () {
        alert("Buy order placed!");
    });

    document.querySelector(".sell").addEventListener("click", function () {
        alert("Sell order placed!");
    });
});
