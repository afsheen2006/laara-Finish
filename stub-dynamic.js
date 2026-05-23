const fs = require('fs');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.{jsx,js}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasChanges = false;
  
  if (content.includes('next/dynamic')) {
    // Replace import nextDynamic from "next/dynamic"
    content = content.replace(/import\s+nextDynamic\s+from\s+["']next\/dynamic["'];?/g, '');
    
    // Replace const Comp = nextDynamic(() => import('...').then(m => m.Comp), { ssr: false })
    // With const Comp = React.lazy(() => import('...').then(m => ({ default: m.Comp })))
    content = content.replace(/nextDynamic\(\(\)\s*=>\s*import\(([^)]+)\)\.then\(\(mod\)\s*=>\s*mod\.([^)]+)\)(?:,\s*{[^}]+})?\)/g, 
      'React.lazy(() => import($1).then((mod) => ({ default: mod.$2 })))');
    
    // Replace simple nextDynamic(() => import('...'))
    content = content.replace(/nextDynamic\(\(\)\s*=>\s*import\(([^)]+)\)(?:,\s*{[^}]+})?\)/g, 
      'React.lazy(() => import($1))');
      
    // Ensure React is imported
    if (!content.includes('import React')) {
      content = 'import React from "react";\n' + content;
    }
    
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    console.log(`Replaced next/dynamic in: ${file}`);
  }
});
