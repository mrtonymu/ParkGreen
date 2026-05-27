import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 1.5 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(800);
await p.screenshot({ path: "/tmp/rp/v-hero.png" });
for (const [id, name] of [["floor-plans","fp"],["facilities","fac"],["gallery","gal"]]) {
  const el = p.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
  await el.screenshot({ path: `/tmp/rp/v-${name}.png` });
}
await b.close(); console.log("DONE");
