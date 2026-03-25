// Hand-written stories for ts-tree

export default {
  title: 'Components/Tree',
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable item selection mode.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.selectable) attrs.push('selectable');
  return `
    <ts-tree ${attrs.join(' ')}>
      <ts-tree-item label="Documents" icon="folder" expanded>
        <ts-tree-item label="Reports" icon="folder">
          <ts-tree-item label="Q4-2025.pdf" icon="file-text"></ts-tree-item>
          <ts-tree-item label="Q3-2025.pdf" icon="file-text"></ts-tree-item>
          <ts-tree-item label="Annual-Summary.pdf" icon="file-text"></ts-tree-item>
        </ts-tree-item>
        <ts-tree-item label="Invoices" icon="folder">
          <ts-tree-item label="INV-001.pdf" icon="file-text"></ts-tree-item>
          <ts-tree-item label="INV-002.pdf" icon="file-text"></ts-tree-item>
        </ts-tree-item>
      </ts-tree-item>
      <ts-tree-item label="Images" icon="folder">
        <ts-tree-item label="logo.png" icon="image"></ts-tree-item>
        <ts-tree-item label="banner.jpg" icon="image"></ts-tree-item>
      </ts-tree-item>
      <ts-tree-item label="README.md" icon="file-text"></ts-tree-item>
    </ts-tree>
  `;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    selectable: false,
  },
});

export const States = (): string => `
  <div style="display: flex; gap: 48px; flex-wrap: wrap;">
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Expanded and collapsed</p>
      <ts-tree>
        <ts-tree-item label="src" icon="folder" expanded>
          <ts-tree-item label="components" icon="folder" expanded>
            <ts-tree-item label="Button.tsx" icon="file-text"></ts-tree-item>
            <ts-tree-item label="Input.tsx" icon="file-text"></ts-tree-item>
          </ts-tree-item>
          <ts-tree-item label="utils" icon="folder">
            <ts-tree-item label="helpers.ts" icon="file-text"></ts-tree-item>
          </ts-tree-item>
        </ts-tree-item>
        <ts-tree-item label="package.json" icon="file-text"></ts-tree-item>
      </ts-tree>
    </div>
    <div>
      <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">With disabled items</p>
      <ts-tree>
        <ts-tree-item label="Public" icon="folder" expanded>
          <ts-tree-item label="index.html" icon="file-text"></ts-tree-item>
          <ts-tree-item label="restricted.html" icon="file-text" disabled></ts-tree-item>
        </ts-tree-item>
        <ts-tree-item label="Private" icon="folder" disabled>
          <ts-tree-item label="secrets.json" icon="file-text"></ts-tree-item>
        </ts-tree-item>
      </ts-tree>
    </div>
  </div>
`;

export const Variants = (): string => `
  <div>
    <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Selectable tree</p>
    <ts-tree selectable>
      <ts-tree-item label="Frontend" icon="folder" expanded>
        <ts-tree-item label="React" icon="file-text" selected></ts-tree-item>
        <ts-tree-item label="Vue" icon="file-text"></ts-tree-item>
        <ts-tree-item label="Angular" icon="file-text"></ts-tree-item>
      </ts-tree-item>
      <ts-tree-item label="Backend" icon="folder" expanded>
        <ts-tree-item label="Node.js" icon="file-text" selected></ts-tree-item>
        <ts-tree-item label="Python" icon="file-text"></ts-tree-item>
        <ts-tree-item label="Go" icon="file-text"></ts-tree-item>
      </ts-tree-item>
    </ts-tree>
  </div>
`;

export const WithCheckboxes = (): string => `
  <div>
    <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Checkbox selection</p>
    <ts-tree selectable>
      <ts-tree-item label="Permissions" icon="shield" expanded checkbox>
        <ts-tree-item label="Read" icon="eye" checkbox selected></ts-tree-item>
        <ts-tree-item label="Write" icon="pencil" checkbox></ts-tree-item>
        <ts-tree-item label="Execute" icon="play" checkbox selected></ts-tree-item>
      </ts-tree-item>
      <ts-tree-item label="Notifications" icon="bell" expanded checkbox>
        <ts-tree-item label="Email alerts" icon="mail" checkbox selected></ts-tree-item>
        <ts-tree-item label="Push notifications" icon="smartphone" checkbox></ts-tree-item>
        <ts-tree-item label="SMS alerts" icon="message-square" checkbox disabled></ts-tree-item>
      </ts-tree-item>
    </ts-tree>
  </div>
`;

export const MultiSelect = (): string => `
  <div>
    <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">Multi-select enabled (click items to select multiple)</p>
    <ts-tree selectable multi-select>
      <ts-tree-item label="Fruits" icon="folder" expanded>
        <ts-tree-item label="Apples" icon="file-text" selected></ts-tree-item>
        <ts-tree-item label="Bananas" icon="file-text"></ts-tree-item>
        <ts-tree-item label="Oranges" icon="file-text" selected></ts-tree-item>
      </ts-tree-item>
      <ts-tree-item label="Vegetables" icon="folder" expanded>
        <ts-tree-item label="Carrots" icon="file-text"></ts-tree-item>
        <ts-tree-item label="Broccoli" icon="file-text" selected></ts-tree-item>
      </ts-tree-item>
    </ts-tree>
  </div>
`;

export const Composition = (): string => `
  <div style="max-width: 320px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; font-size: 14px;">
        File Browser
      </div>
      <div style="padding: 12px;">
        <ts-tree>
          <ts-tree-item label="Documents" icon="folder" expanded>
            <ts-tree-item label="Reports" icon="folder" expanded>
              <ts-tree-item label="Q4-2025.pdf" icon="file-text"></ts-tree-item>
              <ts-tree-item label="Q3-2025.pdf" icon="file-text"></ts-tree-item>
            </ts-tree-item>
            <ts-tree-item label="Contracts" icon="folder">
              <ts-tree-item label="NDA-signed.pdf" icon="file-text"></ts-tree-item>
            </ts-tree-item>
          </ts-tree-item>
          <ts-tree-item label="Media" icon="folder">
            <ts-tree-item label="Photos" icon="folder">
              <ts-tree-item label="team-photo.jpg" icon="image"></ts-tree-item>
            </ts-tree-item>
            <ts-tree-item label="Videos" icon="folder">
              <ts-tree-item label="demo.mp4" icon="film"></ts-tree-item>
            </ts-tree-item>
          </ts-tree-item>
          <ts-tree-item label="config.json" icon="file-text"></ts-tree-item>
        </ts-tree>
      </div>
    </div>
  </div>
`;
