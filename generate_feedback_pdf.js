const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const brainDir = 'C:/Users/varun/.gemini/antigravity-ide/brain/daca5db0-f58e-4094-bb2e-715ba3e3ee57';
const workspaceDir = 'c:/Users/varun/OneDrive/Desktop/skynetgloballogistic';
const outputPdf = path.join(workspaceDir, 'skynet_client_feedback_request.pdf');

console.log('Using pre-captured screenshots in workspace...');

// Map all screenshots by direct filenames
const screenshots = {
  hero: path.join(workspaceDir, 'hero_updated_screenshot.png'),
  tracker: path.join(workspaceDir, 'homepage_screenshot.png'),
  chatbot: path.join(workspaceDir, 'chatbot_screenshot.png'),
  admin: path.join(workspaceDir, 'admin_screenshot.png'),
  clocks: path.join(workspaceDir, 'clocks_screenshot.png'),
  map: path.join(workspaceDir, 'map_screenshot.png'),
  fleet: path.join(workspaceDir, 'fleet_screenshot.png'),
  calculator: path.join(workspaceDir, 'calculator_screenshot.png'),
  careers: path.join(workspaceDir, 'careers_screenshot.png'),
  contact: path.join(workspaceDir, 'contact_screenshot.png')
};

// Validate that all screenshots exist
Object.entries(screenshots).forEach(([key, filePath]) => {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Screenshot for ${key} is missing at ${filePath}.`);
    process.exit(1);
  }
});

// Create a new PDF document (A4 page size)
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 50, right: 50 },
  bufferPages: true // allow page number calculation later
});

const stream = fs.createWriteStream(outputPdf);
doc.pipe(stream);

// Color palette
const colors = {
  primary: '#1C64F2',    // Electric Cobalt Blue
  secondary: '#0B0F19',  // Deep Night Slate
  text: '#1F2937',       // Dark Charcoal
  muted: '#4B5563',      // Muted Slate Gray
  lightBg: '#F9FAFB',    // Warm White/Light Gray
  accent: '#10B981',     // Neon Emerald Green
  border: '#E5E7EB',     // Light Gray border
  calloutBg: '#EFF6FF',  // Light Blue callout
  calloutBorder: '#BFDBFE' // Blue callout border
};

// =========================================================================
// PAGE 1: COVER PAGE
// =========================================================================

// Decorative top accent bar
doc.rect(0, 0, 595.28, 12).fill(colors.primary);

// Header Brand Title
doc.fillColor(colors.primary)
   .font('Helvetica-Bold')
   .fontSize(14)
   .text('SKYNET GLOBAL LOGISTICS', 50, 40);

doc.fillColor(colors.muted)
   .font('Helvetica')
   .fontSize(9)
   .text('DIGITAL REDESIGN & ENTERPRISE PORTAL', 50, 55);

// Line Separator
doc.moveTo(50, 72).lineTo(545.28, 72).strokeColor(colors.border).lineWidth(1).stroke();

// Title Block
doc.fillColor(colors.secondary)
   .font('Helvetica-Bold')
   .fontSize(24)
   .text('Complete Redesign Proposal &\nFeature Alignment Guide', 50, 110, { lineGap: 5 });

doc.fillColor(colors.muted)
   .font('Helvetica')
   .fontSize(11)
   .text('Comprehensive Overview of Redesigned UX/UI & Backend Features', 50, 175);

// Cover Letter
doc.fillColor(colors.text)
   .font('Helvetica')
   .fontSize(9.5)
   .text('Dear Skynet Project Team,', 50, 205)
   .moveDown(0.6)
   .text('We have completed the comprehensive redesign of the Skynet Global Logistics portal, upgrading it to a premium, full-stack enterprise platform. This document provides a visual walkthrough of all features (including frontend interfaces, interactive calculators, live timezone trackers, and the administrative dashboard).', { lineGap: 2.5 })
   .moveDown(0.6)
   .text('🔗 TEST THE LIVE INTERACTIVE SITE:', { font: 'Helvetica-Bold', color: colors.primary, lineGap: 2.5 })
   .text('You can test and interact with the live redesigned website on your desktop or mobile device using our secure external link: ', { continued: true, lineGap: 2.5 })
   .fillColor(colors.primary)
   .font('Helvetica-Bold')
   .text('https://burdened-downwardly-arielle.ngrok-free.dev', { link: 'https://burdened-downwardly-arielle.ngrok-free.dev', underline: true })
   .fillColor(colors.text)
   .font('Helvetica')
   .moveDown(0.6)
   .text('Most sections are equipped with interactive controls and realistic placeholder data. To align the platform with your daily operations, we have compiled an overview of each component along with the key business inputs required from your team.', { lineGap: 2.5 });

// AI Productivity Tip Callout Box
const boxY = 345;
doc.rect(50, boxY, 495.28, 90).fill(colors.calloutBg);
doc.rect(50, boxY, 495.28, 90).strokeColor(colors.calloutBorder).lineWidth(1.5).stroke();

doc.fillColor(colors.primary)
   .font('Helvetica-Bold')
   .fontSize(10)
   .text('💡 SMART FEEDBACK TIP FOR CO-WORKERS & CLIENTS:', 65, boxY + 12);

doc.fillColor(colors.text)
   .font('Helvetica')
   .fontSize(9)
   .text('To save time, you do not need to write replies to each question manually! You can copy-paste the text of this PDF or upload the screenshot pages directly into an AI assistant (such as ChatGPT, Claude, or Gemini) and prompt it:\n\n"Based on these questions and screenshots, write a clean response with my business details: [Insert your rough business notes here]."\n\nThis will instantly generate formatted text copy ready to send back to our developers.', 65, boxY + 28, { width: 465, lineGap: 2 });

// Meta Details Box at bottom
const metaY = 460;
doc.rect(50, metaY, 495.28, 100).fill(colors.lightBg);
doc.rect(50, metaY, 495.28, 100).strokeColor(colors.border).lineWidth(1).stroke();

doc.fillColor(colors.secondary)
   .font('Helvetica-Bold')
   .fontSize(9.5)
   .text('DOCUMENT SUMMARY & METADATA', 65, metaY + 12);

doc.fillColor(colors.muted)
   .font('Helvetica')
   .fontSize(8.5)
   .text('Prepared For:', 65, metaY + 32)
   .text('Prepared By:', 65, metaY + 47)
   .text('Current Date:', 65, metaY + 62)
   .text('Portal Status:', 65, metaY + 77);

doc.fillColor(colors.text)
   .font('Helvetica-Bold')
   .fontSize(8.5)
   .text('Skynet Global Logistics Management Team', 150, metaY + 32)
   .text('Development & UX Design Team', 150, metaY + 47)
   .text('June 5, 2026', 150, metaY + 62)
   .text('Development Complete - Awaiting Content Sign-off', 150, metaY + 77);

// =========================================================================
// HELPER FOR SECTION PAGES (Strict single page sizing)
// =========================================================================
function renderSectionPage(title, introduction, imagePath, questions) {
  doc.addPage();
  
  // Section Title
  doc.fillColor(colors.secondary)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text(title, 50, 40);
     
  // Description / Justification
  doc.fillColor(colors.muted)
     .font('Helvetica')
     .fontSize(9)
     .text(introduction, 50, 62, { width: 495.28, lineGap: 2 });
     
  // Image Box (430x268 points to fit cleanly on A4)
  const imageY = 95;
  const imageWidth = 430;
  const imageHeight = 268;
  
  doc.rect(50, imageY, imageWidth, imageHeight).fill('#f3f4f6');
  doc.image(imagePath, 50, imageY, { width: imageWidth, height: imageHeight });
  doc.rect(50, imageY, imageWidth, imageHeight).strokeColor(colors.border).lineWidth(1).stroke();
  
  // Questions Box
  const qY = 380;
  doc.fillColor(colors.primary)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('REQUIRED OPERATIONAL CLARIFICATIONS & QUESTIONS:', 50, qY);
     
  let currentY = qY + 18;
  questions.forEach(q => {
    // Bullet dot
    doc.fillColor(colors.primary)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('•', 55, currentY);
       
    // Bullet text
    doc.fillColor(colors.text)
       .font('Helvetica')
       .fontSize(9)
       .text(q, 70, currentY, { width: 475, lineGap: 2 });
       
    // Increment Y based on text height
    const height = doc.heightOfString(q, { width: 475, lineGap: 2 });
    currentY += Math.max(height, 10) + 8;
  });
}

// =========================================================================
// SECTION 1: HERO SECTION
// =========================================================================
renderSectionPage(
  '1. Redesigned 2-Column Hero & Animated Backdrop',
  'We split the hero section into a clean 2-column grid. The left holds typography with an active keyword swapper (Excellence, Efficiency, Reliability, Connectivity). The right displays a custom rotating wireframe globe. A magnetic splattered particle backdrop reacts dynamically to cursor hover and clicks.',
  screenshots.hero,
  [
    'Do the rotatable keywords (Excellence, Efficiency, Reliability, Connectivity) reflect the core values of your company?',
    'Do you have any primary marketing headings or specific button labels you would like us to swap?'
  ]
);

// =========================================================================
// SECTION 2: TRACKER
// =========================================================================
renderSectionPage(
  '2. Live Shipment Tracker Widget',
  'We built an interactive Shipment Tracker linked directly to our MongoDB database, rendering full event-log timelines. This feature enables clients to search their tracking code and view shipment events in real-time.',
  screenshots.tracker,
  [
    'Since the shipment tracker currently operates on mock consignment data (e.g. SKY-102948 / SKY-987654), do you have any specific tracking code formats or mock data paths you would like us to pre-populate?',
    'When you are ready to transition to live data, what API endpoints or database connections should we integrate to fetch actual shipment timelines?'
  ]
);

// =========================================================================
// SECTION 3: CHATBOT WIDGET
// =========================================================================
renderSectionPage(
  '3. Interactive AI Chatbot Support Widget',
  'A floating live chatbot widget resides in the bottom right corner of the website. It assists users with common FAQs (like volumetric weight formulas) and queries consignment codes directly via our REST API.',
  screenshots.chatbot,
  [
    'Are the default chatbot FAQs (such as volumetric weight calculations and support hours) correct, or would you like to define custom automated replies for specific customer questions?',
    'Would you like us to implement any other chat options or integrate this widget with an external live support platform (like Zendesk or Intercom)?'
  ]
);

// =========================================================================
// SECTION 4: SECURE ADMIN PORTAL
// =========================================================================
renderSectionPage(
  '4. Secure Administrative Panel & Auth Dashboard',
  'A secure control room is accessible at /admin. Login blocks unauthorized traffic and enforces Bearer JWT token validations. The control panel allows administrators to edit shipment tracking milestones and manage client contact/quote inquiries.',
  screenshots.admin,
  [
    'What default administrator credentials and role access requirements should we configure for the live database deployment?',
    'Do you require specific log exporting formats or automated email/SMS alert protocols when contact/quote inquiries are received?'
  ]
);

// =========================================================================
// SECTION 5: CLOCKS & ACCREDITATIONS
// =========================================================================
renderSectionPage(
  '5. Global Operational Scale (Clocks & Accreditations)',
  'We added live clock tickers for your core regional offices to show 24/7 global coverage. Active offices pulse green with "Operations Active", while planned regions are dimmed with "Expansion Planned". We also added key cargo compliance badges to build trust with enterprise clients.',
  screenshots.clocks,
  [
    'What are the actual active administrative locations of your company that we should set to "Operations Active"? Are Sydney and Dubai correct, or are there others?',
    'Are the listed compliance badges (IATA Member, TAPA Certified, ISO 9001, Licensed Customs Brokerage) correct for your logistics operations, or should we modify this list?'
  ]
);

// =========================================================================
// SECTION 6: INTERACTIVE NETWORK MAP
// =========================================================================
renderSectionPage(
  '6. Interactive Global Logistics Route Map',
  'We designed an interactive SVG world map showing transit corridors. Clicking a region button or node (such as Australia/Oceania) dynamically animates the active trade lane in bright teal and reveals a dashboard card listing regional hubs and transit speeds.',
  screenshots.map,
  [
    'Does this geographical coverage (North America, Europe, Middle East, Asia Pacific, and Australia/Oceania) accurately reflect your company\'s primary service corridors?',
    'Are there any major regional hubs or transit paths that we should add or remove from this map?'
  ]
);

// =========================================================================
// SECTION 7: FLEET SHOWCASE
// =========================================================================
renderSectionPage(
  '7. Logistics Fleet Showcase (Air & Ocean)',
  'We built a tabbed switcher displaying your shipping equipment. It currently details the Air Cargo freighter specs (B747-8F capacities) and Ocean Container Ships, equipped with a slow cinematic float animation, overlays, and hover zooms for interactive feedback.',
  screenshots.fleet,
  [
    'Aside from Air Cargo and Ocean Liners, do you operate any other transport modes (e.g., Land transport, rail freight) that we should highlight as a tab?'
  ]
);

// =========================================================================
// SECTION 8: CARBON CALCULATOR
// =========================================================================
renderSectionPage(
  '8. Eco-Freight Carbon Emissions Calculator',
  'To support green corporate initiatives, we integrated a calculator allowing users to drag weight and distance sliders. It automatically computes CO2 emissions and trees saved when shipping via green routes, using animated numbers that ease into place.',
  screenshots.calculator,
  [
    'The carbon calculator currently uses standard global averages. Do you have any custom sustainability metrics or specific reforestation corporate partnerships we should list instead?'
  ]
);

// =========================================================================
// SECTION 9: CAREERS & ONBOARDING
// =========================================================================
renderSectionPage(
  '9. Careers Openings & Subcontractor Onboarding',
  'We added an Active Career Openings accordion with a drag-and-drop resume uploader (for roles in Sydney and Frankfurt), alongside a progressive Multi-Step Subcontractor Carrier Onboarding Wizard to gather partner truck and fleet profiles.',
  screenshots.careers,
  [
    'What fields, document upload requirements, and partner carrier verification rules should be added when transitioning this onboarding flow from mock to live databases?',
    'Are there any specific external applicant tracking systems (ATS) or HR platforms we should connect the career applications to in the future?'
  ]
);

// =========================================================================
// SECTION 10: CONTACT & ESTIMATOR WIZARD
// =========================================================================
renderSectionPage(
  '10. Contact Form & Stepper-Based Quote Wizard',
  'We redesigned the contact interface into clean swappable tabs. The first tab enables users to send direct messages to your inbox. The second tab launches a multi-step pricing estimator wizard, guiding the user through route inputs, cargo weights, and volumes with a processing delay animation.',
  screenshots.contact,
  [
    'Since the quote calculations currently use distance-based estimation rules with simulated data, do you have a specific rate structure or formula to integrate for live pricing?',
    'What SMTP mail server configurations or API endpoints should be set up to deliver contact form messages directly to your inbox?'
  ]
);

// =========================================================================
// PAGE 10: DESIGN OPINION & REVISIONS CONFIRMATION (NO IMAGE)
// =========================================================================
doc.addPage();

// Decorative top accent bar
doc.rect(0, 0, 595.28, 12).fill(colors.primary);

// Header
doc.fillColor(colors.primary)
   .font('Helvetica-Bold')
   .fontSize(14)
   .text('SKYNET GLOBAL LOGISTICS', 50, 40);

doc.moveTo(50, 65).lineTo(545.28, 65).strokeColor(colors.border).lineWidth(1).stroke();

// Title
doc.fillColor(colors.secondary)
   .font('Helvetica-Bold')
   .fontSize(18)
   .text('Design Opinion & Revision Sign-off Protocol', 50, 95);

// Intro
doc.fillColor(colors.text)
   .font('Helvetica')
   .fontSize(10)
   .text('This document represents the first design revision draft of the Skynet Global Logistics portal redesign. To progress towards launch, we require your confirmation of the visual direction and any content changes. Finalizing these inputs now helps us avoid making assumptions or sourcing incorrect public data ourselves.', { lineGap: 3.5 });

// Key Feedback Callout
const finalBoxY = 190;
doc.rect(50, finalBoxY, 495.28, 110).fill(colors.lightBg);
doc.rect(50, finalBoxY, 495.28, 110).strokeColor(colors.border).lineWidth(1).stroke();

doc.fillColor(colors.secondary)
   .font('Helvetica-Bold')
   .fontSize(11)
   .text('REVISION & SIGN-OFF CHECKLIST:', 65, finalBoxY + 15);

doc.fillColor(colors.text)
   .font('Helvetica')
   .fontSize(9.5)
   .text('1. Visual Style & Theme: Do you approve the premium dark-glassmorphic layouts, neon blue/teal highlights, and physics-based animations (particle canvas and globe)?\n\n2. Feature Usability: Are you satisfied with the flow of the shipment tracker, carbon calculator, chatbot widget, and onboarding forms?\n\n3. Client Content Revisions: Do you have specific corrections (text, coordinates, office addresses) you want us to apply in the next revision?', 65, finalBoxY + 35, { width: 465, lineGap: 2.5 });

// Signature Callout
doc.fillColor(colors.text)
   .font('Helvetica')
   .fontSize(10)
   .text('Please review the screenshots and questions inside this guide. Once you have compiled your feedback (either manually or using the AI suggestion tool), please return it to our team. We will immediately implement your revisions for the final production build.', 50, 330, { lineGap: 3.5 });

// Signatures
const sigY = 460;
doc.moveTo(50, sigY).lineTo(220, sigY).strokeColor(colors.muted).lineWidth(1).stroke();
doc.moveTo(325, sigY).lineTo(495, sigY).strokeColor(colors.muted).lineWidth(1).stroke();

doc.fillColor(colors.muted)
   .font('Helvetica')
   .fontSize(9)
   .text('Client Sign-off (Authorized Signature)', 50, sigY + 8)
   .text('Design Team Lead (Authorized Signature)', 325, sigY + 8);

doc.fontSize(8.5)
   .text('Name:', 50, sigY + 25)
   .text('Name:', 325, sigY + 25)
   .text('Date:', 50, sigY + 40)
   .text('Date:', 325, sigY + 40);

// Final Closing note
doc.fillColor(colors.primary)
   .font('Helvetica-Bold')
   .fontSize(11)
   .text('Let\'s connect your logistics operations to the future.', 50, 620, { align: 'center' });

// =========================================================================
// FOOTERS AND PAGE NUMBERS
// =========================================================================

// After rendering all pages, write page numbers in the footer of every page
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(i);
  
  // Page number right aligned
  doc.fillColor(colors.muted)
     .font('Helvetica')
     .fontSize(7.5)
     .text(`Page ${i + 1} of ${range.count}`, 50, 750, { align: 'right', width: 495.28 });
     
  // Footer text left aligned
  doc.text('Skynet Global Logistics Redesign — Feature Feedback Request', 50, 750, { align: 'left', width: 350 });
}

doc.end();
console.log('PDF Generation script finished successfully!');
