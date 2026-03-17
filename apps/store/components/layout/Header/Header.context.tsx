'use client';
import React, { createContext, useContext, useReducer } from 'react';
import {
  HeaderContext,
  ToggleMenu,
  SetNavbarElementsDsktp,
  SetNavbarOffsetDsktp,
  MenuCategory,
} from '@/components/layout/Header/types';
import {
  headerReducer,
  headerInitialState,
} from '@/components/layout/Header/Header.reducer';
// [ ] Change type HeaderContext to HeaderContextType
// Created header context
export const headerContext = createContext<HeaderContext>({
  navLinks: [],
  setNavLinks() {},
  desktop: {
    isMenuVisible: [false, {} as MenuCategory],
    selectedHorizontalNavLink: '',
    setSelectedHorizontalNavLink() {},
    selectedVerticalNavLink: '',
    setSelectedVerticalNavLink() {},
    verticalNavScrollToElementId: '',
    setVerticalNavScrollToElementId() {},
    toggleMenu() {},
    navbar: {
      parent: null,
      child: null,
      childOffset: 0,
      setNavbarElementsDsktp() {},
      setNavbarOffsetDsktp() {},
    },
  },
  mobile: {
    isMenuVisible: false,
    toggleMenu() {},
  },
});

/**
 * Provides the HeaderContext to its children.
 * This context manages the state and behavior of the header, including the navbar and menu visibility.
 *
 * @param children - The child components that will consume the context.
 */
export const HeaderContextProvider = ({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: MenuCategory[];
}) => {
  const [header, dispatchHeaderActions] = useReducer(
    headerReducer,
    headerInitialState,
  );

  /**
   * Toggles the visibility of the desktop menu.
   *
   * @param isMenuVisible - Whether the menu should be visible.
   * @param menuCategory - The category of the menu being toggled.
   */
  const toggleMenu: ToggleMenu = (isMenuVisible, menuCategory) => {
    dispatchHeaderActions({
      type: 'TOGGLE_MENU_DSKTP',
      isMenuVisible,
      menuCategory,
    });
  };

  /**
   * Sets the parent and child elements of the navbar.
   *
   * @param navbarParentDsktp - The parent element of the navbar.
   * @param navbarChildDsktp - The child element of the navbar.
   */
  const setNavbarElementsDsktp: SetNavbarElementsDsktp = (
    navbarParentDsktp,
    navbarChildDsktp,
  ) => {
    dispatchHeaderActions({
      type: 'UPDATE_NAVBAR_ELEMENTS_DSKTP',
      navbarParentDsktp,
      navbarChildDsktp,
    });
  };

  /**
   * To set navbar offset when scroll buttons are used.
   *
   * @param navbarChildOffsetDsktp - The offset of the child element.
   */
  const setNavbarOffsetDsktp: SetNavbarOffsetDsktp = (
    navbarChildOffsetDsktp,
  ) => {
    dispatchHeaderActions({
      type: 'UPDATE_NAVBAR_OFFSET_DSKTP',
      navbarChildOffsetDsktp,
    });
  };

  /**
   * Adds navigation links to the header state.
   *
   * @param navLinks - The navigation links to be added.
   */
  const setNavLinks = (navLinks: MenuCategory[]) => {
    dispatchHeaderActions({
      type: 'SET_NAV_LINKS',
      navLinks,
    });
  };

  /**
   * Sets the selected horizontal navigation link.
   *
   * @param category - The category to set as selected.
   */
  const setSelectedHorizontalNavLink = (category: string) => {
    dispatchHeaderActions({
      type: 'SET_SELECTED_HORIZONTAL_NAV_LINK',
      menuCategory: category,
    });
  };

  /**
   * Sets the selected vertical navigation link.
   *
   * @param category - The category to set as selected.
   */
  const setSelectedVerticalNavLink = (category: string) => {
    dispatchHeaderActions({
      type: 'SET_SELECTED_VERTICAL_NAV_LINK',
      menuCategory: category,
    });
  };

  /**
   * Sets the ID of the element to scroll to in the vertical navbar menu navigation.
   *
   * @param elementId - The ID of the element to scroll to.
   */
  const setVerticalNavScrollToElementId = (elementId: string) => {
    dispatchHeaderActions({
      type: 'SET_VERTICAL_NAV_SCROLL_TO_ELEMENT_ID',
      elementId,
    });
  };

  const toggleMobileMenu = (isMenuVisible: boolean) => {
    dispatchHeaderActions({
      type: 'TOGGLE_MOBILE_MENU',
      isMenuVisible,
    });
  };

  const contextValue: HeaderContext = {
    navLinks: categories || header.navLinks,
    setNavLinks,
    desktop: {
      isMenuVisible: header.isMenuVisibleDsktp,
      selectedHorizontalNavLink: header.selectedHorizontalNavLink,
      setSelectedHorizontalNavLink,
      selectedVerticalNavLink: header.selectedVerticalNavLink,
      setSelectedVerticalNavLink,
      verticalNavScrollToElementId: header.verticalNavScrollToElementId,
      setVerticalNavScrollToElementId,
      toggleMenu,
      navbar: {
        parent: header.navbarParentDsktp,
        child: header.navbarChildDsktp,
        childOffset: header.navbarChildOffsetDsktp,
        setNavbarElementsDsktp,
        setNavbarOffsetDsktp,
      },
    },
    mobile: {
      isMenuVisible: header.isMenuVisibleMobile,
      toggleMenu: toggleMobileMenu,
    },
  };

  return (
    <headerContext.Provider value={contextValue}>
      {children}
    </headerContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext<HeaderContext>(headerContext);
  if (!context) {
    throw new Error(
      'useHeaderContext must be used within a HeaderContextProvider',
    );
  }
  return context;
};
