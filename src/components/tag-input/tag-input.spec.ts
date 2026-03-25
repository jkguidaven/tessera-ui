import { newSpecPage } from '@stencil/core/testing';
import { TsTagInput } from './tag-input';

describe('ts-tag-input', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags"></ts-tag-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('type')).toBe('text');
  });

  it('adds a tag on Enter key', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags"></ts-tag-input>',
    });

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();

    // Simulate typing
    page.rootInstance.inputValue = 'hello';
    page.rootInstance.handleKeyDown({ key: 'Enter', preventDefault: jest.fn() } as unknown as KeyboardEvent);
    await page.waitForChanges();

    expect(page.rootInstance.value).toEqual(['hello']);
    expect(spy).toHaveBeenCalled();
  });

  it('removes a tag when remove button is clicked', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags"></ts-tag-input>',
    });

    page.rootInstance.value = ['one', 'two', 'three'];
    await page.waitForChanges();

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    page.rootInstance.removeTag(1);
    await page.waitForChanges();

    expect(page.rootInstance.value).toEqual(['one', 'three']);
    expect(spy).toHaveBeenCalled();
  });

  it('prevents duplicate tags by default', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags"></ts-tag-input>',
    });

    page.rootInstance.value = ['hello'];
    page.rootInstance.inputValue = 'hello';
    page.rootInstance.handleKeyDown({ key: 'Enter', preventDefault: jest.fn() } as unknown as KeyboardEvent);
    await page.waitForChanges();

    expect(page.rootInstance.value).toEqual(['hello']);
  });

  it('respects maxTags limit', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags" max-tags="2"></ts-tag-input>',
    });

    page.rootInstance.value = ['one', 'two'];
    page.rootInstance.inputValue = 'three';
    page.rootInstance.handleKeyDown({ key: 'Enter', preventDefault: jest.fn() } as unknown as KeyboardEvent);
    await page.waitForChanges();

    expect(page.rootInstance.value).toEqual(['one', 'two']);
  });

  it('renders label', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Categories"></ts-tag-input>',
    });

    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('Categories');
  });

  it('renders error state', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags" error="At least one tag required"></ts-tag-input>',
    });

    const errorEl = page.root?.shadowRoot?.querySelector('.tag-input__error');
    expect(errorEl).not.toBeNull();
    expect(errorEl?.textContent).toBe('At least one tag required');

    const wrapper = page.root?.shadowRoot?.querySelector('.tag-input__wrapper');
    expect(wrapper?.classList.contains('tag-input__wrapper--error')).toBe(true);
  });

  it('sets disabled state', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags" disabled></ts-tag-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });

  it('removes last tag on Backspace with empty input', async () => {
    const page = await newSpecPage({
      components: [TsTagInput],
      html: '<ts-tag-input label="Tags"></ts-tag-input>',
    });

    page.rootInstance.value = ['one', 'two'];
    page.rootInstance.inputValue = '';

    const spy = jest.fn();
    page.root?.addEventListener('tsChange', spy);

    page.rootInstance.handleKeyDown({ key: 'Backspace', preventDefault: jest.fn() } as unknown as KeyboardEvent);
    await page.waitForChanges();

    expect(page.rootInstance.value).toEqual(['one']);
    expect(spy).toHaveBeenCalled();
  });
});
