import { initMap, addMarker } from '../view/mapView.js';
import { addStory } from '../model/storyModel.js';

export function renderAddForm(onSubmit) {
    const container = document.getElementById('app');
    container.innerHTML = `
    <h2>Tambah Cerita</h2>
    <form id="storyForm">
      <label for="description">Deskripsi:</label>
      <input type="text" id="description" name="description" required><br>

      <label for="photo">Foto:</label>
      <video id="camera" autoplay width="200"></video>
      <button type="button" id="takePhoto">Ambil Foto</button>
      <canvas id="canvas" width="200" height="150" style="display:none;"></canvas>

      <label for="map">Klik lokasi cerita di peta:</label>
      <div id="map" style="height: 200px;"></div>

      <input type="hidden" id="lat" name="lat">
      <input type="hidden" id="lon" name="lon">

      <button type="submit">Kirim</button>
    </form>
  `;

    let lat = null,
        lon = null;
    const map = initMap('map', -6.2, 106.8, (e) => {
        lat = e.latlng.lat;
        lon = e.latlng.lng;
        document.getElementById('lat').value = lat;
        document.getElementById('lon').value = lon;
        addMarker(map, lat, lon);
    });

    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => (video.srcObject = stream));

    document.getElementById('takePhoto').onclick = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
    };

    document.getElementById('storyForm').onsubmit = (e) => {
        e.preventDefault();
        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('description', document.getElementById('description').value);
            formData.append('photo', blob, 'photo.png');
            formData.append('lat', lat);
            formData.append('lon', lon);
            onSubmit(formData);
        });
    };
}

const AddStoryView = {
    render(container) {
        renderAddForm(async (formData) => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token not found. Please login again.');
                return;
            }

            try {
                const response = await addStory(token, formData);

                if (response.message) {
                    alert('Story berhasil ditambahkan!');
                    window.location.hash = '#/';
                } else {
                    alert('Story gagal ditambahkan!');
                }
            } catch (error) {
                alert('Error saat menambahkan story. Coba lagi.');
            }
        });
    },
};

export default AddStoryView;
