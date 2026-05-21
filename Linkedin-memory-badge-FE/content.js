let currentUrlPath = window.location.pathname;
let structuralCheckTimer = setInterval(verifyLayoutPresence, 1000);

const navigationObserver = new MutationObserver(() => {
  if (window.location.pathname !== currentUrlPath) {
    currentUrlPath = window.location.pathname;
    clearInterval(structuralCheckTimer);
    structuralCheckTimer = setInterval(verifyLayoutPresence, 1000);
  }
});
navigationObserver.observe(document.body, { childList: true, subtree: true });

function verifyLayoutPresence() {
  if (!window.location.pathname.includes('/in/')) return;
  const pageLoaded = document.querySelector('main') || document.body;
  if (pageLoaded) {
    clearInterval(structuralCheckTimer);
    processMemoryBadge();
  }
}

function processMemoryBadge() {
  if (document.querySelector('.memory-extension-container')) return;

  const profileKey = window.location.pathname.split('/in/')[1]?.replace(/\/$/, "");
  if (!profileKey) return;

  chrome.storage.local.get([profileKey], (data) => {
    if (data[profileKey]) {
      renderSavedContext(data[profileKey]);
    } else {
      renderRegisterPrompt(profileKey);
    }
  });
}

function renderSavedContext(textContent) {
  const badgeElement = document.createElement('div');
  badgeElement.className = 'memory-extension-container';
  
  // Custom design accent styling for saved contextual displays
  badgeElement.style.borderLeft = '4px solid #10b981'; // Thin emerald slate line

  badgeElement.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #ecfdf5; border-radius: 8px; padding: 6px; display: flex; align-items: center; justify-content: center; color: #10b981; font-size: 14px; font-weight: bold;">🔑</div>
      <div style="flex: 1;">
        <h4 class="memory-title" style="color: #065f46;">Recognized Profile</h4>
        <p class="memory-display-text" style="color: #047857; margin: 4px 0 0 0;">${textContent}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(badgeElement);
  
  // Trigger transition animation frame paint
  requestAnimationFrame(() => badgeElement.classList.add('active'));

  setTimeout(() => {
    badgeElement.classList.remove('active');
    setTimeout(() => badgeElement.remove(), 400);
  }, 10000);
}

function renderRegisterPrompt(keyIdentifier) {
  const promptElement = document.createElement('div');
  promptElement.className = 'memory-extension-container';
  
  let countdown = 5;
  promptElement.innerHTML = `
    <div class="memory-title">Remember this profile? <span id="timer-count" style="color: #6b7280; font-weight: 400; font-size: 12px; margin-left: 4px;">(${countdown}s)</span></div>
    <div class="memory-actions-wrapper">
      <button id="mem-btn-no" class="memory-btn memory-btn-no">Ignore</button>
      <button id="mem-btn-yes" class="memory-btn memory-btn-yes">Add Note</button>
    </div>
  `;
  
  document.body.appendChild(promptElement);
  requestAnimationFrame(() => promptElement.classList.add('active'));

  const trackingTimer = setInterval(() => {
    countdown--;
    const displaySpan = promptElement.querySelector('#timer-count');
    if (displaySpan) displaySpan.innerText = `(${countdown}s)`;

    if (countdown <= 0) {
      clearInterval(trackingTimer);
      promptElement.classList.remove('active');
      setTimeout(() => promptElement.remove(), 400);
    }
  }, 1000);

  promptElement.querySelector('#mem-btn-no').addEventListener('click', () => {
    clearInterval(trackingTimer);
    promptElement.classList.remove('active');
    setTimeout(() => promptElement.remove(), 400);
  });

  promptElement.querySelector('#mem-btn-yes').addEventListener('click', () => {
    clearInterval(trackingTimer);
    
    promptElement.innerHTML = `
      <div class="memory-title">What context do you want to save?</div>
      <input type="text" id="context-input" class="memory-input-box" placeholder="e.g., Met at Chennai meetup, builds in React..." />
      <div class="memory-actions-wrapper">
        <button id="mem-btn-save" class="memory-btn memory-btn-yes" style="width: 100%;">Save Context</button>
      </div>
    `;

    const dynamicInput = promptElement.querySelector('#context-input');
    dynamicInput.focus();

    promptElement.querySelector('#mem-btn-save').addEventListener('click', () => {
      const stringVal = dynamicInput.value.trim();
      if (!stringVal) return;

      chrome.storage.local.set({ [keyIdentifier]: stringVal }, () => {
        promptElement.innerHTML = `
          <div style="text-align: center; padding: 8px 0; color: #10b981; font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>✨ Saved successfully</span>
          </div>
        `;
        setTimeout(() => {
          promptElement.classList.remove('active');
          setTimeout(() => promptElement.remove(), 400);
        }, 1200);
      });
    });
  });
}
