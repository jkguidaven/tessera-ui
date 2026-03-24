import { newSpecPage } from '@stencil/core/testing';
import { TsChip } from './chip';

describe('ts-chip', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip>Label</ts-chip>',
    });

    const base = page.root?.shadowRoot?.querySelector('.chip__base');
    expect(base).not.toBeNull();
    expect(base?.getAttribute('role')).toBe('button');
    expect(base?.getAttribute('tabindex')).toBe('0');
  });

  it('reflects variant to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip variant="primary">Tag</ts-chip>',
    });

    expect(page.root?.getAttribute('variant')).toBe('primary');
  });

  it('reflects size to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip size="sm">Small</ts-chip>',
    });

    expect(page.root?.getAttribute('size')).toBe('sm');
  });

  it('renders remove button when removable', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip removable>Tag</ts-chip>',
    });

    const removeBtn = page.root?.shadowRoot?.querySelector('.chip__remove');
    expect(removeBtn).not.toBeNull();
    expect(removeBtn?.getAttribute('aria-label')).toBe('Remove');
  });

  it('does not render remove button when not removable', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip>Tag</ts-chip>',
    });

    const removeBtn = page.root?.shadowRoot?.querySelector('.chip__remove');
    expect(removeBtn).toBeNull();
  });

  it('emits tsClick when clicked', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip>Tag</ts-chip>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClick', spy);

    const base = page.root?.shadowRoot?.querySelector('.chip__base') as HTMLElement;
    base?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('emits tsRemove when remove button is clicked', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip removable>Tag</ts-chip>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsRemove', spy);

    const removeBtn = page.root?.shadowRoot?.querySelector('.chip__remove') as HTMLButtonElement;
    removeBtn?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not emit tsClick when disabled', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip disabled>Tag</ts-chip>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClick', spy);

    const base = page.root?.shadowRoot?.querySelector('.chip__base') as HTMLElement;
    base?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('sets aria-pressed when selected', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip selected>Active</ts-chip>',
    });

    const base = page.root?.shadowRoot?.querySelector('.chip__base');
    expect(base?.getAttribute('aria-pressed')).toBe('true');
  });

  it('renders prefix slot', async () => {
    const page = await newSpecPage({
      components: [TsChip],
      html: '<ts-chip><span slot="prefix">*</span>Tag</ts-chip>',
    });

    const prefix = page.root?.shadowRoot?.querySelector('.chip__prefix');
    expect(prefix).not.toBeNull();
  });
});
