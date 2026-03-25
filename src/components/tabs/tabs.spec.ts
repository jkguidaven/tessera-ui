import { newSpecPage } from '@stencil/core/testing';
import { TsTabs } from './tabs';
import { TsTabPanel } from './tab-panel';

describe('ts-tabs', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs>
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    const tablist = page.root?.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist).not.toBeNull();

    const tabs = page.root?.shadowRoot?.querySelectorAll('[role="tab"]');
    expect(tabs?.length).toBe(2);
  });

  it('reflects variant prop', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs variant="pill">
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
        </ts-tabs>
      `,
    });

    expect(page.root?.getAttribute('variant')).toBe('pill');
  });

  it('reflects size prop', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs size="lg">
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
        </ts-tabs>
      `,
    });

    expect(page.root?.getAttribute('size')).toBe('lg');
  });

  it('sets aria-selected on the active tab', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs value="two">
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    const tabs = page.root?.shadowRoot?.querySelectorAll('[role="tab"]');
    expect(tabs?.[0]?.getAttribute('aria-selected')).toBe('false');
    expect(tabs?.[1]?.getAttribute('aria-selected')).toBe('true');
  });

  it('defaults to first non-disabled tab if no value set', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs>
          <ts-tab-panel tab="Tab 1" value="one" disabled>Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    expect(page.root?.getAttribute('value')).toBe('two');
  });

  it('marks disabled tabs with aria-disabled', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs>
          <ts-tab-panel tab="Tab 1" value="one" disabled>Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    const tabs = page.root?.shadowRoot?.querySelectorAll('[role="tab"]');
    expect(tabs?.[0]?.getAttribute('aria-disabled')).toBe('true');
    expect(tabs?.[0]?.hasAttribute('disabled')).toBe(true);
  });

  it('adds id and aria-controls to tab buttons', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs value="one">
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    const tabs = page.root?.shadowRoot?.querySelectorAll('[role="tab"]');
    expect(tabs?.[0]?.getAttribute('id')).toBe('tab-one');
    expect(tabs?.[0]?.getAttribute('aria-controls')).toBe('panel-one');
    expect(tabs?.[1]?.getAttribute('id')).toBe('tab-two');
    expect(tabs?.[1]?.getAttribute('aria-controls')).toBe('panel-two');
  });

  it('adds id and aria-labelledby to tab panels', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs value="one">
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    const panels = page.root?.querySelectorAll('ts-tab-panel');
    expect(panels?.[0]?.getAttribute('id')).toBe('panel-one');
    expect(panels?.[1]?.getAttribute('id')).toBe('panel-two');

    const panelDiv0 = panels?.[0]?.shadowRoot?.querySelector('[role="tabpanel"]');
    expect(panelDiv0?.getAttribute('aria-labelledby')).toBe('tab-one');

    const panelDiv1 = panels?.[1]?.shadowRoot?.querySelector('[role="tabpanel"]');
    expect(panelDiv1?.getAttribute('aria-labelledby')).toBe('tab-two');
  });

  it('emits tsChange when a tab is clicked', async () => {
    const page = await newSpecPage({
      components: [TsTabs, TsTabPanel],
      html: `
        <ts-tabs value="one">
          <ts-tab-panel tab="Tab 1" value="one">Content 1</ts-tab-panel>
          <ts-tab-panel tab="Tab 2" value="two">Content 2</ts-tab-panel>
        </ts-tabs>
      `,
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const tabs = page.root?.shadowRoot?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[1]?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
