import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 800 }, deviceScaleFactor: 2 });
await p.goto("file:///tmp/rp/awards.html", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
await p.screenshot({ path: "/tmp/rp/awards.png", fullPage: true });
await b.close();
console.log("DONE");
