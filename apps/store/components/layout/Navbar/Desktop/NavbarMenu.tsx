"use client";
import React from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import {
  CategoryMouseEventHandler,
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
    },
  }: HeaderContext = useHeaderContext();

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
    toggleMenu(false, {} as MenuCategory);
    setSelectedHorizontalNavLink("");
  };

  const categoryMouseOverHandler: CategoryMouseEventHandler =
    (category: MenuCategory) => (e) => {
      e.stopPropagation();

      // Fetching link text from the link
      const link = e.currentTarget as HTMLAnchorElement;
      const linkText = link.textContent?.trim() || "";

      setSelectedVerticalNavLink(linkText);
      toggleMenu(true, category);
      setVerticalNavScrollToElementId("");
    };

  return (
    <div
      data-testid="navbar-menu"
      className={cn(
        "absolute z-0 flex h-96 w-full overflow-hidden transition-transform duration-300 bg-background",
        {
          "-translate-y-full": !isVisible,
          "shadow-2xl": isVisible,
        },
      )}
      onMouseOver={menuMouseOverHandler}
      onMouseLeave={menuMouseOutHandler}
    >
      <div className="w-64 shrink-0">
        <VerticalScrollContainer
          contentClassName="p-5 pl-10"
          scrollToElementId={verticalNavScrollToElementId}
        >
          {navLinks.map((link) => (
            // [ ]: Change `key={link.id}` when actual API is made with unique key. Probably id.
            <span
              key={link.id}
              id={`vertical-${link.id}`}
              className={cn(
                "flex w-full cursor-pointer justify-between px-2 py-3 text-xs",
                {
                  "bg-primary/10 dark:bg-primary/20":
                    selectedVerticalNavLink === link.name,
                },
              )}
              onMouseOver={categoryMouseOverHandler(link)}
            >
              <span>{link.name}</span>
              <span>
                <ChevronRight className="h-4 w-4 opacity-25" />
              </span>
            </span>
          ))}
        </VerticalScrollContainer>
      </div>
      <div className="my-5 w-px border"></div>
      <div className="grow px-5">
        {!!category && <NavbarSubcategories category={category} />}
      </div>
    </div>
  );
};

export default NavbarMenu;
