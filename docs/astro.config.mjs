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
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
      },
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
          label: 'Design Language',
          items: [
            { label: 'Overview', slug: 'design-language' },
            { label: 'Design Principles', slug: 'design-language/principles' },
            { label: 'Color', slug: 'design-language/color' },
            { label: 'Typography', slug: 'design-language/typography' },
            { label: 'Spacing', slug: 'design-language/spacing' },
            { label: 'Layout', slug: 'design-language/layout' },
            { label: 'Elevation', slug: 'design-language/elevation' },
            { label: 'Shapes', slug: 'design-language/shapes' },
            { label: 'Material', slug: 'design-language/material' },
            { label: 'Motion', slug: 'design-language/motion' },
            { label: 'Iconography', slug: 'design-language/iconography' },
            { label: 'Accessibility', slug: 'design-language/accessibility' },
            { label: 'Internationalization', slug: 'design-language/internationalization' },
            { label: 'Content Guidelines', slug: 'design-language/content-guidelines' },
          ],
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
