document.addEventListener("DOMContentLoaded", () => {
  // Create the map and set its initial view
  const map = L.map("map").setView([0, 0], 2); // [latitude, longitude], zoom level

  // Add a tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Custom icon for markers
  const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Replace with your custom icon URL
      iconSize: [30, 30], // Icon size
      iconAnchor: [15, 30], // Point of the icon that corresponds to the marker's location
  });

  // Example: Add markers for destinations
  const destinations = [
      { name: "Safari Adventures", lat: -1.286389, lng: 36.817223 },
      { name: "Beach Escapes", lat: -4.043477, lng: 39.668206 },
      { name: "Mountain Treks", lat: -0.023559, lng: 37.906193 },
  ];

  destinations.forEach(destination => {
      // Create a marker with a custom icon
      const marker = L.marker([destination.lat, destination.lng], { icon: customIcon }).addTo(map);

      // Add a popup to each marker
      marker.bindPopup(`
          <b>${destination.name}</b><br>
          <button onclick="alert('Details for ${destination.name}')">View Details</button>
      `);

      // Zoom to marker on click
      marker.on('click', () => {
          map.setView([destination.lat, destination.lng], 10); // Zoom in on the marker
      });
  });

  // Add a "Reset View" button
  const resetButton = L.control({ position: 'topright' });
  resetButton.onAdd = function () {
      const div = L.DomUtil.create('div', 'reset-view-button');
      div.innerHTML = '<button style="padding: 10px; font-size: 14px;">Reset View</button>';
      div.firstChild.onclick = () => {
          map.setView([0, 0], 2); // Reset to the initial view
      };
      return div;
  };
  resetButton.addTo(map);
});

document.querySelector('.burger').addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
});
