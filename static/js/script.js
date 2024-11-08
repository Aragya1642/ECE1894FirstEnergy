// Function to fetch data from Flask API
async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
}

// Function to initialize and update the graphs
function createRealTimeGraphs() {
    const labels = []; // Time labels for the X-axis
    const analogValues = [];
    const dcVoltages = [];
    const acVoltages = [];

    // Initialize the graph
    const ctx = document.getElementById('graph1').getContext('2d');
    const voltageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Analog Value',
                    data: analogValues,
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'DC Voltage',
                    data: dcVoltages,
                    borderColor: 'rgb(153, 102, 255)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'AC Voltage',
                    data: acVoltages,
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 2,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage'
                    }
                }
            }
        }
    });

    // Function to update the graph with new data
    async function updateGraph() {
        try {
            const data = await fetchData();

            // Push new data points to arrays
            const timeLabel = new Date().toLocaleTimeString();
            labels.push(timeLabel);
            analogValues.push(data.analog_value);
            dcVoltages.push(data.dc_voltage);
            acVoltages.push(data.ac_voltage);

            // Limit the graph to the last 10 data points
            if (labels.length > 10) {
                labels.shift();
                analogValues.shift();
                dcVoltages.shift();
                acVoltages.shift();
            }

            // Update the chart
            voltageChart.update();
        } catch (error) {
            console.error("Error updating graph:", error);
        }
    }

    // Fetch and update data every 2 seconds
    setInterval(updateGraph, 2000);
}

// Initialize the real-time graphs when the page loads
document.addEventListener('DOMContentLoaded', createRealTimeGraphs);
