import { newE2EPage } from '@stencil/core/testing';

describe('ts-scroll-area e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-scroll-area><p>Scrollable content</p></ts-scroll-area>');

    const element = await page.find('ts-scroll-area');
    expect(element).toHaveClass('hydrated');
  });
});
