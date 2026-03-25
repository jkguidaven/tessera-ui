import { newE2EPage } from '@stencil/core/testing';

describe('ts-avatar-group e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-avatar-group>
        <ts-avatar name="Alice Smith"></ts-avatar>
        <ts-avatar name="Bob Jones"></ts-avatar>
      </ts-avatar-group>
    `);

    const element = await page.find('ts-avatar-group');
    expect(element).toHaveClass('hydrated');
  });
});
