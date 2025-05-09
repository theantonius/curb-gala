const map = L.map('map').setView([40.7128, -74.0060], 13); // NYC

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById('submit-button').addEventListener('click', () => {
  const file = document.getElementById('image-input').files[0];
  const caption = document.getElementById('caption-input').value;

  if (!file || !caption) {
    alert("Please upload an image and enter a caption.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    map.locate({ setView: true, maxZoom: 16 });
    map.once('locationfound', function(eLoc) {
      const marker = L.marker([eLoc.latitude, eLoc.longitude]).addTo(map);
      const html = `
        <strong>${caption}</strong><br>
        <img src="${reader.result}" width="100" />
      `;
      marker.bindPopup(html).openPopup();
    });
  };
  reader.readAsDataURL(file);
});
