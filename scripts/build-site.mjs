import fs from 'node:fs/promises';
await fs.mkdir('docs', { recursive: true });
await fs.copyFile('site/index.html', 'docs/index.html');
await fs.writeFile('docs/.nojekyll', '');
console.log('Original static portfolio published from site/index.html');
