import { PartialDeep } from 'type-fest';

/**
 * Toggles the visibility of the desktop menu.
 * @param isMenuVisible - Whether the menu should be visible.
 * @param menuCategory - The category of the menu being toggled.
 */
export type ToggleMenu = (
  isMenuVisible: boolean,
  menuCategory: MenuCategory | null,
) => void;

export type HeaderInitialState = {
  /**
   * The parent element of the horizontal navbar in which child scrolls.
   */
  navbarParentDsktp: HTMLDivElement | null;
  /**
   * The child element in the horizontal navbar which is scrollable.
   */
  navbarChildDsktp: HTMLDivElement | null;
  /**
   * Indicates whether the desktop menu is visible and the current menu category.
   * The first element is a boolean for visibility, and the second is the menu category.
   */
  isMenuVisibleDsktp: [boolean, MenuCategory | null];
  /**
   * The current menu category selected in the horizontal category navigation in header.
   */
  selectedHorizontalNavLink: string;
  /**
   * The current menu category selected in the vertical category links in navbar menu.
   */
  selectedVerticalNavLink: string;
  /**
   * The offset of the child element in the horizontal navbar which is scrollable.
   */
  navbarChildOffsetDsktp: number;
  /**
   * The navigation links displayed in the header. Either vertical or horizontal.
   * The links are common for both desktop and mobile.
   */
  navLinks: Array<MenuCategory>;
  /**
   * The ID of the element to scroll to in the vertical navbar menu navigation.
   */
  verticalNavScrollToElementId: string;
  /**
   * Indicates whether the mobile menu is visible.
   */
  isMenuVisibleMobile: boolean;
};

/**
 * Sets the parent and child elements of the navbar.
 * @param navbarParentDsktp - The parent element of the navbar.
 * @param navbarChildDsktp - The child element of the navbar.
 */
export type SetNavbarElementsDsktp = (
  navbarParent: HTMLDivElement,
  navbarChild: HTMLDivElement,
) => void;

/**
 * Sets the offset of the child element in the navbar.
 * @param navbarChildOffsetDsktp - The offset of the child element.
 */
export type SetNavbarOffsetDsktp = (navbarChildOffsetDsktp: number) => void;

/**
 * A reducer function for managing the header state.
 * @param state - The current state of the header.
 * @param action - The action to be performed on the state.
 * @returns The updated state of the header.
 */
export type HeaderReducer = (
  state: HeaderInitialState,
  action: {
    type:
      | 'UPDATE_NAVBAR_ELEMENTS_DSKTP'
      | 'TOGGLE_MENU_DSKTP'
      | 'UPDATE_NAVBAR_OFFSET_DSKTP'
      | `SET_NAV_LINKS`
      | 'SET_SELECTED_HORIZONTAL_NAV_LINK'
      | 'SET_SELECTED_VERTICAL_NAV_LINK'
      | 'SET_VERTICAL_NAV_SCROLL_TO_ELEMENT_ID'
      | 'TOGGLE_MOBILE_MENU';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
) => HeaderInitialState;

/**
 * Represents a sub-category under a category
 */
export type MenuSubCategory = {
  /**
   * Id of the sub-category
   */
  id: string;
  /**
   * Name of a sub-category
   */
  name: string;
  /**
   * URL of the image that will be used for the sub-category in menu
   */
  imagePath: string;
  /**
   * link to navigate to the sub-category page
   */
  url: string;
};

/**
 * A navigation links displayed in the navbar. Common for both desktop and mobile.
 */
export type MenuCategory = {
  /**
   * Id of the category
   */
  id: string;
  /**
   * URL of the category page
   */
  url: string;
  /**
   * Label of the category
   */
  name: string;
  /**
   * Collection of sub-categories in a category
   */
  subcategories?: Array<MenuSubCategory>;
};

/**
 * A function that adds navigation links to the header context.
 * @param navLinks - An array of navigation links to be added.
 */
export type SetNavLinks = (navLinks: Array<MenuCategory>) => void;

/**
 * Represents the structure of the HeaderContext.
 */
export type HeaderContext = {
  /**
   * An array of navigation links displayed in the header.
   */
  navLinks: Array<MenuCategory>;
  /**
   * A function that adds navigation links to the header context.
   * @param navLinks - An array of navigation links to be added.
   */
  setNavLinks: SetNavLinks;
  /**
   * Desktop-specific properties and methods.
   */
  desktop: {
    /**
     * Indicates whether the desktop menu is visible and the current menu category.
     * The first element is a boolean for visibility, and the second is the menu category.
     */
    isMenuVisible: [boolean, MenuCategory | null];
    /**
     * The current menu category selected in the horizontal category navigation in header.
     */
    selectedHorizontalNavLink: string;
    /**
     * Sets the current menu category selected in the horizontal category navigation in header.
     * @param category - The category to set as selected.
     */
    setSelectedHorizontalNavLink: (category: string) => void;
    /**
     * The current menu category selected in the vertical category links in navbar menu.
     */
    selectedVerticalNavLink: string;
    /**
     * Sets the current menu category selected in the vertical category links in navbar menu.
     * @param category - The category to set as selected.
     */
    setSelectedVerticalNavLink: (category: string) => void;
    /**
     * The ID of the element to scroll to in the vertical navbar menu navigation.
     */
    verticalNavScrollToElementId: string;
    /**
     * Sets the ID of the element to scroll to in the vertical navbar menu navigation.
     * @param elementId - The ID of the element to scroll to.
     */
    setVerticalNavScrollToElementId: (elementId: string) => void;
    /**
     * Toggles the visibility of the desktop navbar menu.
     * @param isMenuVisible - Whether the menu should be visible.
     * @param menuCategory - The category of the menu being toggled.
     */
    toggleMenu: ToggleMenu;
    /**
     * Navbar-related properties and methods for the desktop view.
     */
    navbar: {
      /**
       * The parent element of the navbar.
       */
      parent: HTMLDivElement | null;
      /**
       * The child element of the navbar.
       */
      child: HTMLDivElement | null;
      /**
       * The offset of the child element in the navbar.
       */
      childOffset: number;
      /**
       * Sets the parent and child elements of the navbar.
       * @param navbarParentDsktp - The parent element of the navbar.
       * @param navbarChildDsktp - The child element of the navbar.
       */
      setNavbarElementsDsktp: SetNavbarElementsDsktp;
      /**
       * Sets the offset of the child element in the navbar.
       * @param navbarChildOffsetDsktp - The offset of the child element.
       */
      setNavbarOffsetDsktp: SetNavbarOffsetDsktp;
    };
  };
  /**
   * Mobile-specific properties and methods (if any).
   */
  mobile: {
    /**
     * Indicates whether the mobile menu is visible.
     */
    isMenuVisible: boolean;
    /**
     * Toggles the visibility of the desktop navbar menu.
     * @param isMenuVisible - Whether the menu should be visible.
     * @param menuCategory - The category of the menu being toggled.
     */
    toggleMenu: ToggleMobileMenu;
  };
};

/**
 * A function that toggles the visibility of the mobile menu.
 * @param isMenuVisible - Whether the menu should be visible.
 */
export type ToggleMobileMenu = (isMenuVisible: boolean) => void;

/**
 * A function that calculates the offset for the navbar based on the direction.
 * @param directions - The direction to calculate the offset ('left' or 'right').
 * @returns A function that takes the parent and child navbar elements and returns a function that takes an offset value.
 */
export type CalculateOffset = (
  directions: 'left' | 'right',
) => (navbarParent: number, navbarChild: number) => (offset: number) => number;

/**
 * A function that handles mouse events for the navbar.
 * @param e - The mouse event.
 */
export type NavbarMouseEvent = (
  e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
) => void;

export type CategoryMouseEventHandler = (
  category: MenuCategory,
) => NavbarMouseEvent;

/**
 * A type that will help in using object in partial way.
 * It allows to override only the properties that are needed via a **parameter in a function**.
 */
export type HeaderContextOverrides = PartialDeep<HeaderContext>;
