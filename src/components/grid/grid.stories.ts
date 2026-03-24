// Hand-written stories for ts-grid

export default {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'text',
      description: "Number of columns or 'auto' for responsive auto-fill.",
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8'],
      description: 'Spacing token number for gap.',
    },
    minColumnWidth: {
      control: 'text',
      description: 'Minimum column width for auto mode.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment of grid items.',
    },
  },
};

const cardStyle = 'padding: 24px; background: #f1f5f9; border-radius: 8px; font-family: sans-serif; text-align: center;';

export const Default = () => `
  <ts-grid>
    <div style="${cardStyle}">Card 1</div>
    <div style="${cardStyle}">Card 2</div>
    <div style="${cardStyle}">Card 3</div>
    <div style="${cardStyle}">Card 4</div>
    <div style="${cardStyle}">Card 5</div>
    <div style="${cardStyle}">Card 6</div>
  </ts-grid>
`;

export const FixedColumns = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">2 Columns</p>
      <ts-grid columns="2">
        <div style="${cardStyle}">Item 1</div>
        <div style="${cardStyle}">Item 2</div>
        <div style="${cardStyle}">Item 3</div>
        <div style="${cardStyle}">Item 4</div>
      </ts-grid>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">3 Columns</p>
      <ts-grid columns="3">
        <div style="${cardStyle}">Item 1</div>
        <div style="${cardStyle}">Item 2</div>
        <div style="${cardStyle}">Item 3</div>
        <div style="${cardStyle}">Item 4</div>
        <div style="${cardStyle}">Item 5</div>
        <div style="${cardStyle}">Item 6</div>
      </ts-grid>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">4 Columns</p>
      <ts-grid columns="4">
        <div style="${cardStyle}">Item 1</div>
        <div style="${cardStyle}">Item 2</div>
        <div style="${cardStyle}">Item 3</div>
        <div style="${cardStyle}">Item 4</div>
      </ts-grid>
    </div>
  </div>
`;

export const CustomMinWidth = () => `
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Min width: 150px</p>
      <ts-grid min-column-width="150px">
        <div style="${cardStyle}">A</div>
        <div style="${cardStyle}">B</div>
        <div style="${cardStyle}">C</div>
        <div style="${cardStyle}">D</div>
        <div style="${cardStyle}">E</div>
        <div style="${cardStyle}">F</div>
      </ts-grid>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #666;">Min width: 400px</p>
      <ts-grid min-column-width="400px">
        <div style="${cardStyle}">A</div>
        <div style="${cardStyle}">B</div>
        <div style="${cardStyle}">C</div>
      </ts-grid>
    </div>
  </div>
`;

export const Responsive = () => `
  <div>
    <p style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #666;">
      Resize the browser to see the grid reflow automatically.
    </p>
    <ts-grid min-column-width="240px" gap="4">
      <div style="${cardStyle}">Dashboard</div>
      <div style="${cardStyle}">Analytics</div>
      <div style="${cardStyle}">Reports</div>
      <div style="${cardStyle}">Settings</div>
      <div style="${cardStyle}">Users</div>
    </ts-grid>
  </div>
`;

export const Composition = () => `
  <ts-container size="lg">
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <h2 style="margin: 0; font-family: sans-serif;">Dashboard</h2>
      <ts-grid columns="3" gap="4">
        <div style="padding: 20px; background: #eff6ff; border-radius: 8px; font-family: sans-serif;">
          <h3 style="margin: 0 0 8px;">Revenue</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold;">$12,400</p>
        </div>
        <div style="padding: 20px; background: #f0fdf4; border-radius: 8px; font-family: sans-serif;">
          <h3 style="margin: 0 0 8px;">Users</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold;">1,240</p>
        </div>
        <div style="padding: 20px; background: #fef3c7; border-radius: 8px; font-family: sans-serif;">
          <h3 style="margin: 0 0 8px;">Orders</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold;">320</p>
        </div>
      </ts-grid>
      <ts-grid min-column-width="300px" gap="4">
        <div style="${cardStyle}">Recent Activity</div>
        <div style="${cardStyle}">Notifications</div>
        <div style="${cardStyle}">Quick Actions</div>
        <div style="${cardStyle}">Team Updates</div>
      </ts-grid>
    </div>
  </ts-container>
`;
