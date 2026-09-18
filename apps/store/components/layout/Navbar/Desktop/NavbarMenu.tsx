"use client";
import React from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import {
  CategoryEventHandler,
  HeaderContext,
  MenuCategory,
} from "@/components/layout/Header/types";
import VerticalScrollContainer from "@/components/custom-ui/VerticalScrollContainer";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants";
import { cn } from "@repo/ui/lib/utils";

const NavbarSubcategories = dynamic(
  () => import("@/components/layout/Navbar/Desktop/NavbarSubcategories"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

const NavbarMenu = () => {
  const {
    navLinks,
    desktop: {
      isMenuVisible,
      toggleMenu,
      selectedHorizontalNavLink,
      setSelectedHorizontalNavLink,
      selectedVerticalNavLink,
      setSelectedVerticalNavLink,
      verticalNavScrollToElementId,
      setVerticalNavScrollToElementId,
      menuFirstCategoryButtonRef,
      menuReturnFocusRef,
      isRestoringMenuFocusRef,
    },
  }: HeaderContext = useHeaderContext();

  const categoryButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  // Rendering this component only on desktop devices
  const isDesktop = useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
  if (!isDesktop) return null;

  const [isVisible, category] = isMenuVisible;

  const menuMouseOverHandler = () => {
    toggleMenu(true, category);
    if (selectedVerticalNavLink && !selectedHorizontalNavLink) return;
    setSelectedHorizontalNavLink(selectedHorizontalNavLink);
    setSelectedVerticalNavLink(category?.name || "");
  };

  // Can be done by FP
  const menuMouseOutHandler = () => {
    toggleMenu(false, null);
    setSelectedHorizontalNavLink("");
  };

  const menuBlurHandler = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextElement = event.relatedTarget;

    if (
      nextElement instanceof Node &&
      event.currentTarget.contains(nextElement)
    ) {
      // Focus is still somewhere inside the navbar menu.
      return;
    }

    toggleMenu(false, null);
    setSelectedHorizontalNavLink("");
    setSelectedVerticalNavLink("");
  };

  const categoryMouseOverHandler: CategoryEventHandler =
    (category: MenuCategory) => (e) => {
      e.stopPropagation();

      // Fetching link text from the link
      const link = e.currentTarget;
      const linkText = link.textContent?.trim() || "";

      setSelectedVerticalNavLink(linkText);
      toggleMenu(true, category);
      setVerticalNavScrollToElementId("");
    };

  const categoryKeyDownCaptureHandler = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape") return;

    e.preventDefault();
    e.stopPropagation();

    isRestoringMenuFocusRef.current = true;

    toggleMenu(false, null);
    setSelectedHorizontalNavLink("");
    setSelectedVerticalNavLink("");
    setVerticalNavScrollToElementId("");

    requestAnimationFrame(() => {
      const trigger = menuReturnFocusRef.current;

      if (!trigger) {
        isRestoringMenuFocusRef.current = false;
        return;
      }

      trigger.focus();
    });
  };

  const categoryKeyDownHandler = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | undefined;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % navLinks.length;
        break;

      case "ArrowUp":
        nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = navLinks.length - 1;
        break;

      default:
        return;
    }

    // Prevent ArrowUp and ArrowDown from scrolling the page.
    event.preventDefault();

    categoryButtonRefs.current[nextIndex]?.focus();
  };
  return (
    <div
      id="navbar-menu"
      data-testid="navbar-menu"
      inert={isMenuVisible[0] ? undefined : true}
      aria-hidden={!isMenuVisible[0]}
      className={cn(
        "absolute z-11 flex h-96 w-full overflow-hidden transition-transform duration-300 bg-background",
        {
          "-translate-y-full": !isVisible,
          "shadow-2xl": isVisible,
        },
      )}
      onFocus={menuMouseOverHandler}
      onBlur={menuBlurHandler}
      onMouseOver={menuMouseOverHandler}
      // onMouseLeave={menuMouseOutHandler}
      onMouseOut={menuMouseOutHandler}
      onKeyDownCapture={categoryKeyDownCaptureHandler}
    >
      <div role="tablist" aria-orientation="vertical" className="w-64 shrink-0">
        <VerticalScrollContainer
          contentClassName="p-5 pl-10"
          scrollToElementId={verticalNavScrollToElementId}
        >
          {navLinks.map((link, index) => (
            // [ ]: Change `key={link.id}` when actual API is made with unique key. Probably id.
            <button
              ref={(element) => {
                categoryButtonRefs.current[index] = element;

                if (index === 0) {
                  menuFirstCategoryButtonRef.current = element;
                }
              }}
              type="button"
              key={link.id}
              id={`vertical-${link.id}`}
              role="tab"
              tabIndex={selectedVerticalNavLink === link.name ? 0 : -1}
              aria-selected={selectedVerticalNavLink === link.name}
              aria-controls="category-panel"
              className={cn(
                "flex w-full cursor-pointer justify-between px-2 py-3 text-xs",
                {
                  "bg-accent": selectedVerticalNavLink === link.name,
                },
              )}
              onMouseOver={categoryMouseOverHandler(link)}
              onFocus={categoryMouseOverHandler(link)}
              onKeyDown={(event) => categoryKeyDownHandler(event, index)}
            >
              <span>{link.name}</span>
              <ChevronRight className="h-4 w-4 opacity-25" />
            </button>
          ))}
        </VerticalScrollContainer>
      </div>
      <div className="my-5 w-px border"></div>
      <div role="tabpanel" id="category-panel" className="grow px-5">
        {!!category && <NavbarSubcategories category={category} />}
      </div>
    </div>
  );
};

export default NavbarMenu;
