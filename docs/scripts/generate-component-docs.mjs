/**
 * Generates Starlight MDX pages for each component from dist/components.json.
 * Run before Astro build to keep docs in sync with the latest release.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../..');
const outDir = resolve(__dirname, '../src/content/docs/components');

// Read version
const pkg = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'));
const version = process.env.RELEASE_VERSION || pkg.version;

// Read component metadata
const componentsJsonPath = resolve(rootDir, 'dist/components.json');
let docs;
try {
  docs = JSON.parse(readFileSync(componentsJsonPath, 'utf-8'));
} catch {
  console.error(`Could not read ${componentsJsonPath}. Run "pnpm build" in the root first.`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

let generated = 0;

for (const component of docs.components) {
  const tag = component.tag;
  const name = tag.replace('ts-', '');
  const title = pascalCase(name);
  const props = component.props || [];
  const events = component.events || [];
  const slots = component.slots || [];
  const parts = component.parts || [];
  const methods = component.methods || [];
  const description = component.docs || `The ${tag} component.`;

  const lines = [];

  // Frontmatter
  lines.push('---');
  lines.push(`title: ${title}`);
  lines.push(`description: "API reference for the <${tag}> component"`);
  lines.push('---');
  lines.push('');

  // Version badge
  lines.push(`<p><code>&lt;${tag}&gt;</code> <span className="version-badge">v${version}</span></p>`);
  lines.push('');
  lines.push(description);
  lines.push('');

  // Storybook link
  lines.push(`> **[Open in Storybook](/tessera-ui/storybook/?path=/story/components-${name}--default)** for interactive demos.`);
  lines.push('');

  // Demo
  lines.push('## Preview');
  lines.push('');
  lines.push('```html');
  lines.push(generateDemoHtml(tag, props, slots));
  lines.push('```');
  lines.push('');

  // Props
  if (props.length > 0) {
    lines.push('## Properties');
    lines.push('');
    lines.push('| Property | Attribute | Type | Default | Description |');
    lines.push('|---|---|---|---|---|');
    for (const prop of props) {
      const type = escapeMarkdown(prop.type || 'unknown');
      const def = prop.default ? `\`${prop.default}\`` : '—';
      const attr = prop.attr ? `\`${prop.attr}\`` : '—';
      const doc = escapeMarkdown(prop.docs || '');
      lines.push(`| \`${prop.name}\` | ${attr} | \`${type}\` | ${def} | ${doc} |`);
    }
    lines.push('');
  }

  // Events
  if (events.length > 0) {
    lines.push('## Events');
    lines.push('');
    lines.push('| Event | Detail | Bubbles | Composed | Description |');
    lines.push('|---|---|---|---|---|');
    for (const event of events) {
      const detail = event.detail ? `\`${event.detail.replace(/\{/g, '\\{').replace(/\}/g, '\\}')}\`` : '—';
      const doc = escapeMarkdown(event.docs || '');
      lines.push(`| \`${event.event}\` | ${detail} | ${event.bubbles ? 'Yes' : 'No'} | ${event.composed ? 'Yes' : 'No'} | ${doc} |`);
    }
    lines.push('');
  }

  // Methods
  if (methods.length > 0) {
    lines.push('## Methods');
    lines.push('');
    lines.push('| Method | Signature | Description |');
    lines.push('|---|---|---|');
    for (const method of methods) {
      const sig = escapeMarkdown(method.signature || '');
      const doc = escapeMarkdown(method.docs || '');
      lines.push(`| \`${method.name}\` | \`${sig}\` | ${doc} |`);
    }
    lines.push('');
  }

  // Slots
  if (slots.length > 0) {
    lines.push('## Slots');
    lines.push('');
    lines.push('| Name | Description |');
    lines.push('|---|---|');
    for (const slot of slots) {
      const slotName = slot.name || '*(default)*';
      const doc = escapeMarkdown(slot.docs || '');
      lines.push(`| \`${slotName}\` | ${doc} |`);
    }
    lines.push('');
  }

  // CSS Parts
  if (parts.length > 0) {
    lines.push('## CSS Parts');
    lines.push('');
    lines.push('Use `::part()` to style internal elements:');
    lines.push('');
    lines.push('| Part | Description |');
    lines.push('|---|---|');
    for (const part of parts) {
      const doc = escapeMarkdown(part.docs || '');
      lines.push(`| \`${part.name}\` | ${doc} |`);
    }
    lines.push('');
    lines.push('```css');
    lines.push(`${tag}::part(${parts[0].name}) {`);
    lines.push('  /* your custom styles */');
    lines.push('}');
    lines.push('```');
    lines.push('');
  }

  // Usage examples
  lines.push('## Usage');
  lines.push('');

  lines.push('### HTML');
  lines.push('');
  lines.push('```html');
  lines.push(generateDemoHtml(tag, props, slots));
  lines.push('```');
  lines.push('');

  lines.push('### React');
  lines.push('');
  lines.push('```jsx');
  lines.push(`import { ${pascalCase(tag.replace('ts-', 'ts '))} } from '@tessera-ui/react';`);
  lines.push('');
  lines.push(`<${pascalCase(tag.replace('ts-', 'ts '))}${generateJsxProps(props)}>${hasDefaultSlot(slots) ? 'Content' : ''}</${pascalCase(tag.replace('ts-', 'ts '))}>`)
  lines.push('```');
  lines.push('');

  const filePath = resolve(outDir, `${name}.mdx`);
  writeFileSync(filePath, lines.join('\n') + '\n', 'utf-8');
  generated++;
}

console.log(`[generate-component-docs] generated ${generated} component page(s) for v${version}`);

// --- Helpers ---

function generateDemoHtml(tag, props, slots) {
  const defaultProps = props
    .filter(p => p.default && p.default !== 'false' && p.default !== "''" && !['type'].includes(p.name))
    .slice(0, 3)
    .map(p => {
      const val = p.default.replace(/^'|'$/g, '');
      if (p.type === 'boolean') return null;
      return `${p.attr || p.name}="${val}"`;
    })
    .filter(Boolean);

  const attrStr = defaultProps.length > 0 ? ' ' + defaultProps.join(' ') : '';
  const content = hasDefaultSlot(slots) ? 'Content' : '';
  return `<${tag}${attrStr}>${content}</${tag}>`;
}

function generateJsxProps(props) {
  const relevant = props
    .filter(p => p.default && p.default !== 'false' && p.default !== "''" && !['type'].includes(p.name))
    .slice(0, 2);

  if (relevant.length === 0) return '';
  return ' ' + relevant.map(p => {
    const val = p.default.replace(/^'|'$/g, '');
    if (p.type === 'boolean') return p.name;
    return `${p.name}="${val}"`;
  }).join(' ');
}

function hasDefaultSlot(slots) {
  return slots.some(s => s.name === '');
}

function pascalCase(str) {
  return str.split(/[-_\s]+/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function escapeMarkdown(str) {
  return str
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
}
