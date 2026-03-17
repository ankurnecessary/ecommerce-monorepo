import { describe, it, expect } from 'vitest';
import {
  headerInitialState,
  headerReducer,
} from '@/components/layout/Header/Header.reducer';

describe('headerReducer', () => {
  it('should handle UPDATE_NAVBAR_OFFSET_DSKTP', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'UPDATE_NAVBAR_OFFSET_DSKTP' as const,
      navbarChildOffsetDsktp: 100,
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      navbarChildOffsetDsktp: 100,
    });
  });

  it('should handle UPDATE_NAVBAR_ELEMENTS_DSKTP', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'UPDATE_NAVBAR_ELEMENTS_DSKTP' as const,
      navbarParentDsktp: 'parent',
      navbarChildDsktp: 'child',
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      navbarParentDsktp: 'parent',
      navbarChildDsktp: 'child',
    });
  });

  it('should handle TOGGLE_MENU_DSKTP', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'TOGGLE_MENU_DSKTP' as const,
      isMenuVisible: true,
      menuCategory: 'products',
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      isMenuVisibleDsktp: [true, 'products'],
    });
  });

  it('should handle SET_NAV_LINKS', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'SET_NAV_LINKS' as const,
      navLinks: ['link1', 'link2'],
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      navLinks: ['link1', 'link2'],
    });
  });

  it('should handle SET_SELECTED_HORIZONTAL_NAV_LINK', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'SET_SELECTED_HORIZONTAL_NAV_LINK' as const,
      menuCategory: 'products',
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      selectedHorizontalNavLink: 'products',
    });
  });

  it('should handle SET_SELECTED_VERTICAL_NAV_LINK', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'SET_SELECTED_VERTICAL_NAV_LINK' as const,
      menuCategory: 'products',
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      selectedVerticalNavLink: 'products',
    });
  });

  it('should handle SET_VERTICAL_NAV_SCROLL_TO_ELEMENT_ID', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'SET_VERTICAL_NAV_SCROLL_TO_ELEMENT_ID' as const,
      elementId: 'element1',
    };
    expect(headerReducer(initialState, action)).toEqual({
      ...initialState,
      verticalNavScrollToElementId: 'element1',
    });
  });

  it('should throw an error for unknown action type', () => {
    const initialState = { ...headerInitialState };
    const action = {
      type: 'UNKNOWN_ACTION' as const,
    } as unknown as Parameters<typeof headerReducer>[1];
    expect(() => headerReducer(initialState, action)).toThrow(
      'Unknown action: UNKNOWN_ACTION',
    );
  });
});
