// Function to fetch data from Flask API
async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
}

async function getHistory() {
    const response = await fetch('/api/history');
    const data = await response.json();
    return data;
}

// Function to initialize and update the graphs
function createRealTimeGraphs() {
    const labels = []; // Time labels for the X-axis
    const analogValues = [];
    const dcVoltages = [];
    const acVoltages = [];

    // Initialize Analog Graph
    const ctxAnalog = document.getElementById('graph1').getContext('2d');
    const voltageChart = new Chart(ctxAnalog, {
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
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'white',
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white', // X-axis labels color
                    }
                }
            }
        }
    });

    // Initialize DC graph
    const ctxDC = document.getElementById('graph2').getContext('2d');
    const dcChart = new Chart(ctxDC, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'DC Value',
                    data: dcVoltages,
                    borderColor: 'rgb(255, 165, 0)',
                    borderWidth: 2,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'white',
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white', // X-axis labels color
                    }
                }
            }
        }
    });

    // Initialize AC graph
    const ctxAC = document.getElementById('graph3').getContext('2d');
    const acChart = new Chart(ctxAC, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'AC Value',
                    data: acVoltages,
                    borderColor: 'rgb(255, 0, 0)',
                    borderWidth: 2,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'white',
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white', // X-axis labels color
                    }
                }
            }
        }
    });

    // Get the history
    // const history = getHistory();

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
            // if (labels.length > 10) {
            //     labels.shift();
            //     analogValues.shift();
            //     dcVoltages.shift();
            //     acVoltages.shift();
            // }

            // Update the chart
            voltageChart.update();
            dcChart.update();
            acChart.update();
        } catch (error) {
            console.error("Error updating graph:", error);
        }
    }

    // Fetch and update data every 2 seconds
    setInterval(updateGraph, 2000);
}

// Initialize the real-time graphs when the page loads
document.addEventListener('DOMContentLoaded', createRealTimeGraphs);
