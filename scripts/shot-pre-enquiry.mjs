import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(600);
const band = p.locator('section[aria-label="Project highlights"]');
await band.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
// capture marquee + the top of the enquiry section beneath it
await p.evaluate(() => window.scrollBy(0, -80));
await p.waitForTimeout(300);
await p.screenshot({ path: "/tmp/rp/pre-enquiry.png" });
await b.close(); console.log("DONE");
