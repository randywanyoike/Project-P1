const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const toggleTheme = document.getElementById('toggleTheme');
const template = document.getElementById('trackTemplate');

// Event listeners
searchBtn.addEventListener('click', onSearch);
searchInput.addEventListener('input', onSearch); // Live search
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

async function onSearch() {
  const term = searchInput.value.trim();
  if (!term) return;

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  renderTracks(data.results);
}

function renderTracks(tracks) {
  results.innerHTML = '';
  tracks.forEach(track => {
    const node = template.content.cloneNode(true);
    node.querySelector('.artwork').src = track.artworkUrl100;
    node.querySelector('.title').textContent = track.trackName;
    node.querySelector('.artist').textContent = track.artistName;
    node.querySelector('.preview').src = track.previewUrl;
    results.appendChild(node);
  });
}
