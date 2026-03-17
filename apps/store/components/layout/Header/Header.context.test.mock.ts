import { vi } from 'vitest';
import {
  HeaderContext,
  HeaderContextOverrides,
  MenuCategory,
} from '@/components/layout/Header/types';
import { merge } from 'lodash';

export const mockUseHeaderContext = (
  overrides: HeaderContextOverrides = {},
): HeaderContext => {
  const defaultContext: HeaderContext = {
    navLinks: [{ id: 'fkjffh1', url: '/newIn', name: 'New In' }],
    setNavLinks: vi.fn(),
    desktop: {
      isMenuVisible: [false, {} as MenuCategory],
      toggleMenu: vi.fn(),
      selectedHorizontalNavLink: '',
      setSelectedHorizontalNavLink: vi.fn(),
      selectedVerticalNavLink: '',
      setSelectedVerticalNavLink: vi.fn(),
      verticalNavScrollToElementId: '',
      setVerticalNavScrollToElementId: vi.fn(),
      navbar: {
        parent: null,
        child: null,
        setNavbarElementsDsktp: vi.fn(),
        childOffset: 0,
        setNavbarOffsetDsktp: vi.fn(),
      },
    },
    mobile: {
      isMenuVisible: false,
      toggleMenu: vi.fn(),
    },
  };
  return merge({}, defaultContext, overrides);
};
