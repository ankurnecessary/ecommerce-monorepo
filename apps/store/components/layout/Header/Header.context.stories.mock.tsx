import { headerContext } from '@/components/layout/Header/Header.context';
import {
  HeaderContext,
  HeaderContextOverrides,
  MenuCategory,
} from '@/components/layout/Header/types';
import { merge } from 'lodash';

const defaultContext: HeaderContext = {
  navLinks: [],
  setNavLinks: () => {},
  desktop: {
    isMenuVisible: [false, {} as MenuCategory],
    selectedHorizontalNavLink: '',
    setSelectedHorizontalNavLink: () => {},
    selectedVerticalNavLink: '',
    setSelectedVerticalNavLink: () => {},
    verticalNavScrollToElementId: '',
    setVerticalNavScrollToElementId: () => {},
    toggleMenu: () => {},
    navbar: {
      parent: null,
      child: null,
      childOffset: 0,
      setNavbarElementsDsktp: () => {},
      setNavbarOffsetDsktp: () => {},
    },
  },
  mobile: {
    isMenuVisible: false,
    toggleMenu: () => {},
  },
};

const MockHeaderContextProvider = ({
  children,
  overrides = {},
}: {
  children: React.ReactNode;
  overrides: HeaderContextOverrides;
}) => {
  const contextValue: HeaderContext = merge({}, defaultContext, overrides);

  return (
    <headerContext.Provider value={contextValue}>
      {children}
    </headerContext.Provider>
  );
};

export default MockHeaderContextProvider;
