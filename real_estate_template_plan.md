# Real Estate Developer Website Template Working Plan

## Objective
Create a reusable and customizable website template (built with Docusaurus) that allows rapid deployment of legally compliant, one-page real estate project websites for developers in Poland. The template should:

- Allow fast branding and content substitution (logo, project name, unit data, images)
- Automatically generate XML + MD5 files for dane.gov.pl
- Use a single JSON/YAML config to drive content and open-data generation
- Be easily deployable (e.g., via Netlify or Vercel)
- Match the modern, clean aesthetic of sites like agadom.com.pl, borowinowavita.pl

This template will be the base to quickly launch new sites for other clients like Agadom, with minimal configuration.

---

## Template Features

### Visual Structure
- One-page layout
- Responsive, clean design (desktop and mobile)
- Sections:
  - Hero with project name and main image
  - Project description section (optional icons or image list)
  - Unit listing (grid or table): name, area, price, status, floor plan
  - Image gallery
  - Map/location section (optional)
  - Contact info (or link to external contact page)

### Configurable Content
- `site.config.js` or `project.json` will hold:
  - Project name, location
  - Units: id, area, price, rooms, status, image
  - Developer info (name, REGON, NIP, etc.)
  - Image and logo paths
- Supports Polish-language frontend (default), content translatable
- Easy updates by editing one config file

### Open Data Compliance
- `generateOpenData.js` script generates:
  - `Ceny-ofertowe-<developer>-<YYYY-MM-DD>.csv`
  - `dataset.xml` with all metadata and resource entries
  - `dataset.md5` file (checksum of XML)
- Script uses `units.json` as source-of-truth
- Supports both static output (saved to `static/open-data/`) and Netlify Functions
- Schema matches dane.gov.pl importer v1.0.3

### Deployment Ready
- Netlify/Vercel compatibility out of the box
- Scheduled update option:
  - GitHub Action (`.github/workflows/daily-update.yml`) or
  - Netlify Scheduled Function (if persistence not required)
- Redirects to serve XML/MD5 at clean URLs (e.g., `/dataset.xml`)
- Continuous deployment via Git push

---

## Project File Structure (Template)
```
real-estate-template/
├── docusaurus.config.js
├── netlify.toml
├── package.json
├── static/
│   ├── images/
│   ├── open-data/
│   └── data/
│       └── units.json
├── src/
│   ├── pages/
│   │   └── index.js
│   ├── components/
│   │   ├── HeroSection.js
│   │   ├── PricingTable.js
│   │   └── ContactSection.js
│   └── css/
│       └── custom.css
├── scripts/
│   └── generateOpenData.js
└── netlify/functions/
    └── generate-xml.js
    └── generate-md5.js
```

---

## Setup Steps for New Client
1. **Clone Template Repo**
2. **Customize Content:**
   - Replace logo and images in `static/images`
   - Update `units.json` with new project units
   - Update project and developer info in config file
3. **Test Locally:**
   - Run `npm run start` to preview site
   - Run `npm run generate:open-data` to create XML/CSV
4. **Deploy to Netlify or Vercel**
   - Connect repo
   - Configure `build` and `publish` paths
   - Enable GitHub Action (for daily updates) or setup scheduled Netlify Function
5. **Submit XML & MD5 URLs to dane.gov.pl**

---

## Developer Notes
- XML generation relies on `units.json` + static project metadata
- New unit prices must update `units.json` **before 4:00 AM** for daily run
- Design is responsive but can be further themed with Tailwind or Infima overrides
- Optional: add CMS (e.g., Netlify CMS) for non-technical editors
- Validate XML using schema: `https://www.dane.gov.pl/static/xml/otwarte_dane_latest.xsd`

---

## Future Enhancements
- CLI tool to scaffold new client project from template
- Multi-project support (more than one investment per site)
- Custom domain configuration guide
- Image uploader or admin panel (with CMS backend)

---

## Success Criteria
- New client site can be launched in <1 hour by cloning template
- XML + CSV are valid and accepted by dane.gov.pl daily
- All pricing data on site and CSV remain in sync
- Minimal or no code changes required for each deployment

---

