const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.jsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Remove "use client"
  content = content.replace(/["']use client["'];?\n?/g, '');
  
  // Link conversion
  content = content.replace(/import Link from ['"]next\/link['"];?/g, 'import { Link } from \'react-router-dom\';');
  content = content.replace(/<Link\s+href=/g, '<Link to=');
  content = content.replace(/<Link([^>]*)\shref=/g, '<Link$1 to='); // handle props before href
  
  // Image conversion
  content = content.replace(/import Image from ['"]next\/image['"];?/g, '');
  content = content.replace(/<Image/g, '<img');
  
  // Router conversion
  content = content.replace(/import\s+{\s*useRouter\s*}\s+from\s+['"]next\/navigation['"];?/g, 'import { useNavigate } from \'react-router-dom\';');
  content = content.replace(/const\s+(\w+)\s*=\s*useRouter\(\)/g, 'const $1 = useNavigate()');
  // if they named it router, router.push -> router(
  // but better to just rename to navigate if we can, let's keep it simple:
  // if we changed `const router = useNavigate()`, then `router.push('/foo')` becomes `router('/foo')`.
  content = content.replace(/(\w+)\.push\(/g, '$1(');
  
  // Remove metadata
  content = content.replace(/export const metadata = {[\s\S]*?};/g, '');
  
  fs.writeFileSync(file, content);
  console.log(`Converted syntax in: ${file}`);
});
console.log(`Finished converting ${files.length} files.`);
