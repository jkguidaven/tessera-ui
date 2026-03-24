import { newSpecPage } from '@stencil/core/testing';
import { TsAccordion } from './accordion';
import { TsAccordionItem } from './accordion-item';

describe('ts-accordion', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsAccordion],
      html: '<ts-accordion></ts-accordion>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.shadowRoot).not.toBeNull();
  });

  it('renders slotted accordion items', async () => {
    const page = await newSpecPage({
      components: [TsAccordion, TsAccordionItem],
      html: `
        <ts-accordion>
          <ts-accordion-item heading="Item 1">Content 1</ts-accordion-item>
          <ts-accordion-item heading="Item 2">Content 2</ts-accordion-item>
        </ts-accordion>
      `,
    });

    const items = page.root?.querySelectorAll('ts-accordion-item');
    expect(items?.length).toBe(2);
  });

  it('accepts multiple prop', async () => {
    const page = await newSpecPage({
      components: [TsAccordion],
      html: '<ts-accordion multiple></ts-accordion>',
    });

    expect(page.rootInstance.multiple).toBe(true);
  });

  it('defaults multiple to false', async () => {
    const page = await newSpecPage({
      components: [TsAccordion],
      html: '<ts-accordion></ts-accordion>',
    });

    expect(page.rootInstance.multiple).toBe(false);
  });

  it('renders a slot for child content', async () => {
    const page = await newSpecPage({
      components: [TsAccordion],
      html: '<ts-accordion></ts-accordion>',
    });

    const slot = page.root?.shadowRoot?.querySelector('slot');
    expect(slot).not.toBeNull();
  });
});

describe('ts-accordion-item', () => {
  it('renders with heading', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Test Heading">Content</ts-accordion-item>',
    });

    const heading = page.root?.shadowRoot?.querySelector('.accordion-item__heading');
    expect(heading?.textContent).toBe('Test Heading');
  });

  it('renders as collapsed by default', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Title">Content</ts-accordion-item>',
    });

    const header = page.root?.shadowRoot?.querySelector('.accordion-item__header');
    expect(header?.getAttribute('aria-expanded')).toBe('false');

    const panel = page.root?.shadowRoot?.querySelector('.accordion-item__panel');
    expect(panel?.hasAttribute('hidden')).toBe(true);
  });

  it('renders as expanded when open prop is set', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Title" open>Content</ts-accordion-item>',
    });

    const header = page.root?.shadowRoot?.querySelector('.accordion-item__header');
    expect(header?.getAttribute('aria-expanded')).toBe('true');

    const panel = page.root?.shadowRoot?.querySelector('.accordion-item__panel');
    expect(panel?.hasAttribute('hidden')).toBe(false);
  });

  it('has correct ARIA attributes', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Title">Content</ts-accordion-item>',
    });

    const header = page.root?.shadowRoot?.querySelector('.accordion-item__header');
    const panel = page.root?.shadowRoot?.querySelector('.accordion-item__panel');

    expect(header?.getAttribute('role')).toBe('button');
    expect(header?.hasAttribute('aria-controls')).toBe(true);
    expect(header?.hasAttribute('aria-expanded')).toBe(true);
    expect(panel?.getAttribute('role')).toBe('region');
    expect(panel?.hasAttribute('aria-labelledby')).toBe(true);

    // Verify IDs link correctly
    const headerId = header?.getAttribute('id');
    const panelId = panel?.getAttribute('id');
    expect(header?.getAttribute('aria-controls')).toBe(panelId);
    expect(panel?.getAttribute('aria-labelledby')).toBe(headerId);
  });

  it('emits tsToggle event on click', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Title">Content</ts-accordion-item>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsToggle', spy);

    const header = page.root?.shadowRoot?.querySelector('.accordion-item__header') as HTMLElement;
    header?.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ open: true });
  });

  it('does not emit tsToggle when disabled', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Title" disabled>Content</ts-accordion-item>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsToggle', spy);

    const header = page.root?.shadowRoot?.querySelector('.accordion-item__header') as HTMLElement;
    header?.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('sets tabindex to -1 when disabled', async () => {
    const page = await newSpecPage({
      components: [TsAccordionItem],
      html: '<ts-accordion-item heading="Title" disabled>Content</ts-accordion-item>',
    });

    const header = page.root?.shadowRoot?.querySelector('.accordion-item__header');
    expect(header?.getAttribute('tabindex')).toBe('-1');
  });
});
