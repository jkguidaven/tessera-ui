import { newSpecPage } from '@stencil/core/testing';
import { TsTooltip } from './tooltip';

describe('ts-tooltip', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTooltip],
      html: '<ts-tooltip content="Hello"><button>Hover me</button></ts-tooltip>',
    });

    const popup = page.root?.shadowRoot?.querySelector('.tooltip__popup');
    expect(popup).not.toBeNull();
    expect(popup?.getAttribute('role')).toBe('tooltip');
    expect(popup?.textContent).toContain('Hello');
  });

  it('is hidden by default', async () => {
    const page = await newSpecPage({
      components: [TsTooltip],
      html: '<ts-tooltip content="Tip"><button>Hover</button></ts-tooltip>',
    });

    const popup = page.root?.shadowRoot?.querySelector('.tooltip__popup');
    expect(popup?.classList.contains('tooltip__popup--visible')).toBe(false);
    expect(popup?.getAttribute('aria-hidden')).toBe('true');
  });

  it('reflects placement prop', async () => {
    const page = await newSpecPage({
      components: [TsTooltip],
      html: '<ts-tooltip content="Tip" placement="bottom"><button>Below</button></ts-tooltip>',
    });

    expect(page.root?.getAttribute('placement')).toBe('bottom');
    const popup = page.root?.shadowRoot?.querySelector('.tooltip__popup');
    expect(popup?.classList.contains('tooltip__popup--bottom')).toBe(true);
  });
});
