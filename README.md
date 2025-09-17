# Real Estate Developer Website Template

A modern, responsive website template built with Docusaurus for Polish real estate developers. Features automatic open data compliance for dane.gov.pl and easy customization for different projects.

## Features

- 🏠 **One-page modern design** - Clean, professional layout optimized for real estate
- 📱 **Fully responsive** - Works perfectly on desktop, tablet, and mobile
- 🇵🇱 **Polish open data compliance** - Automatic XML/CSV generation for dane.gov.pl
- ⚡ **Easy customization** - Single JSON config file for all content
- 🚀 **Quick deployment** - Ready for Netlify, Vercel, or any static hosting
- 📧 **Contact forms** - Built-in Netlify Forms integration
- 🖼️ **Image gallery** - Responsive gallery with lightbox functionality
- 💰 **Pricing tables** - Professional unit listings with availability status
- 📊 **Sortable pricing table** - Comprehensive table view with sorting functionality

## Quick Start

### 1. Clone and Setup

```bash
git clone <this-repo> my-real-estate-project
cd my-real-estate-project
npm install
```

### 2. Configure Your Project

Edit `config/project.json` to customize:

- **Project details**: Name, description, location
- **Developer information**: Company name, contact details, legal info
- **Site settings**: Title, URL, branding

Edit `static/data/units.json` to add your apartments/units:

- Unit details (area, price, rooms, floor)
- Custom fields (balcony, storage, parking)
- Status (available, sold, reserved)

### 3. Add Your Images

Replace placeholder images in `static/images/`:

- `hero.jpg` - Main hero background image
- `logo.png` - Your company logo
- `gallery-*.jpg` - Project gallery images
- `plans/plan-*.jpg` - Floor plans for each unit

### 4. Run Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### 5. Generate Open Data Files

```bash
npm run generate:open-data
```

This creates XML and CSV files required for Polish government compliance.

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repo to Netlify
2. Build settings are pre-configured in `netlify.toml`
3. Open data files are automatically generated daily
4. Contact forms work out-of-the-box

### Manual Deployment

```bash
npm run build
npm run generate:open-data
```

Upload the `build/` directory to your hosting provider.

## Customization Guide

### Project Configuration

The `config/project.json` file controls all content:

```json
{
  "project": {
    "name": "Your Project Name",
    "subtitle": "Modern apartments in city center", 
    "description": "Project description...",
    "location": "Warsaw",
    "heroImage": "/images/hero.jpg"
  },
  "developer": {
    "name": "Your Company Ltd.",
    "nip": "1234567890",
    "address": "Your Address",
    "phone": "+48 123 456 789",
    "email": "contact@yourcompany.com"
  }
}
```

### Units Data

Edit `static/data/units.json` to define your apartments:

```json
[
  {
    "id": "A",
    "name": "Apartment A",
    "area": 45.50,
    "totalArea": 52.30,
    "rooms": 2,
    "price": 450000,
    "pricePerM2": 9890.11,
    "status": "available",
    "floorPlan": "/images/plans/plan-A.jpg",
    "belongingRoom": "Piwnica ok. 3 (m²)",
    "conditioning": "Otwórz",
    "standard": "Otwórz",
    "customFields": {
      "balcony": true,
      "balconyArea": 5.2,
      "storage": true,
      "parkingSpace": false
    }
  }
]
```

### Styling

Customize colors and fonts in `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #your-brand-color;
  --ifm-font-family-base: 'Your Font', sans-serif;
}
```

### Adding Custom Fields

You can add any custom fields to units in the `customFields` object. The template will automatically display them in the unit cards.

## Open Data Compliance

This template automatically generates files required by Polish law for real estate developers:

- **XML dataset file** - Contains metadata about your price data
- **Daily CSV files** - Contains actual unit prices and details  
- **MD5 checksum** - For data integrity verification

Files are generated automatically and hosted at:
- `https://yoursite.com/dataset.xml`
- `https://yoursite.com/dataset.md5`
- `https://yoursite.com/Ceny-ofertowe-mieszkan-dewelopera-[NAME]-[DATE].csv`

### Submitting to dane.gov.pl

1. Deploy your site with the template
2. Run the open data generation script
3. Submit the XML and MD5 URLs to the government portal
4. The system will automatically harvest daily updates

## Development

### File Structure

```
real-estate-template/
├── config/
│   └── project.json          # Main configuration
├── static/
│   ├── data/
│   │   └── units.json        # Units/apartments data
│   └── images/               # All images and assets
├── src/
│   ├── components/           # React components
│   │   ├── HeroSection/
│   │   ├── UnitsSection/
│   │   ├── GallerySection/
│   │   └── ContactSection/
│   └── css/
│       └── custom.css        # Custom styling
├── scripts/
│   └── generateOpenData.js   # Open data generation
└── netlify/
    └── functions/            # Serverless functions
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run generate:open-data` - Generate compliance files
- `npm run serve` - Serve built site locally

### Adding New Sections

1. Create component in `src/components/`
2. Add to `src/pages/index.js`
3. Update configuration if needed

## License

This template is provided as-is for real estate developers. Customize freely for your projects.

## Support

For issues or questions about this template, please check the documentation or create an issue in the repository.
