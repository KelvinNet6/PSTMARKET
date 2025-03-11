document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('candlestickChart').getContext('2d');
    const candlestickData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Price',
            data: [
                { x: 'Jan', o: 1.1, h: 1.3, l: 1.0, c: 1.2 },
                { x: 'Feb', o: 1.2, h: 1.4, l: 1.1, c: 1.3 },
                { x: 'Mar', o: 1.3, h: 1.5, l: 1.2, c: 1.4 },
                { x: 'Apr', o: 1.4, h: 1.6, l: 1.3, c: 1.5 },
                { x: 'May', o: 1.5, h: 1.7, l: 1.4, c: 1.6 }
            ]
        }]
    };
    new Chart(ctx, {
        type: 'candlestick',
        data: candlestickData
    });
});
