import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 760 } });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
// scroll so the hero's stats card + the marquee below it are both in view
await p.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.55)));
await p.waitForTimeout(500);
await p.screenshot({ path: "/tmp/rp/join.png" });
await b.close(); console.log("DONE");
