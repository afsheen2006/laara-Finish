const fs = require('fs');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.{jsx,js}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Find all imports from @/app/actions/...
  const importRegex = /import\s+{([^}]+)}\s+from\s+["']@\/app\/actions\/[^"']+["'];?/g;
  
  let match;
  let hasChanges = false;
  
  while ((match = importRegex.exec(content)) !== null) {
    hasChanges = true;
    const functions = match[1].split(',').map(f => f.trim());
    
    // Create stub for each function
    const stubs = functions.map(fn => {
      return `const ${fn} = async (...args) => { console.log("Stub called: ${fn}", args); return {}; };`;
    }).join('\n');
    
    // Replace the import statement with the stubs
    content = content.replace(match[0], stubs);
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    console.log(`Stubbed actions in: ${file}`);
  }
});
