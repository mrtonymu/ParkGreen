import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(800);
for (const [id, name] of [["location","loc"],["floor-plans","fp"],["progress","prog"]]) {
  const el = p.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
  await el.screenshot({ path: `/tmp/rp/w-${name}.png` });
}
await b.close(); console.log("DONE");
