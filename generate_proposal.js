const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create a new PDF Document
const doc = new PDFDocument({ margin: 50 });

// Pipe it to a write stream in the workspace
const outputPath = path.join('c:', 'Users', 'varun', 'OneDrive', 'Desktop', 'skynetgloballogistic', 'skynet_hosting_and_dev_proposal.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Styling helpers
const primaryColor = '#1d4ed8'; // Royal Blue
const secondaryColor = '#0f172a'; // Dark Slate
const lightBg = '#f8fafc'; // Light grey/slate
const textMuted = '#64748b'; // Muted slate
const accentColor = '#10b981'; // Green

// Header section
doc.fillColor(secondaryColor)
   .fontSize(22)
   .font('Helvetica-Bold')
   .text('PROJECT PROPOSAL & ESTIMATE', 50, 50);

doc.fontSize(10)
   .font('Helvetica')
   .fillColor(textMuted)
   .text('PREPARED FOR: Skynet Global Logistics', 50, 78)
   .text('DATE: June 4, 2026', 50, 92)
   .text('STATUS: Ready for Review', 50, 106);

// Drawing a colored separator bar
doc.rect(50, 125, 512, 4)
   .fill(primaryColor);

// 1. Executive Summary
doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(secondaryColor)
   .text('1. Project Executive Summary', 50, 150);

doc.fontSize(10.5)
   .font('Helvetica')
   .fillColor(secondaryColor)
   .text('This document outlines the development, deployment, and operational hosting costs for the Skynet Global Logistics full-stack platform. The platform features responsive dark-glassmorphism visuals, real-time shipment tracking, automated quote estimations, an AI-powered interactive chatbot, and a secure administrator dashboard for full-stack data management.', 50, 175, { width: 512, align: 'justify', lineGap: 3 });

// 2. Development & Deployment Scope
doc.fontSize(14)
   .font('Helvetica-Bold')
   .text('2. One-Time Development & Deployment Fees', 50, 240);

// Draw table headers
const startY = 265;
doc.rect(50, startY, 512, 22).fill(primaryColor);

doc.fillColor('#ffffff')
   .fontSize(9.5)
   .font('Helvetica-Bold')
   .text('DELIVERABLE ITEM & FEATURES', 60, startY + 6)
   .text('AMOUNT', 480, startY + 6, { align: 'right' });

// Table row
doc.fillColor(secondaryColor)
   .font('Helvetica')
   .fontSize(10)
   .text('Website Development & Server Deployment', 60, startY + 32)
   .fontSize(9)
   .fillColor(textMuted)
   .text('Includes full frontend redesign, design system integration, 2-column animated hero section, eco carbon calculator, interactive SVG world map, API-connected AI Chatbot support widget, secure admin portal, and database seeder logic.', 60, startY + 46, { width: 380 })
   .fontSize(10.5)
   .font('Helvetica-Bold')
   .fillColor(secondaryColor)
   .text('Rs. 16,000.00', 480, startY + 32, { align: 'right' });

// Draw total border for Y=360
doc.rect(50, startY + 95, 512, 0.5).fill('#cbd5e1');

doc.fontSize(11)
   .font('Helvetica-Bold')
   .text('One-Time Total:', 340, startY + 110)
   .fillColor(primaryColor)
   .text('Rs. 16,000.00', 480, startY + 110, { align: 'right' });

// 3. Ongoing Infrastructure & Hosting Costs
doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(secondaryColor)
   .text('3. Ongoing Hosting & Infrastructure Estimates', 50, startY + 145);

const startY2 = startY + 170;
doc.rect(50, startY2, 512, 22).fill(secondaryColor);

doc.fillColor('#ffffff')
   .fontSize(9.5)
   .font('Helvetica-Bold')
   .text('INFRASTRUCTURE COMPONENT', 60, startY2 + 6)
   .text('FREQUENCY / CONTRACT', 260, startY2 + 6)
   .text('ESTIMATED COST', 480, startY2 + 6, { align: 'right' });

// Row 1
doc.fillColor(secondaryColor)
   .font('Helvetica')
   .fontSize(10)
   .text('Domain Name Registration (.com/.in)', 60, startY2 + 30)
   .text('3-Year Upfront', 260, startY2 + 30)
   .text('Rs. 3,500.00 / 3 Years', 480, startY2 + 30, { align: 'right' })
   .fontSize(8.5)
   .fillColor(textMuted)
   .text('Approximately Rs. 1,166 / year (~Rs. 97 / month). Purchased upfront.', 60, startY2 + 42);

// Row 2
doc.fillColor(secondaryColor)
   .font('Helvetica')
   .fontSize(10)
   .text('Server Hosting (Railway.com)', 60, startY2 + 65)
   .text('Monthly Subscription', 260, startY2 + 65)
   .text('Rs. 5,040.00 / Year', 480, startY2 + 65, { align: 'right' })
   .fontSize(8.5)
   .fillColor(textMuted)
   .text('Billed under Hobby Plan ($5/month / ~Rs. 420/month). Covered by included credits.', 60, startY2 + 77);

// Row 3
doc.fillColor(secondaryColor)
   .font('Helvetica')
   .fontSize(10)
   .text('Database Hosting (MongoDB Atlas)', 60, startY2 + 100)
   .text('M0 Shared Sandbox', 260, startY2 + 100)
   .text('Rs. 0.00 / Free Forever', 480, startY2 + 100, { align: 'right' })
   .fontSize(8.5)
   .fillColor(textMuted)
   .text('512MB managed sandbox database, perfect for current traffic volume.', 60, startY2 + 112);

// Draw total border for Y
doc.rect(50, startY2 + 135, 512, 0.5).fill('#cbd5e1');

doc.fontSize(10.5)
   .font('Helvetica-Bold')
   .fillColor(secondaryColor)
   .text('Total Annual Ongoing Hosting Cost:', 180, startY2 + 145)
   .text('Rs. 6,206.00 / Year', 480, startY2 + 145, { align: 'right' });

// 4. Project Terms
doc.fontSize(12)
   .font('Helvetica-Bold')
   .text('Project & Sign-off Details', 50, startY2 + 185);

doc.fontSize(9.5)
   .font('Helvetica')
   .fillColor(textMuted)
   .text('1. Code delivery and GitHub configuration will be finalized upon initial payment clearance.\n2. Railway.app and MongoDB accounts will be transferred to your own control post-launch.\n3. Ongoing hosting costs are subject to change depending on traffic volume and server loads.', 50, startY2 + 205, { lineGap: 3 });

// Footer
doc.fontSize(8.5)
   .font('Helvetica-Oblique')
   .fillColor(textMuted)
   .text('Proposal created by Developer. Skynet Global Logistics Development Service.', 50, 720, { align: 'center' });

doc.end();
console.log('PDF Generated successfully.');
