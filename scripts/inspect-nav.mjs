import { chromium } from "playwright";

const URL = "https://beachfrontbalok.vercel.app";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

const cssFiles = [];
p.on("response", (r) => {
  const u = r.url();
  if (u.endsWith(".css")) cssFiles.push(u);
});

await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1200);

// --- nav at top of page ---
await p.screenshot({ path: "/tmp/rp/ref-nav-top.png", clip: { x: 0, y: 0, width: 1440, height: 140 } });

const probe = await p.evaluate(() => {
  const pickStyles = (el, props) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const out = {};
    for (const k of props) out[k] = cs.getPropertyValue(k);
    return out;
  };
  const nav =
    document.querySelector("nav") ||
    document.querySelector("header") ||
    document.querySelector('[class*="nav" i]');
  const links = nav ? [...nav.querySelectorAll("a")] : [];
  const linkEl = links.find((a) => a.textContent.trim().length > 0) || links[0];

  return {
    navTag: nav ? nav.tagName.toLowerCase() : null,
    navClass: nav ? nav.className : null,
    navHTML: nav ? nav.outerHTML.slice(0, 1400) : null,
    navStyle: pickStyles(nav, [
      "position", "transition", "transform", "background-color",
      "backdrop-filter", "-webkit-backdrop-filter", "height", "box-shadow",
      "border-bottom", "mix-blend-mode", "opacity",
    ]),
    linkText: linkEl ? linkEl.textContent.trim() : null,
    linkStyle: pickStyles(linkEl, [
      "transition", "transform", "color", "position", "overflow",
    ]),
    linkAfter: linkEl ? pickStyles(linkEl, []) && (() => {
      const cs = getComputedStyle(linkEl, "::after");
      return {
        content: cs.content, width: cs.width, height: cs.height,
        transform: cs.transform, transition: cs.transition,
        background: cs.backgroundColor, bottom: cs.bottom, left: cs.left,
        position: cs.position,
      };
    })() : null,
    linkBefore: linkEl ? (() => {
      const cs = getComputedStyle(linkEl, "::before");
      return { content: cs.content, width: cs.width, transform: cs.transform, transition: cs.transition };
    })() : null,
    usesFramer: !!document.querySelector("[style*='transform']") &&
      [...document.scripts].some((s) => /framer|motion/i.test(s.src)),
    bodyClasses: document.body.className,
  };
});

// --- hover state of a nav link ---
let hover = null;
try {
  const firstLink = p.locator("nav a, header a").first();
  await firstLink.hover();
  await p.waitForTimeout(400);
  hover = await p.evaluate(() => {
    const a = document.querySelector("nav a, header a");
    const cs = getComputedStyle(a);
    const af = getComputedStyle(a, "::after");
    return {
      color: cs.color, transform: cs.transform,
      afterWidth: af.width, afterTransform: af.transform, afterBg: af.backgroundColor,
    };
  });
  await p.screenshot({ path: "/tmp/rp/ref-nav-hover.png", clip: { x: 0, y: 0, width: 1440, height: 140 } });
} catch (e) { hover = "hover-failed: " + e.message; }

// --- scroll down, see if nav changes (solidify / shrink / hide) ---
await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(900);
await p.screenshot({ path: "/tmp/rp/ref-nav-scrolled.png", clip: { x: 0, y: 0, width: 1440, height: 140 } });
const scrolled = await p.evaluate(() => {
  const nav = document.querySelector("nav") || document.querySelector("header");
  if (!nav) return null;
  const cs = getComputedStyle(nav);
  return {
    transform: cs.transform, backgroundColor: cs.backgroundColor,
    backdropFilter: cs.backdropFilter || cs["-webkit-backdrop-filter"],
    height: cs.height, boxShadow: cs.boxShadow, position: cs.position,
    borderBottom: cs.borderBottom, opacity: cs.opacity,
  };
});

console.log(JSON.stringify({ probe, hover, scrolled, cssFiles }, null, 2));
await b.close();
