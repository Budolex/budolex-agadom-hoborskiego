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

  const filename = `Ceny-ofertowe-mieszkan-dewelopera-${projectConfig.developer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${dateStr}.csv`;
  
  return {
    content: csvContent,
    filename: filename,
    url: `${projectConfig.site.url}/${filename}`
  };
}

function generateXML() {
  const today = new Date();
  const dateStr = formatDate(today);
  const csv = generateCSV();
  
  // Generate resource ID for today's CSV
  const resourceId = `${projectConfig.openData.datasetId.substring(0, 30)}_${dateStr.replace(/-/g, '')}`;
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<datasets xmlns="http://www.dane.gov.pl/schemas/datasets"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.dane.gov.pl/schemas/datasets https://www.dane.gov.pl/static/xml/otwarte_dane_latest.xsd">
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
    <categories>
      <category>ECON</category>
    </categories>
    <url>${projectConfig.site.url}</url>
    <updateFrequency>daily</updateFrequency>
    <hasDynamicData>false</hasDynamicData>
    <hasHighValueData>true</hasHighValueData>
    <hasHighValueDataFromEuropeanCommissionList>false</hasHighValueDataFromEuropeanCommissionList>
    <hasResearchData>false</hasResearchData>
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
  </dataset>
</datasets>`;

  return xml;
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
  
  const outputDir = path.join(__dirname, '../static/open-data');
  ensureDirectoryExists(outputDir);
  
  // Generate CSV
  const csv = generateCSV();
  const csvPath = path.join(outputDir, csv.filename);
  fs.writeFileSync(csvPath, csv.content);
  console.log(`CSV generated: ${csvPath}`);
  
  // Generate XML
  const xml = generateXML();
  const xmlPath = path.join(outputDir, 'dataset.xml');
  fs.writeFileSync(xmlPath, xml);
  console.log(`XML generated: ${xmlPath}`);
  
  // Generate MD5
  const md5Hash = generateMD5(xml);
  const md5Path = path.join(outputDir, 'dataset.md5');
  fs.writeFileSync(md5Path, md5Hash);
  console.log(`MD5 generated: ${md5Path}`);
  
  console.log('Open data generation completed successfully!');
  console.log(`Dataset ID: ${projectConfig.openData.datasetId}`);
  console.log(`CSV URL: ${csv.url}`);
  console.log(`XML URL: ${projectConfig.site.url}/dataset.xml`);
  console.log(`MD5 URL: ${projectConfig.site.url}/dataset.md5`);
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
