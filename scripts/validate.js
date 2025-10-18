#!/usr/bin/env node

/**
 * Real Estate Template Validation Script
 * Checks configuration and files before deployment
 */

const fs = require('fs');
const path = require('path');

class TemplateValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.configPath = path.join(__dirname, '../config/project.json');
    this.unitsPath = path.join(__dirname, '../static/data/units.json');
    this.imagesPath = path.join(__dirname, '../static/images');
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  error(message) {
    this.errors.push(message);
    this.log('error', message);
  }

  warning(message) {
    this.warnings.push(message);
    this.log('warning', message);
  }

  success(message) {
    this.log('success', message);
  }

  validateConfig() {
    this.log('info', 'Validating project configuration...');
    
    if (!fs.existsSync(this.configPath)) {
      this.error('config/project.json not found');
      return false;
    }

    let config;
    try {
      config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    } catch (e) {
      this.error('Invalid JSON in config/project.json');
      return false;
    }

    // Check required sections
    const requiredSections = ['project', 'developer', 'site', 'openData'];
    for (const section of requiredSections) {
      if (!config[section]) {
        this.error(`Missing section: ${section}`);
      }
    }

    // Validate project section
    if (config.project) {
      const required = ['name', 'subtitle', 'location', 'address'];
      for (const field of required) {
        if (!config.project[field]) {
          this.error(`Missing project.${field}`);
        }
      }
    }

    // Validate developer section
    if (config.developer) {
      const required = ['name', 'nip', 'regon', 'krs', 'phone', 'email'];
      for (const field of required) {
        if (!config.developer[field]) {
          this.error(`Missing developer.${field}`);
        }
      }

      // Validate NIP format (10 digits)
      if (config.developer.nip && !/^\d{10}$/.test(config.developer.nip)) {
        this.error('NIP must be 10 digits');
      }

      // Validate REGON format (9 or 14 digits)
      if (config.developer.regon && !/^\d{9}$|^\d{14}$/.test(config.developer.regon)) {
        this.error('REGON must be 9 or 14 digits');
      }

      // Validate email format
      if (config.developer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.developer.email)) {
        this.error('Invalid email format');
      }

      // Validate phone format
      if (config.developer.phone && !/^\+48\s?\d{3}\s?\d{3}\s?\d{3}$/.test(config.developer.phone)) {
        this.warning('Phone format should be +48 XXX XXX XXX');
      }
    }

    // Validate site section
    if (config.site) {
      if (!config.site.url) {
        this.error('Missing site.url');
      } else if (!config.site.url.startsWith('http')) {
        this.error('site.url must start with http:// or https://');
      }
    }

    return this.errors.length === 0;
  }

  validateUnits() {
    this.log('info', 'Validating units data...');
    
    if (!fs.existsSync(this.unitsPath)) {
      this.error('static/data/units.json not found');
      return false;
    }

    let units;
    try {
      units = JSON.parse(fs.readFileSync(this.unitsPath, 'utf8'));
    } catch (e) {
      this.error('Invalid JSON in static/data/units.json');
      return false;
    }

    if (!Array.isArray(units) || units.length === 0) {
      this.error('Units data must be a non-empty array');
      return false;
    }

    // Validate each unit
    const requiredFields = ['id', 'name', 'area', 'rooms', 'price', 'pricePerM2', 'status', 'currency', 'vatRate'];
    const optionalFields = ['totalArea', 'belongingRoom', 'conditioning', 'standard'];
    const validStatuses = ['available', 'sold', 'reserved'];

    units.forEach((unit, index) => {
      for (const field of requiredFields) {
        if (unit[field] === undefined || unit[field] === null || unit[field] === '') {
          this.error(`Unit ${index + 1}: Missing ${field}`);
        }
      }

      // Validate status
      if (unit.status && !validStatuses.includes(unit.status)) {
        this.error(`Unit ${index + 1}: Invalid status '${unit.status}'. Must be: ${validStatuses.join(', ')}`);
      }

      // Validate numeric fields
      if (unit.area && (isNaN(unit.area) || unit.area <= 0)) {
        this.error(`Unit ${index + 1}: Area must be a positive number`);
      }

      if (unit.price && (isNaN(unit.price) || unit.price <= 0)) {
        this.error(`Unit ${index + 1}: Price must be a positive number`);
      }

      if (unit.pricePerM2 && (isNaN(unit.pricePerM2) || unit.pricePerM2 <= 0)) {
        this.error(`Unit ${index + 1}: Price per m² must be a positive number`);
      }

      // Validate price calculation
      if (unit.area && unit.price && unit.pricePerM2) {
        const calculatedPricePerM2 = unit.price / unit.area;
        const diff = Math.abs(calculatedPricePerM2 - unit.pricePerM2);
        if (diff > 1) { // Allow 1 PLN difference for rounding
          this.warning(`Unit ${index + 1}: Price per m² calculation mismatch (${calculatedPricePerM2.toFixed(2)} vs ${unit.pricePerM2})`);
        }
      }

      // Check for duplicate IDs
      const duplicateId = units.find((other, otherIndex) => 
        otherIndex !== index && other.id === unit.id
      );
      if (duplicateId) {
        this.error(`Duplicate unit ID: ${unit.id}`);
      }
    });

    return this.errors.length === 0;
  }

  validateImages() {
    this.log('info', 'Validating images...');
    
    if (!fs.existsSync(this.imagesPath)) {
      this.error('static/images directory not found');
      return false;
    }

    // Load config to check image references
    let config;
    try {
      config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    } catch (e) {
      this.warning('Cannot validate image references - config file invalid');
      return true;
    }

    // Check referenced images exist
    const imagesToCheck = [];
    
    if (config.project?.heroImage) {
      imagesToCheck.push(config.project.heroImage);
    }
    
    if (config.developer?.logo) {
      imagesToCheck.push(config.developer.logo);
    }
    
    if (config.project?.gallery) {
      imagesToCheck.push(...config.project.gallery);
    }

    // Check unit floor plans
    try {
      const units = JSON.parse(fs.readFileSync(this.unitsPath, 'utf8'));
      units.forEach(unit => {
        if (unit.floorPlan) {
          imagesToCheck.push(unit.floorPlan);
        }
      });
    } catch (e) {
      // Units validation will catch this
    }

    // Verify images exist
    imagesToCheck.forEach(imagePath => {
      const fullPath = path.join(__dirname, '../static', imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
      if (!fs.existsSync(fullPath)) {
        this.warning(`Referenced image not found: ${imagePath}`);
      }
    });

    // Check for common required images
    const commonImages = [
      'images/hero.jpg',
      'images/logo.png',
      'images/favicon.ico'
    ];

    commonImages.forEach(imagePath => {
      const fullPath = path.join(__dirname, '../static', imagePath);
      if (!fs.existsSync(fullPath)) {
        this.warning(`Common image not found: ${imagePath}`);
      }
    });

    return true;
  }

  validateOpenDataGeneration() {
    this.log('info', 'Testing open data generation...');
    
    try {
      const generateScript = path.join(__dirname, 'generateOpenData.js');
      if (!fs.existsSync(generateScript)) {
        this.error('generateOpenData.js script not found');
        return false;
      }

      // Try to require and run the generation
      const { generateCSV, generateXML } = require('./generateOpenData.js');
      
      const csv = generateCSV();
      if (!csv || !csv.content || !csv.filename) {
        this.error('CSV generation failed');
        return false;
      }

      const xml = generateXML();
      if (!xml || !xml.content || !xml.content.includes('<?xml')) {
        this.error('XML generation failed');
        return false;
      }

      this.success('Open data generation test passed');
      return true;
    } catch (e) {
      this.error(`Open data generation failed: ${e.message}`);
      return false;
    }
  }

  async validate() {
    console.log('🏠 Real Estate Template Validator');
    console.log('==================================\n');

    const configValid = this.validateConfig();
    const unitsValid = this.validateUnits();
    const imagesValid = this.validateImages();
    const openDataValid = this.validateOpenDataGeneration();

    console.log('\n' + '='.repeat(50));
    console.log('VALIDATION SUMMARY');
    console.log('='.repeat(50));

    if (this.errors.length === 0) {
      console.log('✅ Template validation PASSED');
      console.log(`✅ ${this.warnings.length === 0 ? 'No' : this.warnings.length} warning(s)`);
      
      if (this.warnings.length > 0) {
        console.log('\nWarnings (recommended to fix):');
        this.warnings.forEach((warning, i) => {
          console.log(`  ${i + 1}. ${warning}`);
        });
      }
      
      console.log('\n🚀 Template is ready for deployment!');
      return true;
    } else {
      console.log('❌ Template validation FAILED');
      console.log(`❌ ${this.errors.length} error(s) found`);
      console.log(`⚠️  ${this.warnings.length} warning(s) found`);
      
      console.log('\nErrors (must fix):');
      this.errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
      
      if (this.warnings.length > 0) {
        console.log('\nWarnings (recommended to fix):');
        this.warnings.forEach((warning, i) => {
          console.log(`  ${i + 1}. ${warning}`);
        });
      }
      
      console.log('\n🔧 Please fix the errors above before deploying.');
      return false;
    }
  }
}

async function main() {
  const validator = new TemplateValidator();
  const isValid = await validator.validate();
  process.exit(isValid ? 0 : 1);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { TemplateValidator };
