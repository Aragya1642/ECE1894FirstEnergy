var faults = 0;

// Function to fetch data from Flask API
async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
}

async function writeData(labels, acVoltages) {
    try {
        // The data you want to send to Google Sheets
        const payload = {
            time: labels[labels.length - 1], // Most recent timestamp
            acVoltage: acVoltages[acVoltages.length - 1] // Most recent AC voltage
        };

        // Send the data to your backend Flask API
        const response = await fetch('/api/sendData', {
            method: 'POST', // Use POST to send data
            headers: {
                'Content-Type': 'application/json', // Sending JSON data
            },
            body: JSON.stringify(payload), // Convert payload to JSON string
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`Failed to write data: ${response.statusText}`);
        }

        const result = await response.json(); // Assuming Flask returns a JSON response
        console.log('Data successfully written to Google Sheets:', result);
    } catch (error) {
        console.error('Error in writeData:', error);
    }
}

function updateSystemStatus(acVoltage) {
    // Get the system status block and update the content
    const statusText = document.getElementById("status-text");
    const voltageText = document.getElementById("voltage");

    // Perform comparison & update statuses
    statusText.innerHTML = "System Status: Running"; // Example of status
    statusText.style.backgroundColor = "green";  // Normal voltage
    if (acVoltage <= 126 && acVoltage >= 114){
        voltageText.innerHTML = `AC Voltage Status: All Good`; // Display the latest AC Voltage
        voltageText.style.backgroundColor = "green";  // Normal voltage
    } else {
        voltageText.innerHTML = `AC Voltage Status: Out of Range`; // Display the latest AC Voltage
        voltageText.style.backgroundColor = "red";  // Normal voltage
    }
}

function updateHistoricalStatus(acVoltage) {
    const faultsText = document.getElementById("historical-faults");

    if (acVoltage >= 126 || acVoltage <= 114){
        faults += 1;
    }

    faultsText.innerHTML = `Number of Faults Today: ${faults} faults`
}

// Function to initialize and update the graphs
function createRealTimeGraphs() {
    const labels = []; // Time labels for the X-axis
    const acVoltages = [];

    // Initialize AC graph
    const ctxAC = document.getElementById('graph1').getContext('2d');
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

    // TODO: Get the history
    // const history = getHistory();

    // Function to update the graph with new data
    async function updateGraph() {
        try {
            // Fetch the data from server (Arduino)
            const data = await fetchData();
            
            if (data.ac_voltage === "error") {
                throw new Error("Server returned an error response");
            }

            // Push new data points to arrays
            const timeLabel = new Date().toLocaleTimeString();
            labels.push(timeLabel);
            acVoltages.push(data.ac_voltage);
            
            // Update the System Status
            updateSystemStatus(data.ac_voltage);

            // Update the Historical Data
            updateHistoricalStatus(data.ac_voltage);

            // Write the data to google sheets
            await writeData(labels, acVoltages);

            // Update the chart
            acChart.update();
        } catch (error) {
            // Get the system status block and update the content
            const statusText = document.getElementById("status-text");
            
            // Update System Status
            statusText.innerHTML = "System Status: System Down"; // Example of status
            statusText.style.backgroundColor = "red";  // Normal voltage
            
            console.error("Error updating graph:", error);
        }
    }

    // Fetch and update data every 2 seconds
    setInterval(updateGraph, 2000);
}

// Initialize the real-time graphs when the page loads
document.addEventListener('DOMContentLoaded', createRealTimeGraphs);
