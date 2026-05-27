import { chromium } from "playwright";
import { writeFileSync } from "fs";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

const imgs = new Set();
const keep = (u) =>
  /\.(jpe?g|png|webp|avif)(\?|$)/i.test(u) &&
  !/google|gstatic|doubleclick|facebook|pagead/i.test(u);
p.on("response", (r) => {
  const u = r.url();
  const ct = (r.headers()["content-type"] || "").toLowerCase();
  if (keep(u) || (ct.startsWith("image/") && !/google|gstatic|pagead/i.test(u))) {
    imgs.add(u.split("?")[0]);
  }
});

const settle = (ms = 1400) => p.waitForTimeout(ms);
const scrollThrough = async () => {
  await p.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const s = () => { window.scrollTo(0, y); y += 350; if (y < document.body.scrollHeight + 600) setTimeout(s, 120); else setTimeout(res, 500); };
      s();
    });
  });
};

await p.goto("https://parkgreen.com.my/", { waitUntil: "networkidle", timeout: 90000 });
await settle(2000);

// close any popup/overlay
for (const sel of ['[class*="popup" i] [class*="close" i]', '[class*="modal" i] [class*="close" i]', 'img[src*="icon-cross"]', '.close', 'button[aria-label*="close" i]']) {
  try { const el = await p.$(sel); if (el) { await el.click({ timeout: 600 }); await settle(400); } } catch {}
}
try { await p.keyboard.press("Escape"); } catch {}
await settle(500);

await scrollThrough();

// visit each top-nav section
for (const label of ["Luxury Residences", "Facilities", "Floor Plans", "Gallery", "Our Awards"]) {
  try {
    await p.getByText(label, { exact: false }).first().click({ timeout: 1500 });
    await settle(2200);
    await scrollThrough();
  } catch (e) { console.log(`nav "${label}": ${e.message.split("\n")[0]}`); }
}

// gallery thumbnails + swiper arrows
for (let round = 0; round < 2; round++) {
  for (const sel of ['.gallery-thumb', '[class*="thumb" i]', '.swiper-slide', '.swiper-button-next', '[class*="next" i]', '[class*="arrow" i]', '[class*="floor" i] button', '[class*="floor" i] [class*="tab" i]']) {
    const els = await p.$$(sel);
    for (const el of els.slice(0, 20)) {
      try { await el.scrollIntoViewIfNeeded({ timeout: 500 }); await el.click({ timeout: 500 }); await settle(450); } catch {}
    }
  }
}
await settle(1500);

const list = [...imgs].sort();
writeFileSync("/tmp/pg_render_urls.txt", list.join("\n"));
console.log(`TOTAL images: ${list.length}\n`);
console.log(list.join("\n"));
await b.close();
