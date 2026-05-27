import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1500, height: 1200 }, deviceScaleFactor: 1.5 });
await p.goto("file:///tmp/rp/fp-sheet.html", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
await p.screenshot({ path: "/tmp/rp/fp-sheet.png", fullPage: true });
await b.close(); console.log("DONE");
