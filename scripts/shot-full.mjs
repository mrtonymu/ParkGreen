import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w, h, tag] of [[1440, 900, "d"], [390, 800, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(800);
  await p.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => { window.scrollTo(0, y); y += 500; if (y < document.body.scrollHeight) setTimeout(step, 80); else setTimeout(res, 400); };
      step();
    });
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(500);
  await p.screenshot({ path: `/tmp/rp/pg-full-${tag}.png`, fullPage: true });
  await p.close();
}
await b.close(); console.log("DONE");
