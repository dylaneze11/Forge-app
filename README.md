# ⚡ FORGE — Running App

> Cada kilómetro cuenta.

A complete, zero-dependency running tracker built as a single HTML file using React (CDN), Leaflet.js, and native browser APIs.

---

## 🚀 Quick Start

1. Open `index.html` directly in Chrome, Edge or Firefox — **no server required**.
2. Create an account (your first login auto-creates it).
3. Hit **COMENZAR RECORRIDO** and run!

---

## 📱 Features

| Feature | Details |
|---------|---------|
| **Live GPS Tracking** | `navigator.geolocation.watchPosition` with high accuracy |
| **Interactive Map** | Leaflet.js with real-time polyline + animated markers |
| **Voice Announcements** | Web Speech API — km milestones, start/pause/finish |
| **Audio Chimes** | Web Audio API — generated tones, no audio files needed |
| **Dark / Light Theme** | Full CSS variable theming with instant tile swap |
| **Demo Mode** | Automatic fallback for desktop (simulated Buenos Aires run) |
| **Run History** | All runs saved to `localStorage` with mini-map thumbnails |
| **Pace Chart** | Pure SVG chart — no external libraries |
| **GPX Export** | Standard GPX 1.1 file download |
| **Strava Integration** | Manual upload flow + OAUTH comments for future backend |
| **Session Persistence** | Auto-login on reload via `forge_session` key |

---

## 🎨 Stack

- **React 18** via CDN (no build step)
- **Leaflet 1.9.4** via CDN
- **Babel Standalone** for JSX transpilation
- **Google Fonts**: Bebas Neue + DM Sans
- **CSS Custom Properties** for full theming

---

## 🗂 localStorage Keys

| Key | Value |
|-----|-------|
| `forge_users` | All user accounts + run history |
| `forge_session` | Currently logged-in username |
| `forge_theme` | `"dark"` or `"light"` |
| `forge_muted` | `"true"` or `"false"` |

---

## 🗺 Map Tiles

- **Dark theme**: CartoDB Dark Matter
- **Light theme**: CartoDB Positron

Tiles switch automatically when toggling the theme during a live run.

---

## 🔊 Audio

All sounds are generated programmatically via Web Audio API:
- **Kilometer chime**: C5 → E5 → G5 ascending (sine wave)
- **Finish melody**: 5-note celebration (triangle wave)
- **Pause**: 440 Hz → 330 Hz descend
- **Resume**: 330 Hz → 440 Hz ascend

---

## 📡 GPS & Demo Mode

On **mobile** with GPS permission: real coordinates via `watchPosition`.

On **desktop** or without permission: Demo Mode activates automatically — a simulated runner performing a random walk starting at Buenos Aires (-34.6037°, -58.3816°) at ~8 km/h.

---

## 🏗 Future Backend Integrations

Search for `// STRAVA_OAUTH:` comments in `index.html` for the full OAuth 2.0 flow needed for direct Strava upload without manual GPX steps.

---

## 📄 License

MIT — Free to use, modify and distribute.
