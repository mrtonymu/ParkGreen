import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(700);
await p.screenshot({ path: "/tmp/rp/pg-hero.png" });
// privilege clay band
const clay = p.locator("section.bg-clay").first();
await clay.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
await clay.screenshot({ path: "/tmp/rp/pg-privilege.png" });
// Bukit Jalil City
const bjc = p.locator("#bukit-jalil-city");
await bjc.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
await bjc.screenshot({ path: "/tmp/rp/pg-bjc.png" });
await b.close(); console.log("DONE");
