const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Load configuration and data
const projectConfig = require('../config/project.json');
const unitsData = require('../static/data/units.json');

// Ensure dataset ID exists
if (!projectConfig.openData.datasetId || projectConfig.openData.datasetId === 'generated-uuid-will-be-here') {
  projectConfig.openData.datasetId = uuidv4();
  // Update the config file with generated UUID
  fs.writeFileSync(
    path.join(__dirname, '../config/project.json'),
    JSON.stringify(projectConfig, null, 2)
  );
  console.log('Generated new dataset ID:', projectConfig.openData.datasetId);
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateCSV() {
  const today = new Date();
  const dateStr = formatDate(today);
  
  const headers = [
    'LP',
    'Nazwa dewelopera',
    'Adres dewelopera',
    'Miasto dewelopera',
    'Kod pocztowy dewelopera',
    'Województwo dewelopera',
    'Powiat dewelopera',
    'Gmina dewelopera',
    'Nazwa inwestycji',
    'Adres inwestycji',
    'Miasto inwestycji',
    'Kod pocztowy inwestycji',
    'Województwo inwestycji',
    'Powiat inwestycji',
    'Gmina inwestycji',
    'Numer lokalu nadany przez dewelopera',
    'Piętro',
    'Liczba pokoi',
    'Powierzchnia użytkowa w m2',
    'Stawka VAT w %',
    'Waluta',
    'Cena za m2',
    'Data od której obowiązuje cena za m2',
    'Cena całkowita',
    'Data od której obowiązuje cena całkowita',
    'Link do prospektu informacyjnego'
  ];

  const rows = unitsData.map((unit, index) => [
    index + 1, // LP
    projectConfig.developer.name,
    projectConfig.developer.address,
    projectConfig.developer.city,
    projectConfig.developer.postalCode,
    projectConfig.developer.voivodeship,
    projectConfig.developer.district,
    projectConfig.developer.commune,
    projectConfig.project.name,
    projectConfig.project.address,
    projectConfig.project.location,
    projectConfig.developer.postalCode, // Assuming same postal code for project
    projectConfig.developer.voivodeship,
    projectConfig.developer.district,
    projectConfig.developer.commune,
    unit.id,
    unit.floor,
    unit.rooms,
    unit.totalArea || unit.area, // Use totalArea if available, otherwise area
    unit.vatRate,
    unit.currency,
    unit.pricePerM2,
    unit.priceValidFrom,
    unit.price,
    unit.totalPriceValidFrom,
    projectConfig.openData.prospectusUrl
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Use government-required dated filename format
  const dateStampedFilename = `Ceny-ofertowe-mieszkan-dewelopera-${projectConfig.developer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${dateStr}.csv`;
  
  return {
    content: csvContent,
    filename: dateStampedFilename,              // Primary: dated filename for dane.gov.pl
    cleanFilename: 'dataset.csv',               // Alias: clean URL that redirects to latest
    url: `${projectConfig.site.url}/Ceny-ofertowe-mieszkan-dewelopera-${projectConfig.developer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${dateStr}.csv`
  };
}

function generateXML() {
  const today = new Date();
  const dateStr = formatDate(today);
  const csv = generateCSV();
  
  // Generate resource ID for today's CSV (max 36 characters per XSD)
  // Format: first 27 chars of dataset ID + underscore + YYYYMMDD (8 chars) = 36 total
  const resourceId = `${projectConfig.openData.datasetId.substring(0, 27)}_${dateStr.replace(/-/g, '')}`;
  
  // XML filename with date
  const xmlFilename = `Ceny-ofertowe-mieszkan-dewelopera-${projectConfig.developer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${dateStr}.xml`;
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<od:datasets xmlns:od="urn:otwarte-dane:harvester:1.13"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="urn:otwarte-dane:harvester:1.13 https://dane.gov.pl/media/schemas/otwarte_dane_latest.xsd">
  <dataset status="published">
    <extIdent>${projectConfig.openData.datasetId}</extIdent>
    <title>
      <polish>Ceny ofertowe mieszkań dewelopera ${projectConfig.developer.name} w ${today.getFullYear()} r.</polish>
      <english>Offer prices of apartments from developer ${projectConfig.developer.name} in ${today.getFullYear()}</english>
    </title>
    <description>
      <polish>Ceny ofertowe lokali mieszkalnych lub domów jednorodzinnych zgodnie z art. 16a ust. 1 pkt 1 ustawy z dnia 16 września 2011 r. o ochronie praw nabywcy lokalu mieszkalnego lub domu jednorodzinnego</polish>
      <english>Offer prices of residential premises or single-family houses in accordance with art. 16a par. 1 point 1 of the Act of September 16, 2011 on the protection of the rights of buyers of residential premises or single-family houses</english>
    </description>
    <url>${projectConfig.site.url}</url>
    <updateFrequency>daily</updateFrequency>
    <categories>
      <category>ECON</category>
    </categories>
    <resources>
      <resource status="published">
        <extIdent>${resourceId}</extIdent>
        <url>${csv.url}</url>
        <title>
          <polish>Ceny ofertowe mieszkań dewelopera ${projectConfig.developer.name} z dnia ${dateStr}</polish>
          <english>Offer prices of apartments from developer ${projectConfig.developer.name} from ${dateStr}</english>
        </title>
        <description>
          <polish>Cennik mieszkań z dnia ${dateStr}</polish>
          <english>Price list of apartments from ${dateStr}</english>
        </description>
        <availability>local</availability>
        <dataDate>${dateStr}</dataDate>
        <hasDynamicData>false</hasDynamicData>
        <hasHighValueData>true</hasHighValueData>
        <hasHighValueDataFromEuropeanCommissionList>false</hasHighValueDataFromEuropeanCommissionList>
        <hasResearchData>false</hasResearchData>
        <containsProtectedData>false</containsProtectedData>
      </resource>
    </resources>
    <tags>
      <tag lang="pl">Deweloper</tag>
      <tag lang="pl">Mieszkania</tag>
      <tag lang="pl">Ceny</tag>
      <tag lang="en">Developer</tag>
      <tag lang="en">Apartments</tag>
      <tag lang="en">Prices</tag>
    </tags>
    <hasDynamicData>false</hasDynamicData>
    <hasHighValueData>true</hasHighValueData>
    <hasHighValueDataFromEuropeanCommissionList>false</hasHighValueDataFromEuropeanCommissionList>
    <hasResearchData>false</hasResearchData>
  </dataset>
</od:datasets>`;

  return {
    content: xml,
    filename: xmlFilename,
    cleanFilename: 'dataset.xml'
  };
}

function generateMD5(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function main() {
  console.log('Generating open data files...');
  
  const today = new Date();
  const dateStr = formatDate(today);
  const outputDir = path.join(__dirname, '../static/open-data');
  ensureDirectoryExists(outputDir);
  
  // Generate CSV with dated filename
  const csv = generateCSV();
  const csvPath = path.join(outputDir, csv.filename);
  fs.writeFileSync(csvPath, csv.content);
  console.log(`CSV generated: ${csvPath}`);
  
  // Create clean alias (symlink or copy for latest)
  const csvCleanPath = path.join(outputDir, csv.cleanFilename);
  fs.writeFileSync(csvCleanPath, csv.content);
  console.log(`CSV alias: ${csvCleanPath} -> ${csv.filename}`);
  
  // Generate XML with dated filename
  const xml = generateXML();
  const xmlPath = path.join(outputDir, xml.filename);
  fs.writeFileSync(xmlPath, xml.content);
  console.log(`XML generated: ${xmlPath}`);
  
  // Create clean alias for XML
  const xmlCleanPath = path.join(outputDir, xml.cleanFilename);
  fs.writeFileSync(xmlCleanPath, xml.content);
  console.log(`XML alias: ${xmlCleanPath} -> ${xml.filename}`);
  
  // Generate MD5 with dated filename
  const md5Hash = generateMD5(xml.content);
  const md5Filename = `Ceny-ofertowe-mieszkan-dewelopera-${projectConfig.developer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${dateStr}.md5`;
  const md5Path = path.join(outputDir, md5Filename);
  fs.writeFileSync(md5Path, md5Hash);
  console.log(`MD5 generated: ${md5Path}`);
  
  // Create clean alias for MD5
  const md5CleanPath = path.join(outputDir, 'dataset.md5');
  fs.writeFileSync(md5CleanPath, md5Hash);
  console.log(`MD5 alias: ${md5CleanPath} -> ${md5Filename}`);
  
  console.log('Open data generation completed successfully!');
  console.log(`Dataset ID: ${projectConfig.openData.datasetId}`);
  console.log(`CSV URL: ${csv.url}`);
  console.log(`XML URL: ${projectConfig.site.url}/${xml.filename}`);
  console.log(`MD5 URL: ${projectConfig.site.url}/${md5Filename}`);
  console.log('');
  console.log('Clean aliases (always point to latest):');
  console.log(`CSV: ${projectConfig.site.url}/dataset.csv`);
  console.log(`XML: ${projectConfig.site.url}/dataset.xml`);
  console.log(`MD5: ${projectConfig.site.url}/dataset.md5`);
}

if (require.main === module) {
  main();
}

module.exports = {
  generateCSV,
  generateXML,
  generateMD5,
  main
};
