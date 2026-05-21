document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('context-list');
  const counterPill = document.getElementById('card-counter');

  chrome.storage.local.get(null, (allData) => {
    const entries = Object.entries(allData);
    counterPill.innerText = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`;

    if (entries.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <div style="font-size: 24px; margin-bottom: 8px;">🏝️</div>
          Your memory index is empty. Open a LinkedIn profile to bookmark your first context note!
        </div>`;
      return;
    }

    // Render cards safely to prevent XSS
    entries.forEach(([profileKey, contextText]) => {
      const card = document.createElement('div');
      card.className = 'profile-card';

      const nameEl = document.createElement('div');
      nameEl.className = 'profile-name';
      nameEl.textContent = `@in/${profileKey}`; // Safe: textContent auto-escapes

      const contextEl = document.createElement('div');
      contextEl.className = 'profile-context';
      contextEl.textContent = contextText; // Safe: textContent auto-escapes

      card.appendChild(nameEl);
      card.appendChild(contextEl);
      listContainer.appendChild(card);
    });
  });
});