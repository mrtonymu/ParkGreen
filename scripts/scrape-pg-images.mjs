import { chromium } from "playwright";
import { writeFileSync } from "fs";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
await p.goto("https://parkgreen.com.my/", { waitUntil: "networkidle", timeout: 90000 });

// Scroll through the whole page to trigger lazy-loaded assets.
await p.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      window.scrollTo(0, y);
      y += 600;
      if (y < document.body.scrollHeight) setTimeout(step, 200);
      else setTimeout(res, 1200);
    };
    step();
  });
});
await p.waitForTimeout(1500);

const urls = await p.evaluate(() => {
  const set = new Set();
  const push = (u) => {
    if (!u) return;
    u = u.trim();
    if (/wp-content\/uploads\/.+\.(jpg|jpeg|png|webp)/i.test(u)) {
      // strip Wordpress size suffix to get the original
      set.add(u.replace(/-\d+x\d+(\.(jpg|jpeg|png|webp))/i, "$1").split("?")[0]);
    }
  };
  // <img src> + data-src + srcset
  document.querySelectorAll("img").forEach((img) => {
    push(img.currentSrc || img.src);
    push(img.getAttribute("data-src"));
    const ss = img.getAttribute("srcset") || img.getAttribute("data-srcset");
    if (ss) ss.split(",").forEach((s) => push(s.trim().split(" ")[0]));
  });
  // inline + computed background images
  document.querySelectorAll("*").forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== "none") {
      const m = bg.match(/url\(["']?([^"')]+)["']?\)/g);
      if (m) m.forEach((x) => push(x.replace(/url\(["']?|["']?\)/g, "")));
    }
  });
  return [...set].sort();
});

writeFileSync("/tmp/pg_images.txt", urls.join("\n"));
console.log(`FOUND ${urls.length} images`);
console.log(urls.join("\n"));
await b.close();
