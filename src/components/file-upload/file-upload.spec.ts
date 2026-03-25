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

  it('renders file list when files are selected', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload></ts-file-upload>',
    });

    const component = page.rootInstance as TsFileUpload;
    component.selectedFiles = [
      { name: 'test.txt', size: 5, type: 'text/plain' } as unknown as File,
      { name: 'doc.pdf', size: 1024, type: 'application/pdf' } as unknown as File,
    ];
    await page.waitForChanges();

    const fileList = page.root?.shadowRoot?.querySelector('.file-upload__list');
    expect(fileList).not.toBeNull();

    const items = page.root?.shadowRoot?.querySelectorAll('.file-upload__file');
    expect(items?.length).toBe(2);

    const firstName = items?.[0]?.querySelector('.file-upload__file-name');
    expect(firstName?.textContent).toBe('test.txt');
  });

  it('does not render file list when showFileList is false', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload show-file-list="false"></ts-file-upload>',
    });

    const component = page.rootInstance as TsFileUpload;
    component.selectedFiles = [
      { name: 'test.txt', size: 5, type: 'text/plain' } as unknown as File,
    ];
    await page.waitForChanges();

    const fileList = page.root?.shadowRoot?.querySelector('.file-upload__list');
    expect(fileList).toBeNull();
  });

  it('limits files by maxFiles', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload max-files="2" multiple></ts-file-upload>',
    });

    const component = page.rootInstance as TsFileUpload;

    component.selectedFiles = [
      { name: 'a.txt', size: 1, type: 'text/plain' } as unknown as File,
      { name: 'b.txt', size: 2, type: 'text/plain' } as unknown as File,
    ];
    await page.waitForChanges();

    const capacity = page.root?.shadowRoot?.querySelector('.file-upload__capacity');
    expect(capacity).not.toBeNull();
    expect(capacity?.textContent).toContain('Maximum 2 files reached');
  });

  it('emits tsRemove when a file is removed', async () => {
    const page = await newSpecPage({
      components: [TsFileUpload],
      html: '<ts-file-upload></ts-file-upload>',
    });

    const component = page.rootInstance as TsFileUpload;
    const file1 = { name: 'test.txt', size: 5, type: 'text/plain' } as unknown as File;
    const file2 = { name: 'doc.pdf', size: 1024, type: 'application/pdf' } as unknown as File;
    component.selectedFiles = [file1, file2];
    await page.waitForChanges();

    const removeSpy = jest.fn();
    page.root?.addEventListener('tsRemove', removeSpy);

    const removeBtn = page.root?.shadowRoot?.querySelectorAll('.file-upload__file-remove')?.[0] as HTMLButtonElement;
    removeBtn?.click();
    await page.waitForChanges();

    expect(removeSpy).toHaveBeenCalled();
    expect(component.selectedFiles.length).toBe(1);
    expect(component.selectedFiles[0].name).toBe('doc.pdf');
  });
});
