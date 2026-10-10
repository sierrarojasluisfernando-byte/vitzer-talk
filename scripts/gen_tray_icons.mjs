// Generates the Vitzer tray icons (64x64 PNG) into src-tauri/resources.
// Monochrome "V" for light/dark trays, plus a status dot for recording
// (red), transcribing (violet) and warning (amber). Run: node scripts/gen_tray_icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const SIZE = 64;
const SS = 4; // supersampling per axis

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};
const encodePng = (rgba) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const raw = Buffer.alloc((SIZE * 4 + 1) * SIZE);
  for (let y = 0; y < SIZE; y++)
    rgba.copy(raw, y * (SIZE * 4 + 1) + 1, y * SIZE * 4, (y + 1) * SIZE * 4);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
};

const distToSegment = (px, py, [ax, ay], [bx, by]) => {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};
const inRoundedRect = (x, y, r) => {
  const cx = Math.min(Math.max(x, r), SIZE - r);
  const cy = Math.min(Math.max(y, r), SIZE - r);
  return Math.hypot(x - cx, y - cy) <= r;
};
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

const BLUE = [0x41, 0x69, 0xe1];
const VIOLET = [0x8b, 0x5c, 0xf6];

// layers(x, y) returns the top-most [r, g, b] covering the sample, or null.
const render = (layers) => {
  const out = Buffer.alloc(SIZE * SIZE * 4);
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++)
        for (let sx = 0; sx < SS; sx++) {
          const c = layers(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS);
          if (c) { r += c[0]; g += c[1]; b += c[2]; a++; }
        }
      const i = (y * SIZE + x) * 4;
      if (a) { out[i] = r / a; out[i + 1] = g / a; out[i + 2] = b / a; }
      out[i + 3] = Math.round((a / (SS * SS)) * 255);
    }
  return encodePng(out);
};

const vMark = (color, { box, width, dot }) => (x, y) => {
  const [l, t, r, btm] = box;
  const tip = [(l + r) / 2, btm];
  if (dot) {
    const d = Math.hypot(x - dot.cx, y - dot.cy);
    if (d <= dot.r) return dot.color;
    if (d <= dot.r + 3) return null; // clear ring so the dot reads on the V
  }
  const d = Math.min(distToSegment(x, y, [l, t], tip), distToSegment(x, y, [r, t], tip));
  return d <= width / 2 ? color : null;
};

const DOTS = {
  recording: [0xef, 0x44, 0x44],
  transcribing: VIOLET,
  warning: [0xf5, 0x9e, 0x0b],
};
const dotAt = (color) => ({ cx: 50, cy: 50, r: 10, color });

const mono = (color, dot) =>
  render(vMark(color, { box: [11, 9, 53, 53], width: 11, dot }));

const colored = (dot) => {
  const v = vMark([255, 255, 255], { box: [19, 18, 45, 46], width: 8, dot });
  return render((x, y) => {
    const top = v(x, y);
    if (top) return top;
    if (dot && Math.hypot(x - dot.cx, y - dot.cy) <= dot.r + 3) return null;
    return inRoundedRect(x, y, 15) ? mix(BLUE, VIOLET, (x + y) / (2 * SIZE)) : null;
  });
};

const WHITE = [255, 255, 255];
const INK = [0x0b, 0x0b, 0x12];
const files = {
  // AppTheme::Dark tray → light glyph; AppTheme::Light tray → dark glyph.
  "tray_idle.png": mono(WHITE),
  "tray_recording.png": mono(WHITE, dotAt(DOTS.recording)),
  "tray_transcribing.png": mono(WHITE, dotAt(DOTS.transcribing)),
  "tray_idle_warning.png": mono(WHITE, dotAt(DOTS.warning)),
  "tray_idle_dark.png": mono(INK),
  "tray_recording_dark.png": mono(INK, dotAt(DOTS.recording)),
  "tray_transcribing_dark.png": mono(INK, dotAt(DOTS.transcribing)),
  "tray_idle_warning_dark.png": mono(INK, dotAt(DOTS.warning)),
  "handy.png": colored(),
  "recording.png": colored(dotAt(DOTS.recording)),
  "transcribing.png": colored(dotAt(DOTS.transcribing)),
  "handy_warning.png": colored(dotAt(DOTS.warning)),
};
for (const [name, png] of Object.entries(files)) {
  writeFileSync(new URL(`../src-tauri/resources/${name}`, import.meta.url), png);
  console.log(name, png.length);
}
