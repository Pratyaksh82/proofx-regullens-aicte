import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_DIR = 'c:\\Users\\praty\\Desktop\\MnVisionAI\\proofx\\screenshots';

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Dashboard
  console.log('Capturing 01_command_center_dashboard.png...');
  await page.screenshot({ path: path.join(TARGET_DIR, '01_command_center_dashboard.png') });

  // 2. Forensics Studio
  console.log('Navigating to Forensics...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.textContent.includes('Forensic Studio'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  console.log('Capturing 02_forensic_studio_tamper_detection.png...');
  await page.screenshot({ path: path.join(TARGET_DIR, '02_forensic_studio_tamper_detection.png') });

  // 3. APH Rules
  console.log('Navigating to Rules...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.textContent.includes('APH 2024-27 Rules'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 600));
  // Click evaluate button
  await page.evaluate(() => {
    const evalBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Evaluate APH') || b.textContent.includes('Calculate'));
    if (evalBtn) evalBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log('Capturing 03_aph_rules_engine_calculator.png...');
  await page.screenshot({ path: path.join(TARGET_DIR, '03_aph_rules_engine_calculator.png') });

  // 4. Institutions
  console.log('Navigating to Institutions...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.textContent.includes('Institutions Scrutiny'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log('Capturing 04_institutions_scrutiny_directory.png...');
  await page.screenshot({ path: path.join(TARGET_DIR, '04_institutions_scrutiny_directory.png') });

  // 5. PSR Report
  console.log('Navigating to PSR Report...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.textContent.includes('PSR Dossier Builder'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log('Capturing 05_psr_preliminary_scrutiny_report.png...');
  await page.screenshot({ path: path.join(TARGET_DIR, '05_psr_preliminary_scrutiny_report.png') });

  // 6. Statutory Guide
  console.log('Navigating to Statutory Guide...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.textContent.includes('Statutory Guide'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log('Capturing 06_regulatory_handbook_guide.png...');
  await page.screenshot({ path: path.join(TARGET_DIR, '06_regulatory_handbook_guide.png') });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
