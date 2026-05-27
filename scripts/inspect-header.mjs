import { chromium } from "playwright";

const URL = "https://beachfrontbalok.vercel.app";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1000);

const read = () => p.evaluate(() => {
  // Find the topmost fixed/sticky bar
  const all = [...document.querySelectorAll("header, div, nav")];
  const bar = all.find((el) => {
    const cs = getComputedStyle(el);
    return (cs.position === "fixed" || cs.position === "sticky") &&
           el.getBoundingClientRect().top <= 4 &&
           el.querySelector("a");
  });
  if (!bar) return { found: false };
  const cs = getComputedStyle(bar);
  return {
    found: true,
    tag: bar.tagName.toLowerCase(),
    cls: bar.className,
    position: cs.position,
    top: cs.top,
    transition: cs.transition.slice(0, 200),
    backgroundColor: cs.backgroundColor,
    backdropFilter: cs.backdropFilter,
    boxShadow: cs.boxShadow,
    borderBottom: cs.borderBottom,
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    height: cs.height,
  };
});

const top = await read();
await p.evaluate(() => window.scrollTo(0, 800));
await p.waitForTimeout(800);
const scrolled = await read();

console.log(JSON.stringify({ top, scrolled }, null, 2));
await b.close();
