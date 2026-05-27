import { chromium } from "playwright";
import { writeFileSync } from "fs";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

const images = new Set();
const jsonHits = new Set();
const allImgExt = new Set();

p.on("response", async (r) => {
  const u = r.url();
  const ct = (r.headers()["content-type"] || "").toLowerCase();
  try {
    if (ct.startsWith("image/")) images.add(u.split("?")[0]);
    if (/\.(jpe?g|png|webp|avif)(\?|$)/i.test(u)) allImgExt.add(u.split("?")[0]);
    if (ct.includes("json") || /\.json(\?|$)|admin-ajax|wp-json|api/i.test(u)) {
      const body = await r.text();
      // pull any image-path-like strings out of the JSON
      const m = body.match(/[^"'\s]+\.(jpe?g|png|webp|avif)/gi);
      if (m) m.forEach((x) => jsonHits.add(`${u}  →  ${x}`));
    }
  } catch {}
});

await p.goto("https://parkgreen.com.my/", { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(1500);

// full scroll
await p.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const s = () => { window.scrollTo(0, y); y += 400; if (y < document.body.scrollHeight + 800) setTimeout(s, 150); else setTimeout(res, 800); };
    s();
  });
});

// open the Gallery + click through thumbnails / swiper arrows
for (const sel of ['a[href*="gallery" i]', 'text=Gallery', '.gallery-thumb', '.swiper-button-next', '.slick-next', '[class*="next" i]', '[class*="arrow" i]', '.gallery-page']) {
  const els = await p.$$(sel);
  for (const el of els.slice(0, 15)) {
    try { await el.click({ timeout: 700 }); await p.waitForTimeout(500); } catch {}
  }
}
await p.waitForTimeout(1500);

const out = {
  imageContentType: [...images].sort(),
  imageByExtension: [...allImgExt].sort(),
  jsonImagePaths: [...jsonHits].sort(),
};
writeFileSync("/tmp/pg_sniff.json", JSON.stringify(out, null, 2));
console.log(`image content-type: ${images.size}`);
console.log(`image by extension: ${allImgExt.size}`);
console.log(`json image paths:   ${jsonHits.size}`);
console.log("\n=== IMAGE (content-type) ===\n" + [...images].sort().slice(0, 60).join("\n"));
console.log("\n=== JSON image paths ===\n" + [...jsonHits].sort().slice(0, 40).join("\n"));
await b.close();
