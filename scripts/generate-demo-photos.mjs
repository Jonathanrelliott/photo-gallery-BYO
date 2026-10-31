// Generates the placeholder "photos" in public/demo used by the mocked UI.
// Run with: node scripts/generate-demo-photos.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/demo/", import.meta.url);
mkdirSync(OUT, { recursive: true });

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const skies = [
  ["#0b0f0d", "#14291f", "#1d3b2a"],
  ["#0d1110", "#1a2620", "#2a3d2f"],
  ["#0a0d12", "#14202a", "#1f3a33"],
  ["#100d12", "#1e1a26", "#2b3b2d"],
  ["#0b100c", "#183020", "#3c5a2a"],
];
const leafGreens = ["#1f4d2e", "#2f6b3a", "#3f8a45", "#5aa84f", "#244f3c", "#2d5e4f"];
const pastels = ["#f7b8d2", "#c9b6ff", "#ffcfa8", "#a8f0d0", "#ffd6e8"];
const neon = "#c6ff3d";

const sizes = [
  [1200, 1500],
  [1500, 1000],
  [1200, 1200],
  [1000, 1500],
  [1600, 1000],
];

function leaf(r, x, y, len, angle, fill, glow) {
  const w = len * (0.28 + r() * 0.2);
  const d = `M0 0 C ${w} ${-len * 0.25}, ${w * 0.9} ${-len * 0.8}, 0 ${-len} C ${-w * 0.9} ${-len * 0.8}, ${-w} ${-len * 0.25}, 0 0 Z`;
  const vein = `M0 0 Q ${w * 0.08} ${-len * 0.5} 0 ${-len * 0.97}`;
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path d="${d}" fill="${fill}" opacity="${0.75 + r() * 0.25}"/>
    <path d="${d}" fill="url(#sheen)"/>
    <path d="${vein}" stroke="${glow ? neon : "#0b0f0d"}" stroke-opacity="${glow ? 0.9 : 0.35}" stroke-width="${glow ? 3 : 2}" fill="none" ${glow ? 'filter="url(#glow)"' : ""}/>
  </g>`;
}

function flower(r, x, y, size, color) {
  const petals = 5 + Math.floor(r() * 4);
  let s = `<g transform="translate(${x} ${y}) rotate(${r() * 360})" opacity="${0.8 + r() * 0.2}">`;
  for (let i = 0; i < petals; i++) {
    s += `<ellipse cx="0" cy="${-size * 0.55}" rx="${size * 0.28}" ry="${size * 0.55}" fill="${color}" transform="rotate(${(360 / petals) * i})"/>`;
  }
  s += `<circle r="${size * 0.22}" fill="${neon}" opacity="0.85" filter="url(#glow)"/></g>`;
  return s;
}

for (let i = 0; i < 18; i++) {
  const r = rng(i * 977 + 13);
  const [W, H] = sizes[i % sizes.length];
  const sky = skies[i % skies.length];
  let body = "";

  // bokeh
  for (let b = 0; b < 26; b++) {
    const c = r() < 0.25 ? neon : r() < 0.5 ? pastels[Math.floor(r() * pastels.length)] : "#7fbf6a";
    body += `<circle cx="${r() * W}" cy="${r() * H * 0.8}" r="${20 + r() * 90}" fill="${c}" opacity="${0.05 + r() * 0.18}" filter="url(#blur)"/>`;
  }
  // light shaft
  body += `<path d="M${W * (0.2 + r() * 0.5)} 0 L${W * (0.6 + r() * 0.3)} 0 L${W * (0.9 + r() * 0.3)} ${H} L${W * (0.1 + r() * 0.3)} ${H} Z" fill="url(#shaft)" opacity="0.35"/>`;

  // leaves fanning from the bottom
  const clusters = 2 + Math.floor(r() * 3);
  for (let c = 0; c < clusters; c++) {
    const cx = W * (0.1 + r() * 0.8);
    const count = 6 + Math.floor(r() * 8);
    for (let l = 0; l < count; l++) {
      body += leaf(
        r,
        cx + (r() - 0.5) * W * 0.15,
        H + 20,
        H * (0.35 + r() * 0.5),
        -70 + r() * 140,
        leafGreens[Math.floor(r() * leafGreens.length)],
        r() < 0.15,
      );
    }
  }
  // flowers
  const flowers = Math.floor(r() * 6);
  for (let f = 0; f < flowers; f++) {
    body += flower(r, W * (0.1 + r() * 0.8), H * (0.3 + r() * 0.5), 30 + r() * 60, pastels[Math.floor(r() * pastels.length)]);
  }
  // moss band
  body += `<rect x="0" y="${H * 0.88}" width="${W}" height="${H * 0.12}" fill="url(#moss)"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${sky[0]}"/><stop offset="0.55" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/>
    </linearGradient>
    <linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e9ffd0" stop-opacity="0.6"/><stop offset="1" stop-color="#e9ffd0" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0.12"/><stop offset="1" stop-color="#000000" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="moss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#14291f" stop-opacity="0"/><stop offset="1" stop-color="#0b0f0d" stop-opacity="0.9"/>
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${body}
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`;
  writeFileSync(new URL(`photo-${String(i + 1).padStart(2, "0")}.svg`, OUT), svg);
}
console.log("Generated 18 demo photos in public/demo");
