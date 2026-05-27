import { chromium } from "playwright";
import { writeFileSync } from "fs";
const base = "file:///Users/tonymumu/parkgreen/public/images/pg/floorplans/plans";
const groups = { "1": ["a", "b", "c"], "2": ["d", "f", "e"] };
const b = await chromium.launch();
for (const [g, types] of Object.entries(groups)) {
  const html =
    `<body style="margin:0;background:#fff">` +
    types
      .map(
        (f) =>
          `<div><div style="font:22px monospace;background:#241b16;color:#fff;padding:8px">Type ${f.toUpperCase()}</div><img src="${base}/fp-${f}.svg" style="width:1200px;height:auto;display:block"></div>`
      )
      .join("") +
    `</body>`;
  writeFileSync(`/tmp/rp/fpg-${g}.html`, html);
  const p = await b.newPage({ viewport: { width: 1240, height: 1000 }, deviceScaleFactor: 1.5 });
  await p.goto(`file:///tmp/rp/fpg-${g}.html`, { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `/tmp/rp/fpg-${g}.png`, fullPage: true });
  await p.close();
}
await b.close();
console.log("DONE");
