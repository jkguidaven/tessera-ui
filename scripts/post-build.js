const fs = require('fs');
const path = require('path');

// 1. Fix type exports
const p = 'dist/types/index.d.ts';
fs.appendFileSync(p, '\nexport * from "./components";\n');

// 2. Minify CSS files under dist/collection/ to reduce install size
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')      // remove block comments
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')  // remove whitespace around punctuation
    .replace(/;\}/g, '}')                   // remove trailing semicolons before }
    .replace(/\s+/g, ' ')                   // collapse remaining whitespace
    .trim();
}

function minifyCssInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      minifyCssInDir(full);
    } else if (entry.name.endsWith('.css')) {
      const before = fs.readFileSync(full, 'utf8');
      const after = minifyCss(before);
      if (after.length < before.length) {
        fs.writeFileSync(full, after, 'utf8');
      }
    }
  }
}

minifyCssInDir('dist/collection');
