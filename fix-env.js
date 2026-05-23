const fs = require('fs');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.{jsx,js}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasChanges = false;
  
  if (content.includes('process.env')) {
    content = content.replace(/process\.env\./g, 'import.meta.env.');
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    console.log(`Replaced process.env in: ${file}`);
  }
});
