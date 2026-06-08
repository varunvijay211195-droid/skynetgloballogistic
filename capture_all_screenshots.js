const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/';
const workspaceDir = 'c:\\Users\\varun\\OneDrive\\Desktop\\skynetgloballogistic';

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Capture Hero Section
  console.log('Navigating to homepage for Hero capture...');
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });
  // Wait a bit for entry animations
  await new Promise(resolve => setTimeout(resolve, 2000));
  const heroElement = await page.$('.hero');
  if (heroElement) {
    await heroElement.screenshot({ path: path.join(workspaceDir, 'hero_updated_screenshot.png') });
    console.log('Captured hero_updated_screenshot.png');
  }

  // 2. Capture Tracker Modal
  console.log('Interacting with Tracker Modal...');
  const trackBtn = await page.$('#trackShipmentBtn');
  if (trackBtn) {
    await trackBtn.click();
    await new Promise(resolve => setTimeout(resolve, 500)); // wait for open animation
    // Click suggestion badge
    const badge = await page.$('.suggestion-badge[data-code="SKY-987654"]');
    if (badge) {
      await badge.click();
      await new Promise(resolve => setTimeout(resolve, 1500)); // wait for tracking timeline fetch & animation
      // Capture modal container itself
      const modal = await page.$('#trackerModal');
      if (modal) {
        await modal.screenshot({ path: path.join(workspaceDir, 'homepage_screenshot.png') });
        console.log('Captured homepage_screenshot.png (Tracker Modal)');
      }
    }
    // Close modal to reset screen state
    const closeBtn = await page.$('#trackerModalClose');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 3. Capture Clocks & Accreditations (Section 4)
  console.log('Capturing Global Hubs section...');
  const hubsElement = await page.$('#global-hubs');
  if (hubsElement) {
    await page.evaluate(() => {
      document.getElementById('global-hubs').scrollIntoView();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    await hubsElement.screenshot({ path: path.join(workspaceDir, 'clocks_screenshot.png') });
    console.log('Captured clocks_screenshot.png');
  }

  // 4. Capture Map (Section 5)
  console.log('Capturing Network Map section...');
  const mapElement = await page.$('#network-map');
  if (mapElement) {
    await page.evaluate(() => {
      document.getElementById('network-map').scrollIntoView();
    });
    // Click Australia/Oceania tab to highlight trade lanes
    const australiaTab = await page.$('.region-btn[data-region="australia"]');
    if (australiaTab) {
      await australiaTab.click();
      await new Promise(resolve => setTimeout(resolve, 800)); // wait for highlight transition
    }
    await mapElement.screenshot({ path: path.join(workspaceDir, 'map_screenshot.png') });
    console.log('Captured map_screenshot.png');
  }

  // 5. Capture Fleet Showcase (Section 6)
  console.log('Capturing Fleet Showcase section...');
  const fleetElement = await page.$('#fleet');
  if (fleetElement) {
    await page.evaluate(() => {
      document.getElementById('fleet').scrollIntoView();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    await fleetElement.screenshot({ path: path.join(workspaceDir, 'fleet_screenshot.png') });
    console.log('Captured fleet_screenshot.png');
  }

  // 6. Capture Carbon Calculator (Section 7)
  console.log('Capturing Carbon Calculator section...');
  const calcElement = await page.$('#eco-calc');
  if (calcElement) {
    await page.evaluate(() => {
      document.getElementById('eco-calc').scrollIntoView();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    await calcElement.screenshot({ path: path.join(workspaceDir, 'calculator_screenshot.png') });
    console.log('Captured calculator_screenshot.png');
  }

  // 7. Capture Careers (Section 8)
  console.log('Capturing Careers section...');
  const careersElement = await page.$('#careers');
  if (careersElement) {
    await page.evaluate(() => {
      document.getElementById('careers').scrollIntoView();
    });
    // Click first job triggers opening
    const firstJob = await page.$('.career-trigger');
    if (firstJob) {
      await firstJob.click();
      await new Promise(resolve => setTimeout(resolve, 600)); // wait for transition
    }
    await careersElement.screenshot({ path: path.join(workspaceDir, 'careers_screenshot.png') });
    console.log('Captured careers_screenshot.png');
  }

  // 8. Capture Contact & Wizard (Section 9)
  console.log('Capturing Contact section...');
  const contactElement = await page.$('#contact');
  if (contactElement) {
    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView();
    });
    // Click Quote Estimator tab
    const estimateTab = await page.$('#tabEstimate');
    if (estimateTab) {
      await estimateTab.click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    await contactElement.screenshot({ path: path.join(workspaceDir, 'contact_screenshot.png') });
    console.log('Captured contact_screenshot.png');
  }

  // 9. Capture Admin Dashboard (Section 3)
  console.log('Navigating and authenticating to Admin Dashboard...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.type('#username', 'admin');
  await page.type('#password', 'admin123');
  await page.click('#submitBtn');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 1500)); // wait for dashboard stats load
  await page.screenshot({ path: path.join(workspaceDir, 'admin_screenshot.png'), fullPage: true });
  console.log('Captured admin_screenshot.png');

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
