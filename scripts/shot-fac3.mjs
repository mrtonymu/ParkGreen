import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1500, height: 760 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
const plan = p.locator('img[alt="River Park facilities masterplan"]').locator("xpath=..");
await plan.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
const box = await plan.boundingBox();
// left third, high-res
await p.screenshot({ path: "/tmp/rp/fac-zoom.png", clip: { x: box.x, y: box.y, width: box.width * 0.42, height: box.height } });
await b.close(); console.log("DONE");
