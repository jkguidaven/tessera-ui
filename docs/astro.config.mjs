import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read version from root package.json
const rootPkg = JSON.parse(readFileSync(resolve(process.cwd(), '../package.json'), 'utf-8'));
const version = process.env.RELEASE_VERSION || rootPkg.version;

export default defineConfig({
  site: 'https://jkguidaven.github.io',
  base: '/tessera-ui/',
  integrations: [
    starlight({
      title: `Tessera UI`,
      description: 'Framework-agnostic web component library built with Stencil.js',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/jkguidaven/tessera-ui' },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { name: 'tessera-version', content: version },
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Design Tokens',
          autogenerate: { directory: 'tokens' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
  ],
});
