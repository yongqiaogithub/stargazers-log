async function loadStars() {
  try {
    const res = await fetch('events.json', {cache: 'no-store'});
    if (!res.ok) throw new Error('Failed to fetch events.json');
    const events = await res.json();
    renderList(events);
  } catch (err) {
    showError(err.message);
  }
}

function renderList(items){
  const ul = document.getElementById('stars');
  if (!ul) return;
  ul.innerHTML = '';
  if (!items || items.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No starred repositories found.';
    ul.appendChild(li);
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');

    const top = document.createElement('div');
    top.className = 'repo-row';

    const a = document.createElement('a');
    a.className = 'repo-name';
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = `${item.owner}/${item.name}`;

    const meta = document.createElement('div');
    meta.className = 'repo-meta';
    meta.textContent = item.starred_at ? new Date(item.starred_at).toLocaleString() : '';

    top.appendChild(a);
    top.appendChild(meta);

    li.appendChild(top);

    if (item.description) {
      const desc = document.createElement('div');
      desc.className = 'repo-desc';
      desc.textContent = item.description;
      li.appendChild(desc);
    }

    ul.appendChild(li);
  });
}

function showError(message){
  const ul = document.getElementById('stars');
  if (!ul) return;
  ul.innerHTML = '';
  const li = document.createElement('li');
  li.className = 'empty';
  li.textContent = `Error: ${message}`;
  ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded', loadStars);
