import { chromium } from "playwright";
import fs from "fs";

const dir = "/tmp/rp";
fs.mkdirSync(dir, { recursive: true });
const URL = process.env.URL || "http://localhost:3001/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => {
  await new Promise((r) => {
    let y = 0;
    const t = setInterval(() => {
      window.scrollBy(0, 900);
      y += 900;
      if (y >= document.body.scrollHeight) {
        clearInterval(t);
        r();
      }
    }, 120);
  });
});
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: `${dir}/mine-hero.png` });
await page.screenshot({ path: `${dir}/mine-full.png`, fullPage: true });
await browser.close();
console.log("DONE");
