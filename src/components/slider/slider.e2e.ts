import { newE2EPage } from '@stencil/core/testing';

describe('ts-slider e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-slider value="50"></ts-slider>');

    const element = await page.find('ts-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('responds to arrow key input', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-slider value="50" min="0" max="100" step="1"></ts-slider>');

    const tsChange = await page.spyOnEvent('tsChange');

    // Focus the thumb
    const thumb = await page.find('ts-slider >>> .slider__thumb');
    await thumb.focus();
    await page.waitForChanges();

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    expect(tsChange).toHaveReceivedEvent();
  });

  it('does not respond to keys when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-slider value="50" disabled></ts-slider>');

    const tsChange = await page.spyOnEvent('tsChange');

    const thumb = await page.find('ts-slider >>> .slider__thumb');
    await thumb.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    expect(tsChange).not.toHaveReceivedEvent();
  });

  it('is keyboard focusable', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-slider value="50" label="Volume"></ts-slider>');

    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const host = document.querySelector('ts-slider');
      return host?.shadowRoot?.activeElement?.getAttribute('role');
    });

    expect(focused).toBe('slider');
  });
});
