import { newSpecPage } from '@stencil/core/testing';
import { TsAlert } from './alert';

describe('ts-alert', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsAlert],
      html: '<ts-alert>Something happened</ts-alert>',
    });

    expect(page.root?.getAttribute('variant')).toBe('info');
    expect(page.root?.getAttribute('role')).toBe('alert');
  });

  it('renders close button when closable', async () => {
    const page = await newSpecPage({
      components: [TsAlert],
      html: '<ts-alert closable>Dismissable</ts-alert>',
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.alert__close');
    expect(closeBtn).not.toBeNull();
    expect(closeBtn?.getAttribute('aria-label')).toBe('Close alert');
  });

  it('hides when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [TsAlert],
      html: '<ts-alert closable>Dismiss me</ts-alert>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsClose', spy);

    const closeBtn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('.alert__close');
    closeBtn?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not render close button by default', async () => {
    const page = await newSpecPage({
      components: [TsAlert],
      html: '<ts-alert>No close</ts-alert>',
    });

    const closeBtn = page.root?.shadowRoot?.querySelector('.alert__close');
    expect(closeBtn).toBeNull();
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsAlert],
      html: '<ts-alert variant="danger">Error!</ts-alert>',
    });

    expect(page.root?.getAttribute('variant')).toBe('danger');
  });
});
