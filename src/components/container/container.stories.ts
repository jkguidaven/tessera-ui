// Hand-written stories for ts-container

export default {
  title: 'Layout/Container',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The maximum width of the container.',
    },
    padding: {
      control: 'boolean',
      description: 'Whether to apply horizontal padding.',
    },
  },
};

const contentStyle = 'padding: 24px; background: #f1f5f9; border-radius: 8px; font-family: sans-serif;';

export const Default = (): string => `
  <ts-container>
    <div style="${contentStyle}">
      <h2 style="margin: 0 0 8px;">Centered Container</h2>
      <p style="margin: 0; color: #64748b;">This content is centered within a max-width container with responsive padding.</p>
    </div>
  </ts-container>
`;

export const Sizes = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">sm (640px)</p>
      <ts-container size="sm">
        <div style="${contentStyle}">Small container</div>
      </ts-container>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">md (768px)</p>
      <ts-container size="md">
        <div style="${contentStyle}">Medium container</div>
      </ts-container>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">lg (1024px)</p>
      <ts-container size="lg">
        <div style="${contentStyle}">Large container</div>
      </ts-container>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">xl (1280px)</p>
      <ts-container size="xl">
        <div style="${contentStyle}">Extra large container</div>
      </ts-container>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">full (100%)</p>
      <ts-container size="full">
        <div style="${contentStyle}">Full width container</div>
      </ts-container>
    </div>
  </div>
`;

export const NoPadding = (): string => `
  <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">With padding (default)</p>
      <ts-container size="md">
        <div style="${contentStyle}">Padded container</div>
      </ts-container>
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Without padding</p>
      <ts-container size="md" padding="false">
        <div style="${contentStyle}">Flush container - no horizontal padding</div>
      </ts-container>
    </div>
  </div>
`;

export const Composition = (): string => `
  <ts-container size="lg">
    <div style="display: flex; flex-direction: column; gap: 24px; font-family: sans-serif;">
      <h1 style="margin: 0;">Page Title</h1>
      <p style="margin: 0; color: #64748b;">A full page layout using container, grid, and buttons.</p>
      <ts-grid columns="3" gap="4">
        <div style="padding: 20px; background: #eff6ff; border-radius: 8px;">
          <h3 style="margin: 0 0 8px;">Feature One</h3>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Description of the first feature.</p>
        </div>
        <div style="padding: 20px; background: #f0fdf4; border-radius: 8px;">
          <h3 style="margin: 0 0 8px;">Feature Two</h3>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Description of the second feature.</p>
        </div>
        <div style="padding: 20px; background: #fef3c7; border-radius: 8px;">
          <h3 style="margin: 0 0 8px;">Feature Three</h3>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Description of the third feature.</p>
        </div>
      </ts-grid>
      <div style="display: flex; gap: 12px;">
        <ts-button variant="primary">Get Started</ts-button>
        <ts-button variant="neutral" appearance="outline">Learn More</ts-button>
      </div>
    </div>
  </ts-container>
`;

export const DashboardLayout = (): string => `
  <ts-container size="xl">
    <div style="display: flex; gap: 24px; font-family: sans-serif;">
      <nav style="width: 200px; flex-shrink: 0; padding: 16px; background: #f8fafc; border-radius: 8px;">
        <h3 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; color: #94a3b8;">Navigation</h3>
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px;">
          <li><a href="#" style="display: block; padding: 8px 12px; border-radius: 6px; background: #e2e8f0; color: #1e293b; text-decoration: none; font-size: 14px;">Dashboard</a></li>
          <li><a href="#" style="display: block; padding: 8px 12px; border-radius: 6px; color: #64748b; text-decoration: none; font-size: 14px;">Analytics</a></li>
          <li><a href="#" style="display: block; padding: 8px 12px; border-radius: 6px; color: #64748b; text-decoration: none; font-size: 14px;">Reports</a></li>
          <li><a href="#" style="display: block; padding: 8px 12px; border-radius: 6px; color: #64748b; text-decoration: none; font-size: 14px;">Settings</a></li>
        </ul>
      </nav>
      <main style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
        <h2 style="margin: 0;">Dashboard Overview</h2>
        <ts-grid columns="3" gap="3">
          <div style="padding: 16px; background: #f1f5f9; border-radius: 8px;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #94a3b8;">Total Users</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold;">2,847</p>
          </div>
          <div style="padding: 16px; background: #f1f5f9; border-radius: 8px;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #94a3b8;">Revenue</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold;">$48.2k</p>
          </div>
          <div style="padding: 16px; background: #f1f5f9; border-radius: 8px;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #94a3b8;">Active Now</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold;">142</p>
          </div>
        </ts-grid>
        <div style="padding: 24px; background: #f8fafc; border-radius: 8px; min-height: 200px;">
          <h3 style="margin: 0 0 12px;">Recent Activity</h3>
          <p style="margin: 0; color: #94a3b8;">Activity feed would go here...</p>
        </div>
      </main>
    </div>
  </ts-container>
`;
