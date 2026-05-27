import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w, h, tag] of [[1440, 1000, "d"], [390, 900, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(700);
  const sec = p.locator("section.bg-clay").first();
  await sec.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await sec.screenshot({ path: `/tmp/rp/sus-${tag}.png` });
  await p.close();
}
await b.close(); console.log("DONE");
