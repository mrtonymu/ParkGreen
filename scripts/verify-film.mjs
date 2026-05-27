import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 1.5 });
await p.goto("http://localhost:3001/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(800);
await p.screenshot({ path: "/tmp/rp/film-hero.png" });
// open the modal
await p.getByRole("button", { name: /watch the film/i }).click();
await p.waitForTimeout(1500);
await p.screenshot({ path: "/tmp/rp/film-modal.png" });
await b.close(); console.log("DONE");
