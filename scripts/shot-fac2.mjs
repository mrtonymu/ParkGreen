import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1500, height: 760 } });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
const plan = p.locator('img[alt="River Park facilities masterplan"]').locator("xpath=..");
await plan.scrollIntoViewIfNeeded();

await p.getByRole("button", { name: "8. Strolling Garden Path" }).hover();
await p.waitForTimeout(400);
await plan.screenshot({ path: "/tmp/rp/fac-plan.png" });
await b.close(); console.log("DONE");
