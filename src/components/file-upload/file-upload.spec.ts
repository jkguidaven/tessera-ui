import { newSpecPage } from '@stencil/core/testing';
import { TsFileUpload } from './file-upload';

describe('ts-file-upload', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload></ts-file-upload>',
    });

    const dropzone = page.root?.shadowRoot?.querySelector('.file-upload__dropzone');
    expect(dropzone).not.toBeNull();
    expect(dropzone?.getAttribute('role')).toBe('button');
    expect(dropzone?.getAttribute('tabindex')).toBe('0');
  });

  it('renders default label text', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload></ts-file-upload>',
    });

    const dropzone = page.root?.shadowRoot?.querySelector('.file-upload__dropzone');
    expect(dropzone?.getAttribute('aria-label')).toBe('Drop files here or click to upload');
  });

  it('renders custom label', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload label="Upload your photo"></ts-file-upload>',
    });

    const dropzone = page.root?.shadowRoot?.querySelector('.file-upload__dropzone');
    expect(dropzone?.getAttribute('aria-label')).toBe('Upload your photo');
  });

  it('renders hidden file input', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload></ts-file-upload>',
    });

    const input = page.root?.shadowRoot?.querySelector('input[type="file"]');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets accept attribute on file input', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload accept=".jpg,.png"></ts-file-upload>',
    });

    const input = page.root?.shadowRoot?.querySelector('input[type="file"]');
    expect(input?.getAttribute('accept')).toBe('.jpg,.png');
  });

  it('sets multiple attribute when multiple is true', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload multiple></ts-file-upload>',
    });

    const input = page.root?.shadowRoot?.querySelector('input[type="file"]');
    expect(input?.hasAttribute('multiple')).toBe(true);
  });

  it('renders in disabled state', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload disabled></ts-file-upload>',
    });

    const dropzone = page.root?.shadowRoot?.querySelector('.file-upload__dropzone');
    expect(dropzone?.getAttribute('aria-disabled')).toBe('true');
    expect(dropzone?.getAttribute('tabindex')).toBe('-1');
  });

  it('sets name attribute on file input', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload name="avatar"></ts-file-upload>',
    });

    const input = page.root?.shadowRoot?.querySelector('input[type="file"]');
    expect(input?.getAttribute('name')).toBe('avatar');
  });
});
