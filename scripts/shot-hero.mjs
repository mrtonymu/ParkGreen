import { chromium } from "playwright";
const b = await chromium.launch();
const sizes = [
  { w: 1440, h: 820, tag: "desktop" },
  { w: 768, h: 820, tag: "tablet" },
  { w: 390, h: 800, tag: "mobile" },
];
for (const s of sizes) {
  const p = await b.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `/tmp/rp/hero-${s.tag}.png` });
  await p.close();
}
await b.close(); console.log("DONE");
