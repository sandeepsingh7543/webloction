# 🌐 Visitor Tracking Website

A professional website that automatically tracks visitor data (location, IP, device, browser) and stores it in Google Sheets — completely free, no server needed.

---

## 📁 Folder Structure

```
web site/
├── index.html              ← Main webpage
├── style.css               ← Styling
├── script.js               ← Tracking logic
├── google-apps-script.js   ← Backend code (paste into Google)
└── README.md               ← This file
```

---

## 🚀 Complete Setup Guide

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. In **Row 1**, add these column headers:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Latitude | Longitude | Map Link | IP Address | Browser | Device | Status |

4. Name the sheet anything you want (e.g., "Visitor Data")

---

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Copy the entire contents of `google-apps-script.js` and paste it there
4. Click **💾 Save** (name the project "Visitor Tracker")

---

### Step 3: Deploy as Web App

1. In Apps Script editor, click **Deploy → New deployment**
2. Click the ⚙️ gear icon → Select **Web app**
3. Set these options:
   - **Description:** Visitor Tracker
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Authorize** when prompted (click "Advanced" → "Go to Visitor Tracker" if warning appears)
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

### Step 4: Add URL to Your Website

1. Open `script.js`
2. Replace the placeholder on **line 4**:
   ```javascript
   const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   With your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
   ```
3. Save the file

---

### Step 5: Test Locally

1. Open `index.html` in your browser
2. Allow location permission when prompted
3. Check your Google Sheet — a new row should appear within seconds

---

### Step 6: Deploy to GitHub Pages

1. Go to [GitHub](https://github.com) and create a **new repository**
   - Name: `my-website` (or anything)
   - Set to **Public**
2. Upload these files to the repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - ⚠️ Do NOT upload `google-apps-script.js` (it's only for Google)
3. Go to **Settings → Pages**
4. Under "Source", select **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at: `https://yourusername.github.io/my-website/`

---

## 📊 Google Sheet Columns Explained

| Column | Description |
|--------|-------------|
| Timestamp | When the visitor opened the page |
| Latitude | Visitor's latitude (or "Denied") |
| Longitude | Visitor's longitude (or "Denied") |
| Map Link | Clickable Google Maps link |
| IP Address | Public IP (or "Unavailable") |
| Browser | Chrome, Safari, Firefox, etc. |
| Device | Mobile, Tablet, or Desktop |
| Status | Location Granted / Location Denied |

---

## ✅ Final Testing Checklist

- [ ] Google Sheet has correct headers in Row 1
- [ ] Apps Script is deployed as Web App with "Anyone" access
- [ ] Web App URL is pasted in `script.js`
- [ ] Open website → location prompt appears
- [ ] Data appears in Google Sheet within 5 seconds
- [ ] Denying location still sends partial data
- [ ] Works on mobile browser
- [ ] GitHub Pages site loads correctly

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| No data in sheet | Check that Web App URL is correct in script.js |
| CORS error | Make sure `mode: "no-cors"` is in the fetch call (already set) |
| Location always "Denied" | Site must be served over HTTPS (GitHub Pages does this) |
| Script authorization error | Re-deploy Apps Script and authorize again |
| Old data appearing | After editing Apps Script, create a **New Deployment** (don't update old one) |

---

## 🔒 Security Notes

- Location requires HTTPS (GitHub Pages provides this automatically)
- IP detection uses a free public API (ipify.org)
- No sensitive data is stored on any third-party server
- Google Sheet is only accessible to you
- The Apps Script only accepts POST data with valid fields

---

## 📱 Features

- ✅ Auto-collects visitor data on page load
- ✅ Handles location permission denial gracefully
- ✅ Shows embedded map preview
- ✅ Toast notifications for success/failure
- ✅ Manual resend button
- ✅ Fully responsive (mobile + desktop)
- ✅ Dark modern UI
- ✅ Zero cost — no hosting, no paid APIs
- ✅ Works on GitHub Pages
