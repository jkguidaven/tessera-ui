// Hand-written stories for ts-scroll-area

export default {
  title: 'Components/Scroll Area',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'The scroll orientation.',
    },
    maxHeight: {
      control: 'text',
      description: 'Optional max height for the scroll area.',
    },
  },
};

const generateParagraphs = (count: number): string =>
  Array.from(
    { length: count },
    (_, i) =>
      `<p style="margin: 0 0 8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Paragraph ${i + 1}.</p>`,
  ).join('\n');

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.orientation !== undefined && args.orientation !== null) attrs.push(`orientation="${args.orientation}"`);
  if (args.maxHeight !== undefined && args.maxHeight !== null && args.maxHeight !== '') attrs.push(`max-height="${args.maxHeight}"`);
  return `<ts-scroll-area ${attrs.join(' ')}>${generateParagraphs(12)}</ts-scroll-area>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    orientation: 'vertical',
    maxHeight: '300px',
  },
});

export const Horizontal = (): string => `
  <ts-scroll-area orientation="horizontal" max-height="200px">
    <div style="display: flex; gap: 16px; width: max-content; padding: 8px;">
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 1</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 2</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 3</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 4</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 5</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 6</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 7</div>
      <div style="min-width: 200px; height: 120px; background: var(--ts-color-neutral-100); border-radius: var(--ts-radius-md); display: flex; align-items: center; justify-content: center;">Card 8</div>
    </div>
  </ts-scroll-area>
`;

export const Both = (): string => `
  <ts-scroll-area orientation="both" max-height="300px">
    <div style="width: 1200px;">
      ${generateParagraphs(15)}
    </div>
  </ts-scroll-area>
`;
