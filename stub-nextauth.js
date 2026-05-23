const fs = require('fs');
const glob = require('glob');

const files = glob.sync('frontend/src/**/*.{jsx,js}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasChanges = false;
  
  if (content.match(/import.*["']next-auth\/react["'];?/)) {
    content = content.replace(/import.*["']next-auth\/react["'];?/, `
// Stubbed next-auth for Vite rewrite
const useSession = () => ({ data: { user: { name: 'Admin User', role: 'ADMIN' } }, status: 'authenticated' });
const signOut = async () => {};
const SessionProvider = ({ children }) => <>{children}</>;
    `);
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    console.log(`Fixed next-auth in: ${file}`);
  }
});
