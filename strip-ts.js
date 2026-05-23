const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const glob = require('glob');

const frontendDir = path.join(__dirname, 'frontend');

// Find all .ts and .tsx files in frontend (excluding node_modules)
const files = glob.sync('frontend/**/*.{ts,tsx}', { ignore: 'frontend/node_modules/**' });

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  const ext = path.extname(file);
  const isTsx = ext === '.tsx';
  
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const result = babel.transformSync(code, {
      filename: filePath,
      presets: [
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      plugins: [
        ['@babel/plugin-transform-typescript', { isTSX: isTsx, allowDeclareFields: true, allowNamespaces: true }]
      ],
      retainLines: true,
      generatorOpts: {
        retainLines: true,
        compact: false,
      }
    });

    if (result && result.code) {
      const newFilePath = filePath.replace(/\.tsx?$/, isTsx ? '.jsx' : '.js');
      fs.writeFileSync(newFilePath, result.code);
      fs.unlinkSync(filePath); // delete original TS file
      console.log(`Transformed: ${file} -> ${newFilePath}`);
    }
  } catch (err) {
    console.error(`Failed to transform ${file}:`, err);
  }
});
console.log(`Completed transforming ${files.length} files.`);
