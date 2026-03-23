import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { storybookOutputTarget } = require('./scripts/storybook-output-target');

export const config: Config = {
  namespace: 'tessera-ui',
  globalStyle: 'src/theme/tokens.css',
  taskQueue: 'async',
  sourceMap: true,
  extras: {
    enableImportInjection: true,
  },
  outputTargets: [
    // --- Primary distribution ---
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },

    // --- Tree-shakeable custom elements ---
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },

    // --- Dev server ---
    {
      type: 'www',
      serviceWorker: null,
    },

    // --- Auto-generated API docs ---
    {
      type: 'docs-readme',
      footer: '*Built with [Tessera UI](https://github.com/your-org/tessera-ui)*',
    },

    // --- Custom Elements Manifest (JSON) ---
    {
      type: 'docs-json',
      file: 'dist/components.json',
    },

    // --- React wrapper generation ---
    reactOutputTarget({
      outDir: 'packages/react/src/components',
    }),

    // --- Vue wrapper generation ---
    vueOutputTarget({
      componentCorePackage: '@tessera-ui/core',
      proxiesFile: 'packages/vue/src/components.ts',
    }),

    // --- Angular wrapper generation ---
    angularOutputTarget({
      componentCorePackage: '@tessera-ui/core',
      outputType: 'component',
      directivesProxyFile: 'packages/angular/src/directives/proxies.ts',
      directivesArrayFile: 'packages/angular/src/directives/index.ts',
    }),

    // --- Auto-generated Storybook stories ---
    storybookOutputTarget(),
  ],

  testing: {
    browserHeadless: 'new',
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    setupFilesAfterFramework: ['./tests/setup.ts'],
  },
};
