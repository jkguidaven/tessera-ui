import { newSpecPage } from '@stencil/core/testing';
import { TsDialog } from './dialog';

describe('ts-dialog', () => {
  it('does not render content when closed', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog heading="Test">Content</ts-dialog>',
    });

    const dialog = page.root?.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('renders content when open', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog open heading="Confirm">Are you sure?</ts-dialog>',
    });

    const dialog = page.root?.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
  });

  it('renders heading with aria-labelledby', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog open heading="Delete Item">Content</ts-dialog>',
    });

    const header = page.root?.shadowRoot?.querySelector('.dialog__header');
    expect(header).not.toBeNull();
    expect(header?.textContent).toBe('Delete Item');

    const dialog = page.root?.shadowRoot?.querySelector('[role="dialog"]');
    const labelledBy = dialog?.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(header?.getAttribute('id')).toBe(labelledBy);
  });

  it('shows close button when dismissible', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog open heading="Test">Content</ts-dialog>',
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.dialog__close');
    expect(closeBtn).not.toBeNull();
    expect(closeBtn?.getAttribute('aria-label')).toBe('Close dialog');
  });

  it('hides close button when not dismissible', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog open heading="Test" dismissible="false">Content</ts-dialog>',
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.dialog__close');
    expect(closeBtn).toBeNull();
  });

  it('emits tsClose when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog open heading="Test">Content</ts-dialog>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClose', spy);

    const closeBtn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('.dialog__close');
    closeBtn?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsDialog],
      html: '<ts-dialog open heading="Test" size="lg">Content</ts-dialog>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.dialog__panel');
    expect(panel?.classList.contains('dialog__panel--lg')).toBe(true);
  });
});
