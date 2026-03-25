// Hand-written stories for ts-command-palette

export default {
  title: 'Components/Command Palette',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Whether the command palette is open.' },
    placeholder: { control: 'text', description: 'Placeholder text for the search input.' },
  },
};

export const Default = (): string => `
  <ts-button id="open-btn" variant="primary" appearance="outline">
    <ts-icon slot="prefix" name="search" size="sm"></ts-icon>
    Open Command Palette
    <span slot="suffix" style="font-size: var(--ts-font-size-xs); color: var(--ts-color-text-tertiary);">Cmd+K</span>
  </ts-button>
  <ts-command-palette placeholder="Search commands...">
    <ts-command-palette-item value="new-file" label="New File" icon="file-plus" shortcut="Ctrl+N"></ts-command-palette-item>
    <ts-command-palette-item value="open-file" label="Open File" icon="folder-open" shortcut="Ctrl+O"></ts-command-palette-item>
    <ts-command-palette-item value="save" label="Save" icon="save" shortcut="Ctrl+S"></ts-command-palette-item>
    <ts-command-palette-item value="search" label="Search in Files" icon="search" shortcut="Ctrl+Shift+F"></ts-command-palette-item>
    <ts-command-palette-item value="settings" label="Open Settings" icon="settings"></ts-command-palette-item>
    <ts-command-palette-item value="theme" label="Toggle Theme" icon="sun"></ts-command-palette-item>
  </ts-command-palette>
  <script>
    document.getElementById('open-btn').addEventListener('tsClick', () => {
      document.querySelector('ts-command-palette').open = true;
    });
  </script>
`;

export const WithGroups = (): string => `
  <ts-command-palette open>
    <ts-command-palette-item value="new-file" label="New File" icon="file-plus" group="File" shortcut="Ctrl+N"></ts-command-palette-item>
    <ts-command-palette-item value="open-file" label="Open File" icon="folder-open" group="File" shortcut="Ctrl+O"></ts-command-palette-item>
    <ts-command-palette-item value="save" label="Save" icon="save" group="File" shortcut="Ctrl+S"></ts-command-palette-item>
    <ts-command-palette-item value="undo" label="Undo" icon="undo" group="Edit" shortcut="Ctrl+Z"></ts-command-palette-item>
    <ts-command-palette-item value="redo" label="Redo" icon="redo" group="Edit" shortcut="Ctrl+Shift+Z"></ts-command-palette-item>
    <ts-command-palette-item value="find" label="Find and Replace" icon="search" group="Edit" shortcut="Ctrl+H"></ts-command-palette-item>
    <ts-command-palette-item value="terminal" label="Toggle Terminal" icon="terminal" group="View" shortcut="Ctrl+\`"></ts-command-palette-item>
    <ts-command-palette-item value="sidebar" label="Toggle Sidebar" icon="panel-left" group="View" shortcut="Ctrl+B"></ts-command-palette-item>
  </ts-command-palette>
`;

export const WithShortcuts = (): string => `
  <ts-command-palette open placeholder="What do you need?">
    <ts-command-palette-item value="copy" label="Copy" icon="copy" shortcut="Ctrl+C"></ts-command-palette-item>
    <ts-command-palette-item value="paste" label="Paste" icon="clipboard" shortcut="Ctrl+V"></ts-command-palette-item>
    <ts-command-palette-item value="cut" label="Cut" icon="scissors" shortcut="Ctrl+X"></ts-command-palette-item>
    <ts-command-palette-item value="select-all" label="Select All" shortcut="Ctrl+A"></ts-command-palette-item>
    <ts-command-palette-item value="duplicate" label="Duplicate Line" shortcut="Ctrl+Shift+D"></ts-command-palette-item>
    <ts-command-palette-item value="delete-line" label="Delete Line" shortcut="Ctrl+Shift+K"></ts-command-palette-item>
  </ts-command-palette>
`;
