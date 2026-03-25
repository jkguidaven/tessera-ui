// Hand-written stories for ts-avatar

export default {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Image URL for the avatar.' },
    alt: { control: 'text', description: 'Alt text for the avatar image.' },
    name: { control: 'text', description: 'Name used to generate initials fallback.' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the avatar.',
    },
    variant: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape variant of the avatar.',
    },
    color: { control: 'color', description: 'Background color for the initials fallback.' },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator displayed on the avatar.',
    },
  },
};

const Template = (args: Record<string, unknown>): string => {
  const attrs: string[] = [];
  if (args.src !== undefined && args.src !== null && args.src !== '') attrs.push(`src="${args.src}"`);
  if (args.alt !== undefined && args.alt !== null && args.alt !== '') attrs.push(`alt="${args.alt}"`);
  if (args.name !== undefined && args.name !== null) attrs.push(`name="${args.name}"`);
  if (args.size !== undefined && args.size !== null) attrs.push(`size="${args.size}"`);
  if (args.variant !== undefined && args.variant !== null) attrs.push(`variant="${args.variant}"`);
  if (args.color !== undefined && args.color !== null) attrs.push(`color="${args.color}"`);
  if (args.status !== undefined && args.status !== null) attrs.push(`status="${args.status}"`);
  return `<ts-avatar ${attrs.join(' ')}></ts-avatar>`;
};

export const Default = Object.assign(Template.bind({}) as typeof Template & { args: Record<string, unknown> }, {
  args: {
    src: '',
    alt: '',
    name: 'James Kennedy',
    size: 'md',
    variant: 'circle',
    color: '#6366f1',
  },
});

export const Sizes = (): string => `
  <div style="display: flex; gap: 12px; align-items: center;">
    <ts-avatar size="xs" name="Alice Smith" color="#6366f1"></ts-avatar>
    <ts-avatar size="sm" name="Alice Smith" color="#6366f1"></ts-avatar>
    <ts-avatar size="md" name="Alice Smith" color="#6366f1"></ts-avatar>
    <ts-avatar size="lg" name="Alice Smith" color="#6366f1"></ts-avatar>
    <ts-avatar size="xl" name="Alice Smith" color="#6366f1"></ts-avatar>
  </div>
`;

export const Variants = (): string => `
  <div style="display: flex; gap: 16px; align-items: center;">
    <div style="text-align: center; font-family: sans-serif;">
      <ts-avatar variant="circle" name="James Kennedy" color="#2563eb" size="lg"></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Circle</div>
    </div>
    <div style="text-align: center; font-family: sans-serif;">
      <ts-avatar variant="square" name="James Kennedy" color="#2563eb" size="lg"></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Square</div>
    </div>
  </div>
`;

export const InitialsFallback = (): string => `
  <div style="display: flex; gap: 12px; align-items: center;">
    <ts-avatar name="James Kennedy" color="#6366f1" size="lg"></ts-avatar>
    <ts-avatar name="Alice Smith" color="#ec4899" size="lg"></ts-avatar>
    <ts-avatar name="Robert Chen" color="#14b8a6" size="lg"></ts-avatar>
    <ts-avatar name="Maria" color="#f59e0b" size="lg"></ts-avatar>
    <ts-avatar name="David Lee Park" color="#8b5cf6" size="lg"></ts-avatar>
  </div>
`;

export const WithImages = (): string => `
  <div style="display: flex; gap: 12px; align-items: center;">
    <ts-avatar
      src="https://i.pravatar.cc/150?u=user1"
      alt="User profile photo"
      name="Jane Doe"
      size="lg"
    ></ts-avatar>
    <ts-avatar
      src="https://i.pravatar.cc/150?u=user2"
      alt="User profile photo"
      name="John Smith"
      size="lg"
    ></ts-avatar>
    <ts-avatar
      src="https://i.pravatar.cc/150?u=user3"
      alt="User profile photo"
      name="Alex Johnson"
      size="lg"
    ></ts-avatar>
  </div>
`;

export const ImageErrorFallback = (): string => `
  <div style="display: flex; gap: 12px; align-items: center; font-family: sans-serif;">
    <div style="text-align: center;">
      <ts-avatar
        src="https://invalid-url.example.com/photo.jpg"
        name="Broken Image"
        color="#ef4444"
        size="lg"
      ></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Falls back to initials</div>
    </div>
  </div>
`;

export const WithStatus = (): string => `
  <div style="display: flex; gap: 16px; align-items: center; font-family: sans-serif;">
    <div style="text-align: center;">
      <ts-avatar name="Alice Smith" color="#6366f1" size="lg" status="online"></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Online</div>
    </div>
    <div style="text-align: center;">
      <ts-avatar name="Bob Jones" color="#2563eb" size="lg" status="offline"></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Offline</div>
    </div>
    <div style="text-align: center;">
      <ts-avatar name="Charlie Brown" color="#ec4899" size="lg" status="busy"></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Busy</div>
    </div>
    <div style="text-align: center;">
      <ts-avatar name="Diana Prince" color="#f59e0b" size="lg" status="away"></ts-avatar>
      <div style="font-size: 12px; margin-top: 4px; color: #666;">Away</div>
    </div>
  </div>
`;

export const AvatarGroupDefault = (): string => `
  <ts-avatar-group size="md">
    <ts-avatar name="Alice Smith" color="#6366f1"></ts-avatar>
    <ts-avatar name="Bob Jones" color="#2563eb"></ts-avatar>
    <ts-avatar name="Charlie Brown" color="#ec4899"></ts-avatar>
    <ts-avatar name="Diana Prince" color="#14b8a6"></ts-avatar>
    <ts-avatar name="Edward Kim" color="#f59e0b"></ts-avatar>
  </ts-avatar-group>
`;

export const AvatarGroupWithMax = (): string => `
  <ts-avatar-group size="md" max="4">
    <ts-avatar name="Alice Smith" color="#6366f1"></ts-avatar>
    <ts-avatar name="Bob Jones" color="#2563eb"></ts-avatar>
    <ts-avatar name="Charlie Brown" color="#ec4899"></ts-avatar>
    <ts-avatar name="Diana Prince" color="#14b8a6"></ts-avatar>
    <ts-avatar name="Edward Kim" color="#f59e0b"></ts-avatar>
    <ts-avatar name="Fiona Green" color="#8b5cf6"></ts-avatar>
    <ts-avatar name="George Hill" color="#ef4444"></ts-avatar>
    <ts-avatar name="Hannah Lee" color="#06b6d4"></ts-avatar>
  </ts-avatar-group>
`;

export const UserList = (): string => `
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; font-family: sans-serif;">
    <div style="display: flex; align-items: center; gap: 12px; padding: 8px;">
      <ts-avatar name="James Kennedy" color="#6366f1" size="sm"></ts-avatar>
      <div>
        <div style="font-weight: 500;">James Kennedy</div>
        <div style="font-size: 13px; color: #666;">james@example.com</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 8px;">
      <ts-avatar name="Alice Smith" color="#ec4899" size="sm"></ts-avatar>
      <div>
        <div style="font-weight: 500;">Alice Smith</div>
        <div style="font-size: 13px; color: #666;">alice@example.com</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 8px;">
      <ts-avatar name="Robert Chen" color="#14b8a6" size="sm"></ts-avatar>
      <div>
        <div style="font-weight: 500;">Robert Chen</div>
        <div style="font-size: 13px; color: #666;">robert@example.com</div>
      </div>
    </div>
  </div>
`;
