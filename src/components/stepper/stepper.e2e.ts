import { newE2EPage } from '@stencil/core/testing';

describe('ts-stepper e2e', () => {
  it('renders on the page', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-stepper>
        <ts-step label="Step 1"></ts-step>
        <ts-step label="Step 2"></ts-step>
        <ts-step label="Step 3"></ts-step>
      </ts-stepper>
    `);

    const element = await page.find('ts-stepper');
    expect(element).toHaveClass('hydrated');
  });

  it('marks active step with data-active', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-stepper active-step="1">
        <ts-step label="Step 1"></ts-step>
        <ts-step label="Step 2"></ts-step>
        <ts-step label="Step 3"></ts-step>
      </ts-stepper>
    `);

    await page.waitForChanges();

    const activeStep = await page.find('ts-step[data-active]');
    expect(activeStep).not.toBeNull();
    expect(activeStep.getAttribute('data-index')).toBe('1');
  });

  it('renders completed step with checkmark', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ts-stepper active-step="1">
        <ts-step label="Step 1" completed></ts-step>
        <ts-step label="Step 2"></ts-step>
      </ts-stepper>
    `);

    const completedStep = await page.find('ts-step[completed]');
    expect(completedStep).not.toBeNull();

    const indicator = await completedStep.find('>>> .step__indicator--completed');
    expect(indicator).not.toBeNull();
  });
});
