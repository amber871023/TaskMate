const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Read licenses.json
const licensesJsonPath = path.join(__dirname, 'licenses.json');
const licensesJson = JSON.parse(fs.readFileSync(licensesJsonPath, 'utf-8'));

// Get top-level dependencies from package.json
const topLevelDeps = new Set([
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {})
]);

// Filter licenses.json to include only top-level dependencies
const filteredLicenses = {};
for (const [key, value] of Object.entries(licensesJson)) {
  const packageName = key.split('@')[0];
  if (topLevelDeps.has(packageName)) {
    filteredLicenses[key] = value;
  }
}

// Ensure the directory exists before writing the file
const filteredLicensesPath = path.join(__dirname, 'licenses.json');
const dir = path.dirname(filteredLicensesPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Write filtered licenses to a new JSON file
fs.writeFileSync(filteredLicensesPath, JSON.stringify(filteredLicenses, null, 2));

console.log('Filtered licenses.json to include only top-level dependencies.');
