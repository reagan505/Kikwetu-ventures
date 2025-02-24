/* script.js */
function nextStep(stepId) {
  // Hide all steps
  const steps = document.querySelectorAll('.step');
  steps.forEach(step => step.classList.remove('active'));

  // Show the selected step
  document.getElementById(stepId).classList.add('active');

  // If the new step contains the map, initialize it
  if (stepId === 'step2') {
    initializeMap();
  }
  // If the new step contains the chart, initialize it
  if (stepId === 'step4') {
    initializeChart();
  }
}

// Initialize interactive map using Leaflet
let mapInitialized = false;
function initializeMap() {
  if (mapInitialized) return; // Only initialize once
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('Selected Destination')
    .openPopup();
  mapInitialized = true;
}

// Initialize Chart using Chart.js for data visualization
let chartInitialized = false;
function initializeChart() {
  if (chartInitialized) return;
  const ctx = document.getElementById('itineraryChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Activity 1', 'Activity 2', 'Activity 3'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: ['#007bff', '#28a745', '#ffc107']
      }]
    },
    options: {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
  chartInitialized = true;
}

