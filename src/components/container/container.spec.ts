import { newSpecPage } from '@stencil/core/testing';
import { TsContainer } from './container';

describe('ts-container', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container></ts-container>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.tagName.toLowerCase()).toBe('ts-container');
  });

  it('reflects size prop with default lg', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container></ts-container>',
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('reflects custom size prop', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container size="sm"></ts-container>',
    });

    expect(page.root?.getAttribute('size')).toBe('sm');
  });

  it('applies padding by default', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container></ts-container>',
    });

    expect(page.root?.classList.contains('ts-container--no-padding')).toBe(false);
  });

  it('applies no-padding class when padding is false', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container padding="false"></ts-container>',
    });

    expect(page.root?.classList.contains('ts-container--no-padding')).toBe(true);
  });

  it('renders slotted content', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container><p>Hello</p></ts-container>',
    });

    const slotted = page.root?.querySelector('p');
    expect(slotted?.textContent).toBe('Hello');
  });

  it('accepts xl size', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container size="xl"></ts-container>',
    });

    expect(page.root?.getAttribute('size')).toBe('xl');
  });

  it('accepts full size', async () => {
    const page = await newSpecPage({
      components: [TsContainer],
      html: '<ts-container size="full"></ts-container>',
    });

    expect(page.root?.getAttribute('size')).toBe('full');
  });
});
