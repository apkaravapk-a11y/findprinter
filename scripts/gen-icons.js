// Generates public/icons/icon-{192,512}.png from a programmatic SVG.
// Run: node scripts/gen-icons.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

function buildSvg(size) {
  const pad = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const r = Math.round(size * 0.18);
  const shadowOffset = Math.round(size * 0.035);
  const borderW = Math.max(3, Math.round(size * 0.028));
  const printerW = Math.round(inner * 0.64);
  const printerH = Math.round(inner * 0.48);
  const printerX = (size - printerW) / 2;
  const printerY = (size - printerH) / 2 + Math.round(size * 0.04);
  const paperW = Math.round(printerW * 0.62);
  const paperH = Math.round(printerH * 0.85);
  const paperX = (size - paperW) / 2;
  const paperY = printerY - Math.round(paperH * 0.55);
  const slotY = printerY + Math.round(printerH * 0.35);
  const slotH = Math.round(printerH * 0.12);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <!-- Offset shadow (neobrutalist) -->
  <rect x="${pad + shadowOffset}" y="${pad + shadowOffset}" width="${inner}" height="${inner}" rx="${r}" ry="${r}" fill="#0f172a"/>
  <!-- Main tile -->
  <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${r}" ry="${r}" fill="#facc15" stroke="#0f172a" stroke-width="${borderW}"/>

  <!-- Paper sticking out of top of printer -->
  <rect x="${paperX}" y="${paperY}" width="${paperW}" height="${paperH}" fill="#ffffff" stroke="#0f172a" stroke-width="${borderW}" rx="${Math.round(r * 0.2)}"/>
  <!-- A couple of lines on the paper -->
  <rect x="${paperX + paperW * 0.15}" y="${paperY + paperH * 0.25}" width="${paperW * 0.55}" height="${Math.max(2, borderW * 0.6)}" fill="#0f172a"/>
  <rect x="${paperX + paperW * 0.15}" y="${paperY + paperH * 0.45}" width="${paperW * 0.65}" height="${Math.max(2, borderW * 0.6)}" fill="#0f172a"/>
  <rect x="${paperX + paperW * 0.15}" y="${paperY + paperH * 0.65}" width="${paperW * 0.35}" height="${Math.max(2, borderW * 0.6)}" fill="#dbeafe"/>

  <!-- Printer body -->
  <rect x="${printerX}" y="${printerY}" width="${printerW}" height="${printerH}" fill="#ffffff" stroke="#0f172a" stroke-width="${borderW}" rx="${Math.round(r * 0.4)}"/>
  <!-- Printer output slot -->
  <rect x="${printerX + printerW * 0.12}" y="${slotY}" width="${printerW * 0.76}" height="${slotH}" fill="#0f172a" rx="${Math.round(slotH * 0.3)}"/>
  <!-- Status dot -->
  <circle cx="${printerX + printerW - printerW * 0.15}" cy="${printerY + printerH * 0.22}" r="${Math.round(printerH * 0.07)}" fill="#22c55e" stroke="#0f172a" stroke-width="${Math.max(2, borderW * 0.6)}"/>
</svg>`;
}

async function main() {
  for (const size of [192, 512]) {
    const svg = buildSvg(size);
    const out = path.join(outDir, `icon-${size}.png`);
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`wrote ${out} (${size}x${size})`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
