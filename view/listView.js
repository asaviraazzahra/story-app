export function renderStories(stories) {
  const container = document.getElementById('app');
  const list = document.createElement('div');
  list.innerHTML = '<h2>Daftar Cerita</h2>';

  stories.forEach(story => {
    const item = document.createElement('article');
    item.innerHTML = `
      <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" width="200" />
      <h3>${story.name}</h3>
      <p>${story.description}</p>
      <p><small>${new Date(story.createdAt).toLocaleString()}</small></p>
      <div id="map-${story.id}" class="map" style="height: 200px;"></div>
    `;
    list.appendChild(item);

    setTimeout(() => {
      if (story.lat && story.lon) {
        const map = L.map(`map-${story.id}`).setView([story.lat, story.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([story.lat, story.lon]).addTo(map)
          .bindPopup(`<b>${story.name}</b><br>${story.description}`);
      }
    }, 0);
  });

  container.appendChild(list);
}
const ListView = {
  render(container) {
    container.innerHTML = '<h2>Daftar Cerita</h2><p>Ini adalah halaman utama.</p>';
  },
};

export default ListView;
