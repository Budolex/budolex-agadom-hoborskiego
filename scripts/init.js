#!/usr/bin/env node

/**
 * Real Estate Template Initialization Script
 * Helps set up a new project from the template
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function initializeProject() {
  console.log('🏠 Real Estate Website Template Setup');
  console.log('=====================================\n');

  // Collect project information
  const projectName = await question('Project name: ');
  const projectSubtitle = await question('Project subtitle: ');
  const projectLocation = await question('Project location: ');
  const projectAddress = await question('Project address: ');
  
  console.log('\nDeveloper Information:');
  const developerName = await question('Company name: ');
  const developerAddress = await question('Company address: ');
  const developerCity = await question('City: ');
  const developerPostalCode = await question('Postal code: ');
  const developerVoivodeship = await question('Voivodeship: ');
  const developerNip = await question('NIP: ');
  const developerRegon = await question('REGON: ');
  const developerKrs = await question('KRS: ');
  const developerPhone = await question('Phone: ');
  const developerEmail = await question('Email: ');
  const developerWebsite = await question('Website: ');
  
  console.log('\nSite Settings:');
  const siteUrl = await question('Site URL (e.g., https://yourproject.com): ');

  rl.close();

  // Generate configuration
  const config = {
    project: {
      name: projectName,
      subtitle: projectSubtitle,
      description: `${projectName} - ${projectSubtitle}`,
      location: projectLocation,
      address: projectAddress,
      heroImage: "/images/hero.jpg",
      gallery: [
        "/images/gallery-1.jpg",
        "/images/gallery-2.jpg",
        "/images/gallery-3.jpg"
      ]
    },
    developer: {
      name: developerName,
      address: developerAddress,
      city: developerCity,
      postalCode: developerPostalCode,
      voivodeship: developerVoivodeship,
      district: developerCity,
      commune: developerCity,
      nip: developerNip,
      regon: developerRegon,
      krs: developerKrs,
      phone: developerPhone,
      email: developerEmail,
      website: developerWebsite,
      logo: "/images/logo.png"
    },
    openData: {
      datasetId: "generated-uuid-will-be-here",
      updateTime: "03:00",
      prospectusUrl: `${siteUrl}/prospekt-informacyjny.pdf`
    },
    site: {
      title: projectName,
      description: `${projectSubtitle} - ${developerName}`,
      url: siteUrl,
      baseUrl: "/",
      favicon: "/images/favicon.ico"
    },
    contact: {
      showForm: true,
      netlifyForm: true,
      formName: "contact"
    }
  };

  // Save configuration
  const configPath = path.join(__dirname, '../config/project.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log('\n✅ Configuration saved!');
  console.log('\nNext steps:');
  console.log('1. Replace images in static/images/');
  console.log('2. Edit units data in static/data/units.json');
  console.log('3. Run: npm start');
  console.log('4. Test your site and make adjustments');
  console.log('5. Deploy to production');
  console.log('\nSee SETUP_GUIDE.md for detailed instructions.');
}

if (require.main === module) {
  initializeProject().catch(console.error);
}

module.exports = { initializeProject };
