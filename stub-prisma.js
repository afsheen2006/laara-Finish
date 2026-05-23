const fs = require('fs');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.{jsx,js}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasChanges = false;
  
  if (content.match(/import.*['"]@\/lib\/prisma['"];?/)) {
    content = content.replace(/import.*['"]@\/lib\/prisma['"];?/, '// Prisma removed');
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    console.log(`Removed prisma from: ${file}`);
  }
});
