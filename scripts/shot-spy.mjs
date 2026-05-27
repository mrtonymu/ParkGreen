import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(700);

// Put #facilities at ~40% viewport so scroll-spy marks it active.
await p.evaluate(() => {
  const el = document.getElementById("facilities");
  const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4;
  window.scrollTo(0, y);
});
await p.waitForTimeout(900);
await p.screenshot({ path: "/tmp/rp/spy-active.png", clip: { x: 0, y: 0, width: 1440, height: 110 } });

// Hover a non-active link (Gallery) to show the underline wipe-in.
await p.locator('header nav a', { hasText: "Gallery" }).hover();
await p.waitForTimeout(500);
await p.screenshot({ path: "/tmp/rp/spy-hover.png", clip: { x: 0, y: 0, width: 1440, height: 110 } });

await b.close(); console.log("DONE");
