import { newSpecPage } from '@stencil/core/testing';
import { TsTimeline } from './timeline';
import { TsTimelineItem } from './timeline-item';

describe('ts-timeline', () => {
  it('renders with role="list"', async () => {
    const page = await newSpecPage({
      components: [TsTimeline],
      html: '<ts-timeline></ts-timeline>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('list');
  });

  it('renders timeline items', async () => {
    const page = await newSpecPage({
      components: [TsTimeline, TsTimelineItem],
      html: `
        <ts-timeline>
          <ts-timeline-item>First event</ts-timeline-item>
          <ts-timeline-item>Second event</ts-timeline-item>
        </ts-timeline>
      `,
    });

    const items = page.root?.querySelectorAll('ts-timeline-item');
    expect(items?.length).toBe(2);
  });
});

describe('ts-timeline-item', () => {
  it('renders with default variant', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item>Event content</ts-timeline-item>',
    });

    expect(page.root).not.toBeNull();
    expect(page.root?.getAttribute('role')).toBe('listitem');
    expect(page.root?.getAttribute('variant')).toBe('primary');
  });

  it('reflects variant prop to host attribute', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item variant="danger">Error occurred</ts-timeline-item>',
    });

    expect(page.root?.getAttribute('variant')).toBe('danger');
  });

  it('renders timestamp when provided', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item timestamp="March 15, 2026">Event</ts-timeline-item>',
    });

    const time = page.root?.shadowRoot?.querySelector('.timeline-item__timestamp');
    expect(time).not.toBeNull();
    expect(time?.textContent).toBe('March 15, 2026');
  });

  it('does not render timestamp when not provided', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item>Event</ts-timeline-item>',
    });

    const time = page.root?.shadowRoot?.querySelector('.timeline-item__timestamp');
    expect(time).toBeNull();
  });

  it('renders icon when provided', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item icon="check">Completed</ts-timeline-item>',
    });

    const icon = page.root?.shadowRoot?.querySelector('ts-icon');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('name')).toBe('check');
  });

  it('renders dot slot when no icon is provided', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item>Event</ts-timeline-item>',
    });

    const dot = page.root?.shadowRoot?.querySelector('.timeline-item__dot');
    expect(dot).not.toBeNull();
    const slotEl = dot?.querySelector('slot[name="dot"]');
    expect(slotEl).not.toBeNull();
  });

  it('renders the marker and content sections', async () => {
    const page = await newSpecPage({
      components: [TsTimelineItem],
      html: '<ts-timeline-item>Some content</ts-timeline-item>',
    });

    const marker = page.root?.shadowRoot?.querySelector('.timeline-item__marker');
    const content = page.root?.shadowRoot?.querySelector('.timeline-item__content');
    const line = page.root?.shadowRoot?.querySelector('.timeline-item__line');
    expect(marker).not.toBeNull();
    expect(content).not.toBeNull();
    expect(line).not.toBeNull();
  });
});
