import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w, h, tag] of [[1440, 900, "d"], [390, 800, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(700);
  // top state (transparent over hero)
  await p.screenshot({ path: `/tmp/rp/hdr-top-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 130 } });
  // scrolled state (solid cream bar)
  await p.evaluate(() => window.scrollTo(0, 1400));
  await p.waitForTimeout(700);
  await p.screenshot({ path: `/tmp/rp/hdr-scrolled-${tag}.png`, clip: { x: 0, y: 0, width: w, height: 130 } });
  await p.close();
}
await b.close(); console.log("DONE");
