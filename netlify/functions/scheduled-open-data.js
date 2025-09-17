const { generateXML, generateMD5, generateCSV } = require('../../scripts/generateOpenData');

// Scheduled function to run daily at 3:00 AM UTC
exports.handler = async (event, context) => {
  try {
    console.log('Starting scheduled open data generation...');
    
    // Generate the files
    const csv = generateCSV();
    const xml = generateXML();
    const md5 = generateMD5(xml);
    
    console.log('Open data files generated successfully');
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Open data files generated successfully',
        timestamp: new Date().toISOString(),
        files: {
          csv: csv.filename,
          xml: 'dataset.xml',
          md5: 'dataset.md5'
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
