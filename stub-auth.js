const fs = require('fs');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.{jsx,js}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasChanges = false;
  
  if (content.includes('import { auth } from "@/auth";')) {
    content = content.replace('import { auth } from "@/auth";', 'const auth = async () => null;');
    hasChanges = true;
  }
  if (content.includes('import { auth } from "../auth";')) {
    content = content.replace('import { auth } from "../auth";', 'const auth = async () => null;');
    hasChanges = true;
  }
  
  // also fix next/navigation redirect
  if (content.includes('import { redirect } from "next/navigation";')) {
    content = content.replace('import { redirect } from "next/navigation";', 'const redirect = (url) => { window.location.href = url; };');
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    console.log(`Fixed auth/redirect in: ${file}`);
  }
});
