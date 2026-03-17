import {
  HeaderInitialState,
  HeaderReducer,
} from '@/components/layout/Header/types';

// Needed to use in useReducer() hook
const headerInitialState: HeaderInitialState = {
  navbarParentDsktp: null,
  navbarChildDsktp: null,
  isMenuVisibleDsktp: [false, null],
  selectedHorizontalNavLink: '',
  selectedVerticalNavLink: '',
  navbarChildOffsetDsktp: 0,
  navLinks: [],
  verticalNavScrollToElementId: '',
  isMenuVisibleMobile: false,
};

/**
 * A reducer function for managing the header state.
 * @param state - The current state of the header.
 * @param action - The action to be performed on the state.
 * @returns The updated state of the header.
 */
const headerReducer: HeaderReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAVBAR_OFFSET_DSKTP':
      return {
        ...state,
        navbarChildOffsetDsktp: action.navbarChildOffsetDsktp,
      };
    case 'UPDATE_NAVBAR_ELEMENTS_DSKTP':
      return {
        ...state,
        navbarParentDsktp: action.navbarParentDsktp,
        navbarChildDsktp: action.navbarChildDsktp,
      };
    case 'TOGGLE_MENU_DSKTP':
      return {
        ...state,
        isMenuVisibleDsktp: [action.isMenuVisible, action.menuCategory],
      };
    case 'SET_NAV_LINKS':
      return {
        ...state,
        navLinks: action.navLinks,
      };
    case 'SET_SELECTED_HORIZONTAL_NAV_LINK':
      return {
        ...state,
        selectedHorizontalNavLink: action.menuCategory,
      };
    case 'SET_SELECTED_VERTICAL_NAV_LINK':
      return {
        ...state,
        selectedVerticalNavLink: action.menuCategory,
      };
    case 'SET_VERTICAL_NAV_SCROLL_TO_ELEMENT_ID':
      return {
        ...state,
        verticalNavScrollToElementId: action.elementId,
      };
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        isMenuVisibleMobile: action.isMenuVisible,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export { headerReducer, headerInitialState };
