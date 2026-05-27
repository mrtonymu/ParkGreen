import { chromium } from "playwright";
import fs from "fs";

const dir = "/tmp/rp";
fs.mkdirSync(dir, { recursive: true });
const URL = "https://riverpark.com.my/";

const autoscroll = async (page, step) =>
  page.evaluate(async (s) => {
    await new Promise((resolve) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, s);
        y += s;
        if (y >= document.body.scrollHeight) {
          clearInterval(t);
          resolve();
        }
      }, 140);
    });
  }, step);

const browser = await chromium.launch();

// Desktop
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "load", timeout: 90000 });
await autoscroll(page, 800);
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.screenshot({ path: `${dir}/hero.png` });
await page.screenshot({ path: `${dir}/full.png`, fullPage: true });

const info = await page.evaluate(() => {
  const headings = [];
  document.querySelectorAll("h1,h2,h3,h4").forEach((h) => {
    const t = h.innerText.trim().replace(/\s+/g, " ");
    if (t) headings.push(`${h.tagName}: ${t.slice(0, 90)}`);
  });
  return { font: getComputedStyle(document.body).fontFamily, headings };
});
console.log("BODY FONT:", info.font);
console.log("HEADING OUTLINE:\n" + info.headings.join("\n"));

// Mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(URL, { waitUntil: "load", timeout: 90000 });
await autoscroll(m, 600);
await m.waitForTimeout(1200);
await m.screenshot({ path: `${dir}/mobile.png`, fullPage: true });

await browser.close();
console.log("DONE");
