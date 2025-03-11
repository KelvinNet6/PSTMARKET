    // Initialize Chart.js for Candlestick Chart
        const ctx = document.getElementById('candlestickChart').getContext('2d');
        const candlestickData = {
            labels: ['2025-03-01', '2025-03-02', '2025-03-03', '2025-03-04', '2025-03-05'],
            datasets: [{
                label: 'EUR/USD',
                data: [
                    { t: new Date('2025-03-01'), o: 1.102, h: 1.108, l: 1.100, c: 1.104 },
                    { t: new Date('2025-03-02'), o: 1.104, h: 1.110, l: 1.101, c: 1.107 },
                    { t: new Date('2025-03-03'), o: 1.107, h: 1.112, l: 1.106, c: 1.111 },
                    { t: new Date('2025-03-04'), o: 1.111, h: 1.115, l: 1.109, c: 1.114 },
                    { t: new Date('2025-03-05'), o: 1.114, h: 1.119, l: 1.113, c: 1.118 },
                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        };

        const candlestickOptions = {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price'
                    }
                }
            }
        };

        const candlestickChart = new Chart(ctx, {
            type: 'candlestick',
            data: candlestickData,
            options: candlestickOptions
        });

        // Handle broker connection
        function connectBroker() {
            alert('Broker Connected!');
        }

        // Execute order (Market or Limit)
        function executeOrder(orderType) {
            const leverage = document.getElementById('leverage').value;
            alert(`Executing ${orderType} order with leverage: ${leverage}`);
            updateTradeHistory(orderType);
        }

        // Update Trade History table
        function updateTradeHistory(orderType) {
            const table = document.getElementById('tradeHistoryTable');
            const newRow = table.insertRow();
            const orderTypeCell = newRow.insertCell(0);
            const profitLossCell = newRow.insertCell(1);
            orderTypeCell.textContent = orderType.charAt(0).toUpperCase() + orderType.slice(1);
            profitLossCell.textContent = orderType === 'market' ? '+100 USD' : '-50 USD'; // Just for demo
        }
