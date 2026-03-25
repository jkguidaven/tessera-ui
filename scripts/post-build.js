const fs = require('fs');
const p = 'dist/types/index.d.ts';
fs.appendFileSync(p, '\nexport * from "./components";\n');
