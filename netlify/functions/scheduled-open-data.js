const fs = require('fs');
const path = require('path');
const { generateXML, generateMD5, generateCSV } = require('../../scripts/generateOpenData');

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Scheduled function to run daily at 3:00 AM UTC
exports.handler = async (event, context) => {
  try {
    console.log('Starting scheduled open data generation...');
    
    const today = new Date();
    const dateStr = formatDate(today);
    const outputDir = path.join(__dirname, '../../static/open-data');
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Load project config for developer name
    const projectConfig = require('../../config/project.json');
    
    // Generate CSV with dated filename
    const csv = generateCSV();
    const csvPath = path.join(outputDir, csv.filename);
    fs.writeFileSync(csvPath, csv.content);
    console.log(`CSV written: ${csvPath}`);
    
    // Create clean alias
    const csvCleanPath = path.join(outputDir, csv.cleanFilename);
    fs.writeFileSync(csvCleanPath, csv.content);
    console.log(`CSV alias written: ${csvCleanPath}`);
    
    // Generate XML with dated filename
    const xml = generateXML();
    const xmlPath = path.join(outputDir, xml.filename);
    fs.writeFileSync(xmlPath, xml.content);
    console.log(`XML written: ${xmlPath}`);
    
    // Create clean alias for XML
    const xmlCleanPath = path.join(outputDir, xml.cleanFilename);
    fs.writeFileSync(xmlCleanPath, xml.content);
    console.log(`XML alias written: ${xmlCleanPath}`);
    
    // Generate MD5 with dated filename
    const md5Hash = generateMD5(xml.content);
    const md5Filename = `Ceny-ofertowe-mieszkan-dewelopera-${projectConfig.developer.name.replace(/[^a-zA-Z0-9]/g, '-')}-${dateStr}.md5`;
    const md5Path = path.join(outputDir, md5Filename);
    fs.writeFileSync(md5Path, md5Hash);
    console.log(`MD5 written: ${md5Path}`);
    
    // Create clean alias for MD5
    const md5CleanPath = path.join(outputDir, 'dataset.md5');
    fs.writeFileSync(md5CleanPath, md5Hash);
    console.log(`MD5 alias written: ${md5CleanPath}`);
    
    console.log('Open data files generated and saved successfully');
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Open data files generated successfully',
        timestamp: new Date().toISOString(),
        files: {
          csv: csv.filename,
          xml: xml.filename,
          md5: md5Filename,
          aliases: ['dataset.csv', 'dataset.xml', 'dataset.md5']
        }
      })
    };
  } catch (error) {
    console.error('Error generating open data files:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to generate open data files',
        message: error.message
      })
    };
  }
};

// Export the schedule configuration
exports.config = {
  schedule: '0 3 * * *' // Daily at 3:00 AM UTC
};
