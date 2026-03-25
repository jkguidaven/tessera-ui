import { newSpecPage } from '@stencil/core/testing';
import { TsPageHeader } from './page-header';

describe('ts-page-header', () => {
  it('renders with heading', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: '<ts-page-header heading="Dashboard"></ts-page-header>',
    });

    const heading = page.root?.shadowRoot?.querySelector('.page-header__heading');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toBe('Dashboard');
  });

  it('renders description when provided', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: '<ts-page-header heading="Settings" description="Manage your account settings"></ts-page-header>',
    });

    const description = page.root?.shadowRoot?.querySelector('.page-header__description');
    expect(description).not.toBeNull();
    expect(description?.textContent).toBe('Manage your account settings');
  });

  it('does not render description when not provided', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: '<ts-page-header heading="Dashboard"></ts-page-header>',
    });

    const description = page.root?.shadowRoot?.querySelector('.page-header__description');
    expect(description).toBeNull();
  });

  it('renders back link when backHref is provided', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: '<ts-page-header heading="Details" back-href="/list"></ts-page-header>',
    });

    const backLink = page.root?.shadowRoot?.querySelector('a.page-header__back');
    expect(backLink).not.toBeNull();
    expect(backLink?.getAttribute('href')).toBe('/list');
  });

  it('does not render back element when backHref is not provided', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: '<ts-page-header heading="Dashboard"></ts-page-header>',
    });

    const backLink = page.root?.shadowRoot?.querySelector('.page-header__back');
    expect(backLink).toBeNull();
  });

  it('renders breadcrumb slot', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: `
        <ts-page-header heading="Dashboard">
          <nav slot="breadcrumb">Home / Dashboard</nav>
        </ts-page-header>
      `,
    });

    const slotted = page.root?.querySelector('[slot="breadcrumb"]');
    expect(slotted).not.toBeNull();
  });

  it('renders actions slot', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: `
        <ts-page-header heading="Dashboard">
          <button slot="actions">Save</button>
        </ts-page-header>
      `,
    });

    const slotted = page.root?.querySelector('[slot="actions"]');
    expect(slotted).not.toBeNull();
  });

  it('renders tabs slot', async () => {
    const page = await newSpecPage({
      components: [TsPageHeader],
      html: `
        <ts-page-header heading="Dashboard">
          <div slot="tabs">Tab content</div>
        </ts-page-header>
      `,
    });

    const slotted = page.root?.querySelector('[slot="tabs"]');
    expect(slotted).not.toBeNull();
  });
});
