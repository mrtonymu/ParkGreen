import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.locator("#location").scrollIntoViewIfNeeded();
await p.getByRole("button", { name: "Shopping & Leisure" }).click();
await p.waitForTimeout(600);
await p.locator("#location").screenshot({ path: "/tmp/rp/sec-location-2.png" });
await b.close(); console.log("DONE");
