// Hand-written stories for ts-file-upload

export default {
  title: 'Components/FileUpload',
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g. \'.jpg,.png\').',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected.',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the file upload is disabled.',
    },
    label: {
      control: 'text',
      description: 'Label text for the dropzone.',
    },
    name: {
      control: 'text',
      description: 'Form field name.',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed.',
    },
    showFileList: {
      control: 'boolean',
      description: 'Whether to show the file list below the dropzone.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.accept !== undefined && args.accept !== '') attrs.push(`accept="${args.accept}"`);
  if (args.multiple) attrs.push('multiple');
  if (args.maxSize !== undefined) attrs.push(`max-size="${args.maxSize}"`);
  if (args.maxFiles !== undefined) attrs.push(`max-files="${args.maxFiles}"`);
  if (args.showFileList === false) attrs.push('show-file-list="false"');
  if (args.disabled) attrs.push('disabled');
  if (args.label !== undefined) attrs.push(`label="${args.label}"`);
  if (args.name !== undefined && args.name !== '') attrs.push(`name="${args.name}"`);
  return `<div style="max-width: 500px;"><ts-file-upload ${attrs.join(' ')}></ts-file-upload></div>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    label: 'Drop files here or click to upload',
    multiple: false,
    disabled: false,
  },
});

export const States = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Default</p>
      <ts-file-upload label="Drop files here or click to upload"></ts-file-upload>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Multiple files</p>
      <ts-file-upload label="Drop multiple files here" multiple></ts-file-upload>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Disabled</p>
      <ts-file-upload label="Upload is disabled" disabled></ts-file-upload>
    </div>
  </div>
`;

export const Variants = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Images only</p>
      <ts-file-upload accept=".jpg,.png,.gif,.webp" label="Drop images here (.jpg, .png, .gif, .webp)"></ts-file-upload>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Documents only</p>
      <ts-file-upload accept=".pdf,.doc,.docx" label="Drop documents here (.pdf, .doc, .docx)"></ts-file-upload>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Max 5MB per file</p>
      <ts-file-upload max-size="5242880" label="Drop files here (max 5MB each)" multiple></ts-file-upload>
    </div>
  </div>
`;

export const Composition = (): string => `
  <div style="max-width: 500px; font-family: sans-serif;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <h4 style="margin: 0 0 4px;">Upload Attachments</h4>
      <p style="margin: 0 0 16px; font-size: 14px; color: #666;">
        Supported formats: JPG, PNG, PDF. Maximum file size: 10MB.
      </p>
      <ts-file-upload
        accept=".jpg,.png,.pdf"
        multiple
        max-size="10485760"
        label="Drag and drop files here, or click to browse"
        name="attachments"
      ></ts-file-upload>
      <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
        <ts-button variant="primary">Upload Files</ts-button>
      </div>
    </div>
  </div>
`;

export const WithFileList = (): string => `
  <div style="max-width: 500px; font-family: sans-serif;">
    <p style="margin: 0 0 8px; font-size: 14px; color: #666;">
      Select files to see them listed below the dropzone. Each file shows its name, size, and a remove button.
    </p>
    <ts-file-upload
      multiple
      label="Drop files here to see the file list"
    ></ts-file-upload>
  </div>
`;

export const WithMaxFiles = (): string => `
  <div style="max-width: 500px; font-family: sans-serif;">
    <p style="margin: 0 0 8px; font-size: 14px; color: #666;">
      Limited to 3 files maximum. A capacity message appears when the limit is reached.
    </p>
    <ts-file-upload
      multiple
      max-files="3"
      label="Drop files here (max 3 files)"
    ></ts-file-upload>
  </div>
`;
