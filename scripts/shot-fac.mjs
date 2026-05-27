import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.locator("#facilities").scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
await p.locator("#facilities").screenshot({ path: "/tmp/rp/sec-fac.png" });
// hover pin 11 (Infinity Lap Pool) to show a tooltip
await p.getByRole("button", { name: "11. Infinity Lap Pool" }).hover();
await p.waitForTimeout(400);
await p.locator("#facilities").screenshot({ path: "/tmp/rp/sec-fac-hover.png" });
await b.close(); console.log("DONE");
