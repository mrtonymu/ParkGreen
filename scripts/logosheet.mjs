import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 700 }, deviceScaleFactor: 2 });
await p.goto("file:///tmp/rp/logos.html", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
await p.screenshot({ path: "/tmp/rp/logos.png", fullPage: true });
await b.close(); console.log("DONE");
