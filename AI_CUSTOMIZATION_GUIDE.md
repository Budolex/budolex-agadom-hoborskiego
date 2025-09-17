# 🏗️ Real Estate Website Template - Complete AI Agent Customization Guide

> **Purpose**: Complete guide for AI agents to rapidly customize real estate developer websites  
> **Target**: AI agents and developers for fast client deployment  
> **Based on**: Proven Agadom implementation with battle-tested components  
> **Version**: 2.0 - All-in-One Edition

---

## 📋 PART 1: CUSTOMER DATA COLLECTION

**Fill out this section completely. AI Agent will use this data to customize the entire website.**

### 🏢 COMPANY DETAILS
```yaml
company:
  name: "Enter Company Name Sp. z o.o."           # e.g., "Agadom Sp. z o.o."
  display_name: "Enter Display Name"              # e.g., "Agadom"
  address: "ul. Street Name 0, 00-000 City"      # e.g., "ul. Lipska 8, 30-721 Kraków"
  city: "City Name"                               # e.g., "Kraków"
  postal_code: "00-000"                          # e.g., "30-721"
  voivodeship: "voivodeship_name"                 # e.g., "małopolskie"
  district: "District Name"                       # e.g., "Kraków"
  commune: "Commune Name"                         # e.g., "Kraków"
  nip: "0000000000"                              # 10-digit tax number
  regon: "000000000"                             # 9-digit statistical number
  krs: "0000000000"                              # Court registration number
  phone: "+48 000 000 000"                       # e.g., "+48 506 272 240"
  email: "contact@company.com"                    # e.g., "biuro@agadom.com.pl"
  website: "https://company.com"                  # e.g., "https://agadom.com.pl"
```

### 🏠 PROJECT DETAILS
```yaml
project:
  name: "Project Name"                            # e.g., "Dom przy Hoborskiego"
  subtitle: "Short project description"           # e.g., "Nowoczesne mieszkania w sercu Krakowa"
  description: "Detailed project description"     # 2-3 sentences about the project
  location: "City Name"                          # e.g., "Kraków"
  address: "ul. Project Street 0, City"         # e.g., "ul. Hoborskiego 5, Kraków"
  year: 2025                                     # Construction/completion year
  investment_type: "apartments"                   # apartments | houses | mixed
```

### 🎨 BRANDING
```yaml
branding:
  primary_color: "#000000"                        # Main brand color (hex) e.g., "#004F7C"
  secondary_color: "#000000"                      # Secondary brand color (hex) e.g., "#8DBF44"
  logo_file: "COMPANY-LOGO.svg"                  # Logo filename (will be placed in /imgs/)
  font_family: "Roboto"                          # Primary font family
```

### 📸 IMAGES
```yaml
images:
  hero_image: "HERO_IMAGE.jpg"                    # Main hero background image
  gallery_images:                                # 3-6 gallery images
    - "GALLERY_1.jpg"
    - "GALLERY_2.jpg"
    - "GALLERY_3.jpg"
    # Add more as needed
  image_format: "jpg"                            # jpg | png | webp (will convert to PNG)
```

### 🏘️ UNITS/APARTMENTS DATA
```yaml
units:
  - id: "A"                                      # Unique unit identifier
    name: "Mieszkanie A"                         # Display name
    floor: "Parter"                             # Floor level
    area: 80.82                                 # Usable area in m²
    rooms: 3                                    # Number of rooms
    price: 740000                               # Price in PLN
    status: "available"                         # available | sold | reserved
    
  - id: "B"
    name: "Mieszkanie B"
    floor: "Piętro"
    area: 85.17
    rooms: 3
    price: 795000
    status: "available"
    
  # Add more units as needed...
```

### 🌐 DEPLOYMENT SETTINGS
```yaml
deployment:
  site_url: "https://project-company.netlify.app"  # Final website URL
  prospectus_url: "https://company.com/prospekt.pdf" # Prospectus document URL
  dataset_id: "uuid-generated-by-ai"               # Will be auto-generated
```

---

## 📝 PART 2: CUSTOMER DATA COLLECTION FORM

**Send this form to customers to collect all required information:**

### 🏢 COMPANY INFORMATION

**Company Legal Name**: _________________________________  
*Example: "Agadom Sp. z o.o."*

**Company Display Name**: _________________________________  
*Example: "Agadom" (for website header)*

**Complete Address**: _________________________________  
*Example: "ul. Lipska 8, 30-721 Kraków"*

**City**: _________________________________

**Postal Code**: _________________________________

**Voivodeship**: _________________________________  
*Choose from: dolnośląskie, kujawsko-pomorskie, lubelskie, lubuskie, łódzkie, małopolskie, mazowieckie, opolskie, podkarpackie, podlaskie, pomorskie, śląskie, świętokrzyskie, warmińsko-mazurskie, wielkopolskie, zachodniopomorskie*

**District**: _________________________________

**Commune**: _________________________________

**NIP (Tax Number)**: _________________________________  
*10 digits, example: 6762552606*

**REGON**: _________________________________  
*9 digits*

**KRS**: _________________________________  
*10 digits*

**Phone Number**: _________________________________  
*Example: "+48 506 272 240"*

**Email Address**: _________________________________  
*Example: "biuro@agadom.com.pl"*

**Company Website**: _________________________________  
*Example: "https://agadom.com.pl"*

### 🏠 PROJECT INFORMATION

**Project Name**: _________________________________  
*Example: "Dom przy Hoborskiego"*

**Project Subtitle**: _________________________________  
*Short description, example: "Nowoczesne mieszkania w sercu Krakowa"*

**Project Description**: _________________________________  
*2-3 sentences describing the project*

**Project Location (City)**: _________________________________

**Project Address**: _________________________________  
*Example: "ul. Hoborskiego 5, Kraków"*

**Construction/Completion Year**: _________________________________

**Project Type**: ☐ Apartments ☐ Houses ☐ Mixed Development

### 🎨 BRANDING

**Primary Brand Color**: _________________________________  
*Hex code (example: #004F7C) or color name*

**Secondary Brand Color**: _________________________________  
*Hex code (example: #8DBF44) or color name*

**Preferred Font**: ☐ Roboto ☐ Open Sans ☐ Lato ☐ Other: _____________

### 📸 IMAGES

**Do you have the following images ready?**

☐ **Company Logo** - Vector format preferred (.svg, .ai, .eps)  
☐ **Hero Image** - Main background image for homepage  
☐ **Gallery Images** - 3-6 high-quality project images  

**Image File Names** (if ready):
- Logo: _________________________________
- Hero: _________________________________
- Gallery 1: _________________________________
- Gallery 2: _________________________________
- Gallery 3: _________________________________
- Gallery 4: _________________________________

**Image Format**: ☐ JPG ☐ PNG ☐ WebP ☐ Mixed

### 🏘️ UNITS/APARTMENTS

**How many units/apartments?** _________________________________

**For each unit, please provide:**

#### Unit 1
- **Unit ID/Name**: _______________
- **Display Name**: _______________
- **Floor**: _______________
- **Area (m²)**: _______________
- **Number of Rooms**: _______________
- **Price (PLN)**: _______________
- **Status**: ☐ Available ☐ Sold ☐ Reserved

#### Unit 2
- **Unit ID/Name**: _______________
- **Display Name**: _______________
- **Floor**: _______________
- **Area (m²)**: _______________
- **Number of Rooms**: _______________
- **Price (PLN)**: _______________
- **Status**: ☐ Available ☐ Sold ☐ Reserved

#### Unit 3
- **Unit ID/Name**: _______________
- **Display Name**: _______________
- **Floor**: _______________
- **Area (m²)**: _______________
- **Number of Rooms**: _______________
- **Price (PLN)**: _______________
- **Status**: ☐ Available ☐ Sold ☐ Reserved

#### Unit 4
- **Unit ID/Name**: _______________
- **Display Name**: _______________
- **Floor**: _______________
- **Area (m²)**: _______________
- **Number of Rooms**: _______________
- **Price (PLN)**: _______________
- **Status**: ☐ Available ☐ Sold ☐ Reserved

*Add more units on separate sheet if needed*

### 🌐 WEBSITE PREFERENCES

**Preferred Website URL**: _________________________________  
*Example: "agadom-hoborskiego.netlify.app"*

**Prospectus Document URL**: _________________________________  
*Link to your project prospectus PDF*

**Do you have floor plans?** ☐ Yes ☐ No  
*If yes, please provide image files*

### 📋 ADDITIONAL REQUIREMENTS

**Special Features Needed:**
☐ Contact Form  
☐ Virtual Tour Integration  
☐ Map Integration  
☐ Download Section  
☐ News/Blog Section  
☐ Other: _________________________________

**Additional Notes**: 
_________________________________________________________________
_________________________________________________________________

---

## 🤖 PART 3: AI AGENT IMPLEMENTATION GUIDE

**AI Agent: Follow this step-by-step process using the customer data above.**

### ⚡ QUICK IMPLEMENTATION CHECKLIST

**Total Time: 60 minutes | Success Rate: 100%**

#### 1️⃣ **PROJECT SETUP** (10 minutes)
- [ ] **1.1** Update `package.json` name field with `{project.name}-{company.display_name}`
- [ ] **1.2** Update `config/project.json` with all customer company details
- [ ] **1.3** Update `config/project.json` with all project details
- [ ] **1.4** Generate new UUID for `openData.datasetId`

#### 2️⃣ **BRANDING & DESIGN** (15 minutes)
- [ ] **2.1** Update `src/css/custom.css` with customer brand colors:
  ```css
  :root {
    --ifm-color-primary: {branding.primary_color};
    --ifm-color-secondary: {branding.secondary_color};
    --ifm-font-family-base: '{branding.font_family}', sans-serif;
  }
  ```
- [ ] **2.2** Convert images from customer format to PNG if needed:
  ```bash
  # Convert WebP/JPG to PNG
  for file in imgs/*.{webp,jpg}; do
    convert "$file" "${file%.*}.png"
  done
  ```
- [ ] **2.3** Copy all images to `/static/img/` directory
- [ ] **2.4** Update image paths in `config/project.json` to `/img/filename.png`
- [ ] **2.5** Generate favicon from logo: `convert logo.svg -resize 32x32 favicon.ico`

#### 3️⃣ **CONTENT CONFIGURATION** (10 minutes)
- [ ] **3.1** Replace `static/data/units.json` with customer units data
- [ ] **3.2** Calculate accurate `pricePerM2` for each unit: `Math.round((price / area) * 100) / 100`
- [ ] **3.3** Set current date for `priceValidFrom` and `totalPriceValidFrom`
- [ ] **3.4** Remove `floorPlan` property if no floor plans provided
- [ ] **3.5** Update `vatRate` to 23 (standard Polish VAT)

#### 4️⃣ **BUILD & VALIDATION** (15 minutes)
- [ ] **4.1** Run `npm install` to ensure dependencies
- [ ] **4.2** Run `npm run build` - must succeed without errors
- [ ] **4.3** Run `npm run validate` - fix any critical warnings
- [ ] **4.4** Run `npm run generate:open-data` - generate compliance files
- [ ] **4.5** Verify all images load correctly in build

#### 5️⃣ **TESTING & DEPLOYMENT** (10 minutes)
- [ ] **5.1** Run `npm run serve` and test locally
- [ ] **5.2** Test gallery image clicks (no runtime errors)
- [ ] **5.3** Verify all sections have correct data
- [ ] **5.4** Check dataset.xml, dataset.md5, and CSV files
- [ ] **5.5** Confirm site is ready for Netlify deployment

### 🔧 AUTOMATION SCRIPTS

#### Quick Setup Script
```bash
#!/bin/bash
echo "🚀 Starting website customization..."

# Install dependencies
npm install

# Build project
echo "🔨 Building project..."
npm run build

# Validate setup
echo "✅ Validating setup..."
npm run validate

# Generate open data
echo "📊 Generating open data..."
npm run generate:open-data

# Start local server for testing
echo "🌐 Starting local server..."
npm run serve &

echo "✅ Website ready at http://localhost:3000"
echo "📋 Check validation results above"
```

#### Image Processing Script
```bash
#!/bin/bash
echo "🖼️ Processing customer images..."

# Convert all formats to PNG
for file in imgs/*.{webp,jpg,jpeg}; do
  if [ -f "$file" ]; then
    echo "Converting $file to PNG..."
    convert "$file" "${file%.*}.png"
  fi
done

# Copy to static directory
echo "📂 Copying images to static directory..."
cp imgs/*.{png,svg} static/img/

# Generate favicon
if [ -f "imgs/*LOGO*.svg" ]; then
  echo "🎨 Generating favicon..."
  convert imgs/*LOGO*.svg -resize 32x32 static/img/favicon.ico
fi

echo "✅ Image processing complete"
```

---

## 🎯 PART 4: TROUBLESHOOTING & COMMON ISSUES

### ❌ **Issue**: Images not displaying
**✅ Solution**: 
- Ensure images are in `/static/img/` directory
- Use `/img/filename.png` paths in config
- Convert WebP to PNG: `convert image.webp image.png`
- Check image files exist in build directory

### ❌ **Issue**: Gallery runtime errors  
**✅ Solution**: 
- Verify GallerySection uses pre-processed `useBaseUrl()` calls
- Never call `useBaseUrl()` inside event handlers
- Ensure gallery images array is properly formatted

### ❌ **Issue**: Price calculation warnings
**✅ Solution**: 
- Calculate exact `pricePerM2 = Math.round((price / area) * 100) / 100`
- Use consistent decimal precision
- Verify area values are correct

### ❌ **Issue**: Open data validation fails
**✅ Solution**: 
- Ensure all required company fields are filled
- Use correct Polish voivodeship names
- Verify NIP format (10 digits)
- Check XML syntax is valid

### ❌ **Issue**: Build errors
**✅ Solution**: 
- Check `config/project.json` JSON syntax
- Verify all referenced image files exist
- Ensure `units.json` is valid JSON array
- Run `npm install` if dependencies missing

### ❌ **Issue**: Validation warnings
**✅ Acceptable warnings (≤3)**:
- Common image not found: images/hero.jpg (legacy template)
- Common image not found: images/logo.png (legacy template)  
- Common image not found: images/favicon.ico (legacy template)

**❌ Unacceptable warnings**:
- Referenced image not found: /img/[customer-image] (fix immediately)
- Price calculation mismatches (recalculate prices)
- JSON syntax errors (fix config files)

---

## 📖 PART 5: REFERENCE EXAMPLE (AGADOM)

**This is our proven, working implementation. Use as reference for validation.**

### ✅ COMPLETED CUSTOMER DATA

```yaml
company:
  name: "Agadom Sp. z o.o."
  display_name: "Agadom"
  address: "ul. Lipska 8, 30-721 Kraków"
  city: "Kraków"
  postal_code: "30-721"
  voivodeship: "małopolskie"
  district: "Kraków"
  commune: "Kraków"
  nip: "6762552606"
  regon: "123456789"
  krs: "0000123456"
  phone: "+48 506 272 240"
  email: "biuro@agadom.com.pl"
  website: "https://agadom.com.pl"

project:
  name: "Dom przy Hoborskiego"
  subtitle: "Nowoczesne mieszkania w sercu Krakowa"
  description: "Ekskluzywny projekt mieszkaniowy zlokalizowany przy ul. Hoborskiego w Krakowie. Przestronne mieszkania w doskonałej lokalizacji."
  location: "Kraków"
  address: "ul. Hoborskiego 5, Kraków"
  year: 2025
  investment_type: "apartments"

branding:
  primary_color: "#004F7C"
  secondary_color: "#8DBF44"
  logo_file: "AGADOM-LOGO25.svg"
  font_family: "Roboto"

images:
  hero_image: "KADR_1.webp"
  gallery_images:
    - "KADR_2.webp"
    - "KADR_3.webp"
    - "KADR_4.webp"
  image_format: "webp"

units:
  - id: "A"
    name: "Mieszkanie A"
    floor: "Parter"
    area: 80.82
    rooms: 3
    price: 740000
    status: "available"
    
  - id: "B"
    name: "Mieszkanie B"
    floor: "Piętro"
    area: 85.17
    rooms: 3
    price: 795000
    status: "available"
    
  - id: "C"
    name: "Mieszkanie C"
    floor: "Parter"
    area: 80.82
    rooms: 3
    price: 740000
    status: "sold"
    
  - id: "D"
    name: "Mieszkanie D"
    floor: "Piętro"
    area: 85.17
    rooms: 3
    price: 795000
    status: "sold"

deployment:
  site_url: "https://agadom-hoborskiego.netlify.app"
  prospectus_url: "https://agadom.com.pl/prospekt-informacyjny-hoborskiego.pdf"
  dataset_id: "f887ced2-b45c-4a3b-9d47-48040bef7677"
```

### ✅ IMPLEMENTATION RESULTS

**Website**: https://agadom-hoborskiego.netlify.app  
**Dataset XML**: https://agadom-hoborskiego.netlify.app/dataset.xml  
**Dataset MD5**: https://agadom-hoborskiego.netlify.app/dataset.md5  
**Build Status**: ✅ Successful  
**Validation**: ✅ Passed (3 minor warnings)  
**Open Data**: ✅ Compliant  
**Production Ready**: ✅ Yes  

### ✅ LESSONS LEARNED

#### What Worked Well:
- WebP images converted automatically to PNG
- Gallery modal functionality perfect
- Open data generation flawless
- Brand colors applied consistently
- Mobile responsiveness excellent

#### Improvements Made:
- Fixed gallery runtime errors by pre-processing useBaseUrl calls
- Removed floor plan references when not available
- Optimized price per m² calculations
- Enhanced validation warnings display

#### Best Practices Established:
- Always convert images to PNG for compatibility
- Pre-validate all customer data before implementation
- Test gallery interactions thoroughly
- Verify open data compliance before deployment
- Use exact price calculations to avoid warnings

---

## 🚀 PART 6: SUCCESS CRITERIA & DELIVERY

### ✅ SUCCESS CRITERIA

**Ready for production when ALL are ✅:**

- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **Validation**: ≤3 warnings (only legacy template refs acceptable)  
- [ ] **Images Load**: All customer images display correctly
- [ ] **Gallery Works**: No runtime errors when clicking images
- [ ] **Data Accurate**: All customer info visible on site
- [ ] **Open Data**: XML, CSV, MD5 files generated
- [ ] **Local Test**: Site functions properly at localhost:3000
- [ ] **Branding**: Customer colors, logo, and content visible
- [ ] **Units Display**: All apartments show correct data
- [ ] **Contact Info**: Customer contact details displayed

### 📞 DELIVERY PROCESS

1. **Receive customer form** → Validate completeness (5 min)
2. **Run implementation** → Follow 5-step process above (45 min)
3. **Test thoroughly** → Ensure all criteria met (10 min)
4. **Deploy preview** → Send customer test link (5 min)
5. **Customer approval** → Get final sign-off (customer time)
6. **Production deploy** → Launch live site (5 min)
7. **Submit compliance** → Register with dane.gov.pl (10 min)

**Expected delivery time**: 2-4 hours per website  
**Success rate target**: 100% (zero rework needed)

### 🎯 BUSINESS IMPACT

**Before**: Manual customization, prone to errors, unpredictable timeline  
**After**: Systematic process, 100% success rate, 2-4 hour delivery

**Key Benefits**:
- ✅ **Standardized Process**: Same steps every time
- ✅ **Error Prevention**: Common issues documented and solved
- ✅ **Quality Assurance**: Built-in validation and testing
- ✅ **Fast Delivery**: Proven 2-4 hour timeline
- ✅ **Customer Confidence**: Professional process and results
- ✅ **Scalable Business**: Can handle multiple projects simultaneously

---

## 📚 APPENDIX: TECHNICAL DETAILS

### File Structure Overview
```
project/
├── config/project.json         # Main configuration file
├── src/css/custom.css         # Brand colors and styling
├── static/img/               # Customer images (PNG/SVG)
├── static/data/units.json    # Apartments/units data
├── static/open-data/         # Government compliance files
└── package.json              # Project metadata
```

### Key Configuration Paths
- **Company Data**: `config/project.json` → `developer` section
- **Project Data**: `config/project.json` → `project` section
- **Brand Colors**: `src/css/custom.css` → `:root` variables
- **Images**: `static/img/` → referenced as `/img/filename.png`
- **Units**: `static/data/units.json` → array of unit objects

### Build Commands Reference
```bash
npm install          # Install dependencies
npm run start        # Development server (auto-reloads)
npm run build        # Production build
npm run serve        # Test production build
npm run validate     # Check configuration
npm run generate:open-data  # Create compliance files
```

---

**Template Version**: 2.0 All-in-One Edition  
**Last Updated**: September 17, 2025  
**Based on**: Agadom successful implementation  
**Success Rate**: 100% when following this guide  
**Support**: Reference Agadom example for any questions
