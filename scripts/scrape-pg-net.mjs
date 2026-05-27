import { chromium } from "playwright";
import { writeFileSync } from "fs";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

const found = new Set();
p.on("response", (r) => {
  const u = r.url();
  if (/wp-content\/uploads\/.+\.(jpg|jpeg|png|webp)/i.test(u)) {
    found.add(u.replace(/-\d+x\d+(\.(jpg|jpeg|png|webp))/i, "$1").split("?")[0]);
  }
});

await p.goto("https://parkgreen.com.my/", { waitUntil: "networkidle", timeout: 90000 });

// Slowly scroll the entire page several times to trigger every lazy asset.
for (let pass = 0; pass < 2; pass++) {
  await p.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 400;
        if (y < document.body.scrollHeight + 1000) setTimeout(step, 150);
        else setTimeout(res, 800);
      };
      step();
    });
  });
  // click any "next" arrows on sliders to reveal more slides
  const arrows = await p.$$('[class*="arrow" i], [class*="next" i], .swiper-button-next, .slick-next');
  for (const a of arrows.slice(0, 12)) {
    try { await a.click({ timeout: 800 }); await p.waitForTimeout(400); } catch {}
  }
  await p.waitForTimeout(800);
}

const list = [...found].sort();
writeFileSync("/tmp/pg_images.txt", list.join("\n"));
console.log(`FOUND ${list.length} images`);
console.log(list.join("\n"));
await b.close();
