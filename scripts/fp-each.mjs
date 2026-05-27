import { chromium } from "playwright";
const b = await chromium.launch();
const base = "file:///Users/tonymumu/parkgreen/public/images/pg/floorplans/plans";
for (const f of ["a","b","c","d","e","f"]) {
  const p = await b.newPage({ viewport: { width: 1100, height: 1100 }, deviceScaleFactor: 2 });
  await p.setContent(`<body style="margin:0;background:#fff"><img src="${base}/fp-${f}.svg" style="width:1100px;height:auto"></body>`);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `/tmp/rp/fp-${f}.png`, fullPage: true });
  await p.close();
}
await b.close(); console.log("DONE");
