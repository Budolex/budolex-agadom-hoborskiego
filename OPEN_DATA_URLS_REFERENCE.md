# ✅ Open Data URLs - Correct Implementation (dane.gov.pl Format)

## 🎯 **CORRECT URL FORMAT**

### Primary URLs (Government Required Format)
These are the **official dated URLs** that comply with dane.gov.pl requirements:

```
https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv
https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5
```

### Clean Aliases (Always Point to Latest)
These **convenience URLs** always redirect to the most recent dated file:

```
https://agadom-hoborskiego.netlify.app/dataset.csv  → latest CSV
https://agadom-hoborskiego.netlify.app/dataset.xml  → latest XML
https://agadom-hoborskiego.netlify.app/dataset.md5  → latest MD5
```

---

## 📋 **FILE NAMING PATTERN**

### Format
```
Ceny-ofertowe-mieszkan-dewelopera-{DEVELOPER-NAME}-{YYYY-MM-DD}.{ext}
```

### Examples
```
CSV: Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv
XML: Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
MD5: Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5
```

### Developer Name Transformation
- Original: `"Agadom Sp. z o.o."`
- Transformed: `"Agadom-Sp--z-o-o-"` (non-alphanumeric → dash)

---

## 🔄 **HOW IT WORKS**

### 1. Daily Generation (3:00 AM UTC)
```
Netlify Scheduled Function runs daily
         ↓
Generates new files with today's date:
  - Ceny-ofertowe-...-2025-10-18.csv
  - Ceny-ofertowe-...-2025-10-18.xml
  - Ceny-ofertowe-...-2025-10-18.md5
         ↓
Updates alias files to point to latest:
  - dataset.csv → copy of latest CSV
  - dataset.xml → copy of latest XML
  - dataset.md5 → copy of latest MD5
```

### 2. File Structure
```
static/open-data/
├── Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv  ← Today
├── Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
├── Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5
├── Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-17.csv  ← Yesterday
├── Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-17.xml
├── Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-17.md5
├── dataset.csv  ← Always points to latest (2025-10-18)
├── dataset.xml  ← Always points to latest (2025-10-18)
└── dataset.md5  ← Always points to latest (2025-10-18)
```

---

## 🌐 **FOR DANE.GOV.PL SUBMISSION**

### Option 1: Use Dated URLs (Recommended for Compliance)
```
CSV: https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv
XML: https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
MD5: https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5
```
**Note**: Update these URLs daily OR use Option 2

### Option 2: Use Clean Aliases (Easier, Always Current)
```
CSV: https://agadom-hoborskiego.netlify.app/dataset.csv
XML: https://agadom-hoborskiego.netlify.app/dataset.xml
MD5: https://agadom-hoborskiego.netlify.app/dataset.md5
```
**Note**: These automatically update daily, no URL changes needed

---

## ✅ **BENEFITS OF THIS APPROACH**

### ✅ Compliance
- Follows **exact government naming requirements**
- Date-stamped files for **transparency**
- **Version history** preserved

### ✅ Flexibility
- **Dated URLs**: For specific date references
- **Clean aliases**: For always-current data
- **Both work**: Choose based on portal requirements

### ✅ Automation
- **Daily refresh** at 3:00 AM UTC
- **No manual intervention** needed
- **Automatic alias updates**

### ✅ Reliability
- **Historical data** preserved
- **Easy debugging** (check any date)
- **Rollback capable** (revert to previous date if needed)

---

## 🔧 **TECHNICAL DETAILS**

### Netlify Redirects (netlify.toml)
```toml
[[redirects]]
  from = "/dataset.csv"
  to = "/open-data/dataset.csv"
  status = 200

[[redirects]]
  from = "/dataset.xml"
  to = "/open-data/dataset.xml"
  status = 200

[[redirects]]
  from = "/dataset.md5"
  to = "/open-data/dataset.md5"
  status = 200
```

### File Generation (scripts/generateOpenData.js)
```javascript
// Generates two sets of files:
1. Dated files (primary):
   - Ceny-ofertowe-mieszkan-dewelopera-{NAME}-{DATE}.csv
   - Ceny-ofertowe-mieszkan-dewelopera-{NAME}-{DATE}.xml
   - Ceny-ofertowe-mieszkan-dewelopera-{NAME}-{DATE}.md5

2. Alias files (convenience):
   - dataset.csv (copy of latest)
   - dataset.xml (copy of latest)
   - dataset.md5 (copy of latest)
```

### Daily Update (netlify/functions/scheduled-open-data.js)
```javascript
// Runs daily at 3:00 AM UTC
// Generates new dated files
// Updates alias files
// Preserves historical files
```

---

## 📊 **EXAMPLE OUTPUT**

```bash
$ npm run generate:open-data

Generating open data files...
CSV generated: .../Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv
CSV alias: .../dataset.csv → Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv
XML generated: .../Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
XML alias: .../dataset.xml → Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
MD5 generated: .../Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5
MD5 alias: .../dataset.md5 → Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5

Dataset ID: f887ced2-b45c-4a3b-9d47-48040bef7677

Primary URLs (dated):
CSV: https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.csv
XML: https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.xml
MD5: https://agadom-hoborskiego.netlify.app/Ceny-ofertowe-mieszkan-dewelopera-Agadom-Sp--z-o-o--2025-10-18.md5

Clean aliases (always latest):
CSV: https://agadom-hoborskiego.netlify.app/dataset.csv
XML: https://agadom-hoborskiego.netlify.app/dataset.xml
MD5: https://agadom-hoborskiego.netlify.app/dataset.md5
```

---

## 🎯 **RECOMMENDATION FOR PORTAL SUBMISSION**

### **Use Clean Aliases** (`dataset.*`)
**Why**: 
- ✅ URLs never change
- ✅ Always point to current data
- ✅ No daily URL updates needed
- ✅ Easier to maintain

**Dated URLs** are still generated and accessible for:
- Historical reference
- Debugging specific dates
- Manual verification
- Compliance audits

---

## ✅ **STATUS: FULLY COMPLIANT**

- ✅ **Government naming format**: Correct
- ✅ **Daily refresh**: Enabled (3:00 AM UTC)
- ✅ **Version history**: Preserved
- ✅ **Clean URLs**: Available
- ✅ **Dated URLs**: Available
- ✅ **Automatic updates**: Working
- ✅ **Build successful**: Verified

**The system now provides maximum flexibility and compliance!** 🎉