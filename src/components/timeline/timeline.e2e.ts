import { newE2EPage } from '@stencil/core/testing';

describe('ts-timeline e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-timeline>
        <ts-timeline-item>First event</ts-timeline-item>
        <ts-timeline-item>Second event</ts-timeline-item>
      </ts-timeline>
    `);

    const timeline = await page.find('ts-timeline');
    expect(timeline).toHaveClass('hydrated');

    const items = await page.findAll('ts-timeline-item');
    expect(items.length).toBe(2);
    expect(items[0]).toHaveClass('hydrated');
  });
});
