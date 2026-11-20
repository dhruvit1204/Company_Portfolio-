import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const vmDir = path.join(rootDir, 'public', 'images', 'projects', 'vm-brothers');
const drDir = path.join(rootDir, 'public', 'images', 'projects', 'dr-janvi-rana');

fs.mkdirSync(vmDir, { recursive: true });
fs.mkdirSync(drDir, { recursive: true });

async function capture() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,960'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1 });

    // 1. VM Brothers
    console.log('Navigating to VM Brothers...');
    await page.goto('https://vm-brothers.vercel.app/', { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise(r => setTimeout(r, 2500));

    // Shot 1: Hero
    console.log('Capturing VM Brothers Hero (y=0)...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(vmDir, 'hero-showcase.jpg'), type: 'jpeg', quality: 92 });

    // Shot 2: Projects Grid
    console.log('Capturing VM Brothers Projects Portfolio (y=1750)...');
    await page.evaluate(() => window.scrollTo(0, 1750));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(vmDir, 'projects-grid.jpg'), type: 'jpeg', quality: 92 });

    // Shot 3: Services & Trust
    console.log('Capturing VM Brothers Services (y=5930)...');
    await page.evaluate(() => window.scrollTo(0, 5930));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(vmDir, 'services-trust.jpg'), type: 'jpeg', quality: 92 });

    // Shot 4: Corridors & Contact
    console.log('Capturing VM Brothers Corridors & Contact...');
    await page.evaluate(() => window.scrollTo(0, 7200));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(vmDir, 'contact-booking.jpg'), type: 'jpeg', quality: 92 });

    // 2. Dr. Janvi Rana
    console.log('Navigating to Dr. Janvi Rana...');
    await page.goto('https://drjanvirana.vercel.app/', { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise(r => setTimeout(r, 2500));

    // Shot 1: Hero
    console.log('Capturing Dr. Janvi Rana Hero (y=0)...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(drDir, 'hero-showcase.jpg'), type: 'jpeg', quality: 92 });

    // Shot 2: Clinical Credentials
    console.log('Capturing Dr. Janvi Rana Credentials (y=2260)...');
    await page.evaluate(() => window.scrollTo(0, 2260));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(drDir, 'clinical-specialties.jpg'), type: 'jpeg', quality: 92 });

    // Shot 3: Interactive Therapy Flow / Specialties
    console.log('Capturing Dr. Janvi Rana Specialties...');
    await page.evaluate(() => window.scrollTo(0, 3100));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(drDir, 'therapy-flow.jpg'), type: 'jpeg', quality: 92 });

    // Shot 4: Booking & WhatsApp Consultation
    console.log('Capturing Dr. Janvi Rana Booking...');
    await page.evaluate(() => window.scrollTo(0, 4800));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(drDir, 'booking-whatsapp.jpg'), type: 'jpeg', quality: 92 });

    console.log('All fresh screenshots captured with precision!');
  } finally {
    await browser.close();
  }
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
