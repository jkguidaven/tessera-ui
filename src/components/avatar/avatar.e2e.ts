import { newE2EPage } from '@stencil/core/testing';

describe('ts-avatar e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-avatar name="Jane Doe"></ts-avatar>');

    const element = await page.find('ts-avatar');
    expect(element).toHaveClass('hydrated');
  });

  it('displays initials when no src is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-avatar name="John Smith"></ts-avatar>');

    const initials = await page.find('ts-avatar >>> .avatar__initials');
    expect(initials).not.toBeNull();
    expect(initials.textContent).toBe('JS');
  });

  it('has role="img" for accessibility', async () => {
    const page = await newE2EPage();
    await page.setContent('<ts-avatar name="Alice" alt="User avatar"></ts-avatar>');

    const base = await page.find('ts-avatar >>> .avatar__base');
    expect(base.getAttribute('role')).toBe('img');
    expect(base.getAttribute('aria-label')).toBe('User avatar');
  });
});
