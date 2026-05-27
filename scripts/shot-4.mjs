import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.locator("#progress").scrollIntoViewIfNeeded();
await p.getByRole("button", { name: "Mar 2023" }).click();   // a 4-photo milestone
await p.waitForTimeout(700);
await p.locator("#progress").screenshot({ path: "/tmp/rp/mine-4photos.png" });
await b.close();
console.log("DONE");
