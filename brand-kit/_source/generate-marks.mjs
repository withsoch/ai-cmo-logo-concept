// Generates the static tellme brand kit (SVG + PNG) from the same geometry as
// design-philosophies/funky/reference/tellme-system.html, with all motion removed.
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "/Users/riz/Claude Code/tellme-brand-kit";
const INK = "#2b2b38", OR = "#ff6a3d", CREAM = "#fff6ea", BUTTER = "#ffd166", LILAC = "#c9b8ff", BLUSH = "#ff9f8a";
const S = 4;

const face = (cx, cy, s = 1) => {
  const e = (x) => `<ellipse cx="${x}" cy="${cy}" rx="${4.6*s}" ry="${5.6*s}" fill="${INK}"/><circle cx="${x + 1.6*s}" cy="${cy - 2*s}" r="${1.6*s}" fill="#fff"/>`;
  return `${e(cx - 15*s)}${e(cx + 15*s)}
  <circle cx="${cx - 24*s}" cy="${cy + 10*s}" r="${6*s}" fill="${BLUSH}" fill-opacity=".7"/>
  <circle cx="${cx + 24*s}" cy="${cy + 10*s}" r="${6*s}" fill="${BLUSH}" fill-opacity=".7"/>
  <path d="M${cx - 9*s} ${cy + 12*s}q${9*s} ${9*s} ${18*s} 0" fill="none" stroke="${INK}" stroke-width="${4*s}" stroke-linecap="round"/>`;
};

const PROPS = {
  pen: (hx, hy) => `<g transform="translate(${hx - 4} ${hy + 2}) rotate(-58)">
    <rect x="0" y="-6" width="36" height="12" rx="6" fill="${LILAC}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M34 -6l14 6-14 6z" fill="${OR}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/></g>`,
  camera: (hx, hy) => `<g transform="translate(${hx - 8} ${hy - 30})">
    <rect x="6" y="-4" width="10" height="6" rx="2" fill="${INK}"/>
    <rect x="0" y="0" width="36" height="26" rx="8" fill="${LILAC}" stroke="${INK}" stroke-width="3.5"/>
    <circle cx="19" cy="13" r="8" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/><circle cx="19" cy="13" r="3.2" fill="${OR}"/></g>`,
  play: (hx, hy) => `<g transform="translate(${hx - 8} ${hy - 30})">
    <rect x="0" y="0" width="38" height="27" rx="9" fill="${OR}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M15 7.5l11 6-11 6z" fill="#fff" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/></g>`,
  mic: (hx, hy) => `<g transform="translate(${hx - 2} ${hy - 4}) rotate(18)">
    <rect x="-3" y="-14" width="7" height="16" rx="3.5" fill="${INK}"/>
    <rect x="-9" y="-40" width="19" height="28" rx="9.5" fill="${LILAC}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M-4 -30h9M-4 -24h9" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/></g>`,
  mail: (hx, hy) => `<g transform="translate(${hx - 8} ${hy - 28})">
    <rect x="0" y="0" width="38" height="26" rx="6" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M3 4l16 12 16-12" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M19 21c-3-2-6-4-6-6.5a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 2.5-3 4.5-6 6.5z" fill="${OR}"/></g>`,
};

// Inner drawings + their viewBoxes (kept identical to the animated reference)
const CHAR = {
  penpal: {
    vb: [0, 0, 124, 124],
    draw: (p) => `<circle cx="54" cy="66" r="42" fill="${BUTTER}" stroke="${INK}" stroke-width="${S}"/>
      ${face(54, 58, 1)}
      ${p ? PROPS[p](88, 90) : ""}
      ${p ? `<circle cx="88" cy="90" r="9" fill="${BUTTER}" stroke="${INK}" stroke-width="${S}"/>` : ""}`,
  },
  sidekick: {
    vb: [0, 0, 140, 124],
    draw: (p) => `<g transform="translate(4 0)">
      <path d="M14 120c0-26 18-42 40-42s40 16 40 42z" fill="${OR}" stroke="${INK}" stroke-width="${S}"/>
      ${p ? `<path d="M84 92c8-4 14-10 16-18" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M84 92c8-4 14-10 16-18" fill="none" stroke="${OR}" stroke-width="5" stroke-linecap="round"/>` : ""}
      <circle cx="54" cy="46" r="30" fill="${CREAM}" stroke="${INK}" stroke-width="${S}"/>
      <path d="M28 36c5-15 20-22 34-18 7 2 13 7 15 13-10-4-22-3-30 3-7 4-13 5-19 2z" fill="${INK}"/>
      ${face(54, 50, .8)}
      ${p ? PROPS[p](102, 70) : ""}
      ${p ? `<circle cx="102" cy="70" r="8.5" fill="${CREAM}" stroke="${INK}" stroke-width="${S}"/>` : ""}
    </g>`,
  },
};

// Penpal's core (no prop) sits left of centre; nudge it so it centres in a square
const CORE_VB = { penpal: [8, 20, 92, 92], sidekick: [12, 12, 100, 112] };

const CHANNELS = [
  { slug: "core", prop: null, tint: "#ffffff" },
  { slug: "linkedin", prop: "pen", tint: "#eaf2fb" },
  { slug: "instagram", prop: "camera", tint: "#fdeef4" },
  { slug: "youtube", prop: "play", tint: "#fff1e0" },
  { slug: "podcast", prop: "mic", tint: "#efe9ff" },
  { slug: "newsletter", prop: "mail", tint: "#fff8dc" },
];

const svgDoc = (vb, inner, w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" width="${w}" height="${h}">${inner}</svg>\n`;

const vbFor = (name, prop) => (prop ? CHAR[name].vb : CORE_VB[name]);

/** A character centred inside a square canvas with a background, filling `fill` of the side. */
const onSquare = (name, prop, size, bg, fill, radius = 0) => {
  const vb = vbFor(name, prop);
  const scale = (size * fill) / Math.max(vb[2], vb[3]);
  const w = vb[2] * scale, h = vb[3] * scale;
  const x = (size - w) / 2, y = (size - h) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>` : ""}
  <svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb.join(" ")}">${CHAR[name].draw(prop)}</svg>
</svg>\n`;
};

const png = (svg, file, width) => sharp(Buffer.from(svg), { density: 300 }).resize({ width }).png().toFile(file);

const dirs = ["svg", "png", "profile-pictures", "app-icon", "favicon"];
dirs.forEach((d) => mkdirSync(join(OUT, d), { recursive: true }));

const made = [];
for (const name of Object.keys(CHAR)) {
  for (const ch of CHANNELS) {
    const base = `${name}-${ch.slug}`;
    const vb = vbFor(name, ch.prop);
    // transparent mark, square-ish canvas from the viewBox
    const markSvg = svgDoc(vb, CHAR[name].draw(ch.prop), vb[2] * 8, vb[3] * 8);
    writeFileSync(join(OUT, "svg", `${base}.svg`), markSvg);
    for (const w of [1024, 512, 256]) {
      await png(markSvg, join(OUT, "png", `${base}-${w}.png`), w);
    }
    // profile picture: 800x800 on the channel tint, character inside the circle-crop safe area
    const pp = onSquare(name, ch.prop, 800, ch.slug === "core" ? (name === "penpal" ? CREAM : "#fff0e6") : ch.tint, 0.66);
    writeFileSync(join(OUT, "profile-pictures", `${base}-profile.svg`), pp);
    await png(pp, join(OUT, "profile-pictures", `${base}-profile-800.png`), 800);
    made.push(base);
  }
}

// App icon: Penpal core on cream, square (stores round the corners themselves) + a rounded preview
const app = onSquare("penpal", null, 1024, CREAM, 0.72);
writeFileSync(join(OUT, "app-icon", "app-icon-1024.svg"), app);
await png(app, join(OUT, "app-icon", "app-icon-1024.png"), 1024);
const appRounded = onSquare("penpal", null, 1024, CREAM, 0.72, 230);
await png(appRounded, join(OUT, "app-icon", "app-icon-rounded-preview-1024.png"), 1024);

// Favicons: transparent core face, plus the Apple touch icon on cream
const fav = onSquare("penpal", null, 64, null, 0.98);
writeFileSync(join(OUT, "favicon", "favicon.svg"), fav);
for (const s of [16, 32, 48]) await png(fav, join(OUT, "favicon", `favicon-${s}.png`), s);
const touch = onSquare("penpal", null, 180, CREAM, 0.74);
await png(touch, join(OUT, "favicon", "apple-touch-icon-180.png"), 180);

console.log("marks:", made.length, "→", OUT);
