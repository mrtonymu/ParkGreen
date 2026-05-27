import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w,h,tag] of [[1440,900,"d"],[820,900,"t"],[390,800,"m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1.5 });
  await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(700);
  const el = p.locator("#progress");
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await el.screenshot({ path: `/tmp/rp/pg-prog-${tag}.png` });
  await p.close();
}
await b.close(); console.log("DONE");
