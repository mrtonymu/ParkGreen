import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
for (const id of ["location", "facilities", "floor-plans"]) {
  await p.locator(`#${id}`).scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  await p.locator(`#${id}`).screenshot({ path: `/tmp/rp/sec-${id}.png` });
}
await b.close();
console.log("DONE");
