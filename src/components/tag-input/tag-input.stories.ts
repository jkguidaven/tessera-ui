// Hand-written stories for ts-tag-input

export default {
  title: 'Components/Tag Input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text displayed above the input.' },
    placeholder: { control: 'text', description: 'Placeholder text for the input.' },
    maxTags: { control: 'number', description: 'Maximum number of tags allowed.' },
    disabled: { control: 'boolean', description: 'Renders the input as disabled.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The input\'s size.',
    },
    error: { control: 'text', description: 'Error message for the input.' },
    helpText: { control: 'text', description: 'Help text displayed below the input.' },
    allowDuplicates: { control: 'boolean', description: 'Whether to allow duplicate tags.' },
  },
};

const initTags = (id: string, tags: string[]): string => `
  <script>
    (function() {
      const el = document.getElementById('${id}');
      if (el) el.value = ${JSON.stringify(tags)};
    })();
  </script>
`;

export const Default = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.label) attrs.push(`label="${args.label}"`);
  if (args.placeholder) attrs.push(`placeholder="${args.placeholder}"`);
  if (args.maxTags) attrs.push(`max-tags="${args.maxTags}"`);
  if (args.disabled) attrs.push('disabled');
  if (args.size) attrs.push(`size="${args.size}"`);
  if (args.error) attrs.push(`error="${args.error}"`);
  if (args.helpText) attrs.push(`help-text="${args.helpText}"`);
  if (args.allowDuplicates) attrs.push('allow-duplicates');
  return `<ts-tag-input ${attrs.join(' ')}></ts-tag-input>`;
};
Default.args = {
  label: 'Skills',
  placeholder: 'Type a skill and press Enter',
  size: 'md',
  disabled: false,
  allowDuplicates: false,
};

export const WithMaxTags = (): string => `
  <ts-tag-input
    id="max-tags-demo"
    label="Top 3 Languages"
    placeholder="Add up to 3 languages"
    max-tags="3"
    help-text="You can add a maximum of 3 tags"
  ></ts-tag-input>
  ${initTags('max-tags-demo', ['TypeScript', 'Rust'])}
`;

export const PrefilledTags = (): string => `
  <ts-tag-input
    id="prefilled-demo"
    label="Project Tags"
    placeholder="Add more tags..."
    help-text="Press Enter or comma to add a tag"
  ></ts-tag-input>
  ${initTags('prefilled-demo', ['design-system', 'web-components', 'stencil', 'typescript'])}
`;

export const ErrorState = (): string => `
  <ts-stack gap="4">
    <ts-tag-input
      label="Categories"
      placeholder="Add a category"
      error="At least one category is required"
    ></ts-tag-input>
    <ts-tag-input
      id="error-demo"
      label="Recipients"
      error="Invalid email address detected"
    ></ts-tag-input>
    ${initTags('error-demo', ['alice@example.com', 'not-an-email'])}
  </ts-stack>
`;

export const Sizes = (): string => `
  <ts-stack gap="4">
    <ts-tag-input id="size-sm" label="Small" size="sm" placeholder="Small input"></ts-tag-input>
    ${initTags('size-sm', ['tag-a'])}
    <ts-tag-input id="size-md" label="Medium" size="md" placeholder="Medium input"></ts-tag-input>
    ${initTags('size-md', ['tag-a', 'tag-b'])}
    <ts-tag-input id="size-lg" label="Large" size="lg" placeholder="Large input"></ts-tag-input>
    ${initTags('size-lg', ['tag-a', 'tag-b', 'tag-c'])}
  </ts-stack>
`;

export const Disabled = (): string => `
  <ts-tag-input
    id="disabled-demo"
    label="Locked Tags"
    disabled
  ></ts-tag-input>
  ${initTags('disabled-demo', ['readonly-tag', 'cannot-remove'])}
`;
