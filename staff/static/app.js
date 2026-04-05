// staff/static/app.js
// Handles live WebSocket updates from the Flask-SocketIO backend

const socket = io();

// ─── Helpers ────────────────────────────────────────────────

function showToast(message, level = "confirmed") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${level} show`;
  setTimeout(() => { toast.className = "toast"; }, 5000);
}

function updateSensorCard(deviceId, level, signalType, alertId) {
  const card  = document.getElementById(`card-${deviceId}`);
  const badge = document.getElementById(`badge-${deviceId}`);
  const type  = document.getElementById(`type-${deviceId}`);
  const btn   = document.getElementById(`btn-${deviceId}`);

  if (!card) return;

  // Remove all status classes, add new one
  card.classList.remove("safe", "possible", "confirmed");
  card.classList.add(level);

  if (badge) badge.textContent = level.toUpperCase();
  if (type)  type.textContent  = signalType || "No activity";

  if (btn) {
    btn.style.display = level !== "safe" ? "flex" : "none";
    // Update onclick with latest alert_id
    btn.onclick = () => resolveAlert(deviceId, alertId);
  }
}

function resetSensorCard(deviceId) {
  const card  = document.getElementById(`card-${deviceId}`);
  const badge = document.getElementById(`badge-${deviceId}`);
  const type  = document.getElementById(`type-${deviceId}`);
  const btn   = document.getElementById(`btn-${deviceId}`);

  if (!card) return;
  card.classList.remove("possible", "confirmed");
  card.classList.add("safe");
  if (badge) badge.textContent = "SAFE";
  if (type)  type.textContent  = "No activity";
  if (btn)   btn.style.display = "none";
}

// ─── Socket events ───────────────────────────────────────────

socket.on("connect", () => {
  console.log("[Socket] Connected to staff server");
});

socket.on("new_alert", (data) => {
  console.log("[Socket] New alert:", data);

  // Only update cards if we're on the dashboard
  updateSensorCard(data.device_id, data.level, data.signal_type, data.alert_id);

  // Always show toast regardless of page
  const emoji = data.level === "confirmed" ? "🔴" : "🟡";
  showToast(
    `${emoji} ${data.sensor_name} — ${data.signal_type} detected (${data.level})`,
    data.level
  );

  // Play alert sound
  playAlertSound(data.level);
});

socket.on("alert_resolved", (data) => {
  console.log("[Socket] Alert resolved:", data);
  resetSensorCard(data.device_id);
});

// ─── Resolve alert ───────────────────────────────────────────

async function resolveAlert(deviceId, alertId) {
  if (!alertId) return;
  try {
    const res = await fetch("/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: deviceId, alert_id: alertId }),
    });
    if (res.ok) {
      resetSensorCard(deviceId);
    }
  } catch (err) {
    console.error("[Resolve] Error:", err);
  }
}

// ─── Alert sound ─────────────────────────────────────────────

function playAlertSound(level) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode   = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(level === "confirmed" ? 880 : 660, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.8);
  } catch (_) {
    // Audio not available — silent fail
  }
}
