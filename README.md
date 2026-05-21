# LinkedIn Memory Badge 🧠

A premium, privacy-first browser extension designed to instantly remember how you connect to professionals on LinkedIn. Perfect for developers, job hunters, and recruiters who manage dozens of networking threads, DMs, and follow-ups.

Instead of jumping back and forth between LinkedIn and separate note-taking apps to find out why you bookmarked someone, this extension securely injects your custom memory notes directly into the profile view.

---

## 🚀 How to Install (Takes 30 Seconds)

Because this extension runs entirely locally, you can load it into Google Chrome in just a few quick steps:

1. **Download the Code:**
   * Click the green **Code** button at the top of this repository and select **Download ZIP**.
   * Extract the downloaded `.zip` file anywhere on your computer.

2. **Open Chrome Extensions Panel:**
   * Open a new tab in Google Chrome and navigate to: `chrome://extensions/`

3. **Enable Developer Mode:**
   * Toggle the **Developer mode** switch in the upper-right corner of the extensions page to **ON**.

4. **Load the Project Folder:**
   * Click the **Load unpacked** button in the top-left corner.
   * Open the extracted repository folder (`linkedin-memory-badge-main`).
   * Select the **`fe`** folder inside it and click **Open/Select**. *(Note: You must select the `fe` folder specifically, as it contains the root configuration files like `manifest.json`).*

---

## 🛠️ How It Works

* **New Profiles:** When visiting a profile for the first time, a minimal floating card slides into the top right corner asking if you want to log a memory context. Clicking "Add Note" stops the countdown and opens a clean input layout.
* **Recognized Profiles:** If you return to a profile you've previously bookmarked, your personal context (e.g., *"Met at Chennai meetup, follow up next Tuesday for referral"*) automatically slides into view for 10 seconds before elegantly fading out.
* **Central Dashboard:** Click the extension icon in your Chrome toolbar at any time to open a dedicated list summary displaying every entry you've logged in your memory database.

---

## 🛡️ Privacy by Design

No third-party tracking, no external servers, and zero data telemetry. All your job hunt logs, notes, and profile handles are saved completely client-side using Chrome's native `chrome.storage.local` API directly onto your machine's local hard drive. Closing Chrome, putting your laptop to sleep, or performing hard cache refreshes will never wipe your offline data.
