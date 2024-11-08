// Function to initialize example graphs
function createExampleGraphs() {
    // Example data for graphs
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data1 = [65, 59, 80, 81, 56, 55];
    const data2 = [28, 48, 40, 19, 86, 27];
    const data3 = [12, 30, 45, 32, 67, 54];

    // Graph 1 - Line Chart
    const ctx1 = document.getElementById('graph1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Voltage Over Time',
                data: data1,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Graph 2 - Bar Chart
    const ctx2 = document.getElementById('graph2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Current Levels',
                data: data2,
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Graph 3 - Pie Chart
    const ctx3 = document.getElementById('graph3').getContext('2d');
    new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Dataset 1',
                data: data3,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });
}

// Initialize the example graphs when the page loads
document.addEventListener('DOMContentLoaded', createExampleGraphs);
