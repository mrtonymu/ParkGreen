import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 820 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
const plan = p.locator('img[alt="River Park facilities masterplan"]').locator("xpath=..");
await plan.scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
const box = await plan.boundingBox();
// bottom-left quadrant where 24/25/26/27 live
await p.screenshot({ path: "/tmp/rp/fac-bl.png", clip: { x: box.x + box.width*0.12, y: box.y + box.height*0.55, width: box.width*0.36, height: box.height*0.45 } });
await b.close(); console.log("DONE");
