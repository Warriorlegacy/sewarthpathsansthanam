const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../repo_temp/app/[locale]');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      
      if (content.includes('#FFFBF5')) {
        content = content.replace(/#FFFBF5/g, 'transparent');
        changed = true;
      }
      if (content.includes('#FFF8F0')) {
        content = content.replace(/#FFF8F0/g, 'transparent');
        changed = true;
      }
      if (content.includes('#FFF9F2')) {
        content = content.replace(/#FFF9F2/g, 'transparent');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated backgrounds in: ${filePath}`);
      }
    }
  }
}

walk(targetDir);
console.log('Background colors replacement completed.');
