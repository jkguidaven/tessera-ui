import { newSpecPage } from '@stencil/core/testing';
import { TsAvatarGroup } from './avatar-group';
import { TsAvatar } from '../avatar/avatar';

describe('ts-avatar-group', () => {
  it('renders children', async () => {
    const page = await newSpecPage({
      components: [TsAvatarGroup, TsAvatar],
      html: `
        <ts-avatar-group>
          <ts-avatar name="Alice Smith"></ts-avatar>
          <ts-avatar name="Bob Jones"></ts-avatar>
        </ts-avatar-group>
      `,
    });

    const avatars = page.root?.querySelectorAll('ts-avatar');
    expect(avatars?.length).toBe(2);
  });

  it('applies size to children', async () => {
    const page = await newSpecPage({
      components: [TsAvatarGroup, TsAvatar],
      html: `
        <ts-avatar-group size="lg">
          <ts-avatar name="Alice Smith"></ts-avatar>
          <ts-avatar name="Bob Jones"></ts-avatar>
        </ts-avatar-group>
      `,
    });

    const avatars = page.root?.querySelectorAll('ts-avatar');
    avatars?.forEach((avatar) => {
      expect(avatar.getAttribute('size')).toBe('lg');
    });
  });

  it('hides overflow children when max is set', async () => {
    const page = await newSpecPage({
      components: [TsAvatarGroup, TsAvatar],
      html: `
        <ts-avatar-group max="2">
          <ts-avatar name="Alice Smith"></ts-avatar>
          <ts-avatar name="Bob Jones"></ts-avatar>
          <ts-avatar name="Charlie Brown"></ts-avatar>
          <ts-avatar name="Diana Prince"></ts-avatar>
        </ts-avatar-group>
      `,
    });

    const avatars = page.root?.querySelectorAll('ts-avatar');
    expect((avatars?.[0] as HTMLElement).style.display).not.toBe('none');
    expect((avatars?.[1] as HTMLElement).style.display).not.toBe('none');
    expect((avatars?.[2] as HTMLElement).style.display).toBe('none');
    expect((avatars?.[3] as HTMLElement).style.display).toBe('none');
  });

  it('renders overflow indicator with correct count', async () => {
    const page = await newSpecPage({
      components: [TsAvatarGroup, TsAvatar],
      html: `
        <ts-avatar-group max="2">
          <ts-avatar name="Alice Smith"></ts-avatar>
          <ts-avatar name="Bob Jones"></ts-avatar>
          <ts-avatar name="Charlie Brown"></ts-avatar>
          <ts-avatar name="Diana Prince"></ts-avatar>
        </ts-avatar-group>
      `,
    });

    const overflow = page.root?.querySelector('.avatar-group__overflow');
    expect(overflow).not.toBeNull();
    expect(overflow?.textContent).toBe('+2');
  });
});
