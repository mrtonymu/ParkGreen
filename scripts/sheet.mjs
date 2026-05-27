import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1500, height: 760 }, deviceScaleFactor: 1 });
await p.goto("file:///tmp/rp/sheet.html", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
await p.screenshot({ path: "/tmp/rp/pg-montage.png", fullPage: true });
await b.close(); console.log("DONE");
