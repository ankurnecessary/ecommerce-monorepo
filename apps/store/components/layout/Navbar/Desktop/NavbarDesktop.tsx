"use client";
import React from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import {
  CategoryEventHandler,
  HeaderContext,
  MenuCategory,
  NavbarMouseEvent,
} from "@/components/layout/Header/types";
import NavbarLinks from "@/components/layout/Navbar/Desktop/NavbarLinks";
import NavbarScroller from "@/components/layout/Navbar/Desktop/NavbarScroller";
import { ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants";
import { cn } from "@repo/ui/lib/utils";
// [x] Check how horizontal menu nav items are getting highlighted on hover on shien.com.
// [x]: test-case: Check how horizontal menu nav items are getting highlighted on hover on shien.com.
// [x]: test-case: Add test cases for the navbar menu flap's category section.
// [x] Convert navbar links into an array of objects and map through them to create the links dynamically.
// [x] Check why scrollbar is not working in firefox.
// [x] Check backdrop of the menubar.
// [x] Check when you slowly take the mouse out of the navbar menu link, the menu drawer takes a jump.
// [x]: Write test cases for the VerticalScrollContainer component.
// [x] Set hover behavior for the vertical category links in navbar menu.
// [x] Add CSS skeleton for the navbar menu.
// [x] Add autoscroll feature in VerticalScrollContainer component. So that when a user hovers over the categories in the horizontal navbar, the vertical scroll area scrolls to the hovered category.
// [x] After navbar menu gets visible, when we bring our mouse pointer on the right and left arrow buttons, the menu hides. It should not hide. Fix this issue.
// [x] Initially, scroll buttons are getting disabled on first load of the component. Atleast one of them should be enabled. Fix this issue.
// [x] Hide horizontal scrollbar buttons from the navbar menu if the categories reel don't outgrow it's parent container.
const NavbarDesktop = () => {
  const {
    navLinks,
    desktop: {
      toggleMenu,
      isRestoringMenuFocusRef,
      menuReturnFocusRef,
      categoryButtonRefs,
      selectedHorizontalNavLink,
      setSelectedHorizontalNavLink,
      setSelectedVerticalNavLink,
      setVerticalNavScrollToElementId,
      isMenuVisible,
    },
  }: HeaderContext = useHeaderContext();

  // Rendering this component only on desktop devices
  const isDesktop = useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
  if (!isDesktop) return null;

  const showCategoryMenu = (category: MenuCategory, categoryName: string) => {
    toggleMenu(true, category);
    setSelectedHorizontalNavLink(categoryName || "");
    setSelectedVerticalNavLink(category.name || "");
    setVerticalNavScrollToElementId(
      category.id ? `vertical-${category.id}` : "",
    );
  };

  const mouseOverHandler: CategoryEventHandler =
    (category: MenuCategory): NavbarMouseEvent =>
    (e) => {
      e.stopPropagation();
      showCategoryMenu(category, category.name);
    };

  const showCategoryMenuHandler =
    (navLink: MenuCategory) =>
    (e: React.SyntheticEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.stopPropagation();
      const link = e.currentTarget;
      showCategoryMenu(navLink, link.textContent);
      menuReturnFocusRef.current = link;
    };

  const focusHandler = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (isRestoringMenuFocusRef.current) {
      isRestoringMenuFocusRef.current = false;
      return;
    }
    showCategoryMenuHandler(navLinks[0])(e);
  };

  const mouseOutHandler = (category: MenuCategory) => () => {
    toggleMenu(false, category);
    setSelectedHorizontalNavLink("");
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    showCategoryMenuHandler(navLinks[0])(e);
    requestAnimationFrame(() => {
      categoryButtonRefs.current[0].focus();
    });
  };

  const keyDownHandler =
    (navLink: MenuCategory, index: number) =>
    (e: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (e.key !== "ArrowDown") return;
      showCategoryMenuHandler(navLink)(e);
      requestAnimationFrame(() => {
        categoryButtonRefs.current[index].focus();
      });
    };

  return (
    <nav className="container mx-auto hidden w-[calc(100%-4rem)] px-6 text-sm lg:flex">
      {/* Category button */}
      <div className="whitespace-nowrap">
        <button
          className={cn(
            "relative inline-block p-2 pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:content-[''] translate-y-px",
            {
              "bg-primary/10 after:scale-x-100":
                selectedHorizontalNavLink === "Categories",
            },
          )}
          type="button"
          aria-expanded={isMenuVisible[0]}
          aria-controls="navbar-menu"
          aria-describedby="category-menu-instructions"
          onFocus={focusHandler}
          onBlur={mouseOutHandler(navLinks[0])}
          onMouseOver={showCategoryMenuHandler(navLinks[0])}
          onMouseOut={mouseOutHandler(navLinks[0])}
          onClick={clickHandler}
          onKeyDown={keyDownHandler(navLinks[0], 0)}
        >
          Categories
          <ChevronDown
            className={cn(
              "mb-px ml-1 inline-block w-4 text-xs transition-transform duration-300",
              {
                "rotate-180": selectedHorizontalNavLink === "Categories",
              },
            )}
          />
        </button>
        <p id="category-menu-instructions" className="sr-only">
          Press Down Arrow key to open the category menu. Use the Up and Down
          Arrow keys to browse categories, Tab to browse subcategory links, and
          Escape to close the menu.
        </p>
      </div>

      {/* horizontal links scroller */}
      <NavbarLinks
        mouseOverHandler={mouseOverHandler}
        mouseOutHandler={mouseOutHandler}
        keyDownHandler={keyDownHandler}
      />

      {/* Buttons to scroll links horizontally */}
      <NavbarScroller />
    </nav>
  );
};

export default NavbarDesktop;
