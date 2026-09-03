import { chromium } from "playwright";

const targets = [
  { url: "https://apex-wright-lab.vercel.app/", out: "public/work/apex.jpg" },
  { url: "https://kaabonglaunch.netlify.app/", out: "public/work/kaabo.jpg" },
  { url: "https://brandi-lux.netlify.app/", out: "public/work/brandilux.jpg" },
];

const browser = await chromium.launch();
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
  try {
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: t.out, type: "jpeg", quality: 90 });
    console.log("OK", t.url, "->", t.out);
  } catch (err) {
    console.log("FAIL", t.url, err.message);
  }
  await page.close();
}
await browser.close();
