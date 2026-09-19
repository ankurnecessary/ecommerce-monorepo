"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import {
  CategoryEventHandler,
  MenuCategory,
} from "@/components/layout/Header/types";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";

type NavbarLinksProps = {
  mouseOverHandler: CategoryEventHandler;
  mouseOutHandler: CategoryEventHandler;
  keyDownHandler: (
    navLink: MenuCategory,
    index: number,
  ) => (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
};
const NavbarLinks = ({
  mouseOverHandler,
  mouseOutHandler,
  keyDownHandler,
}: NavbarLinksProps) => {
  const parentNavbarRef = useRef<HTMLDivElement>(null);
  const childNavbarRef = useRef<HTMLDivElement>(null);

  const {
    navLinks,
    desktop: {
      selectedHorizontalNavLink,
      isMenuVisible,
      navbar: { setNavbarElementsDsktp, childOffset },
    },
  } = useHeaderContext();

  useEffect(() => {
    if (parentNavbarRef.current && childNavbarRef.current) {
      setNavbarElementsDsktp(parentNavbarRef.current, childNavbarRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="grow translate-y-px overflow-x-hidden whitespace-nowrap"
      ref={parentNavbarRef}
    >
      <div
        className={cn("inline-flex transition-transform duration-300", {
          "pt-3": navLinks.length === 0,
        })}
        style={{ transform: `translateX(${childOffset || 0}px)` }}
        ref={childNavbarRef}
      >
        {/* [ ]: Change this condition when API call is implemented */}
        {navLinks.length === 0 && <Skeleton className="h-4 w-137.5" />}
        {navLinks.map((link, index) => (
          <Link
            key={link.id}
            href={`/category${link.url}`}
            className={cn(
              "translate-y-px relative inline-block p-2 pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:content-['']",
              {
                "bg-accent after:scale-x-100":
                  selectedHorizontalNavLink === link.name,
              },
            )}
            aria-describedby="navbar-link-instructions"
            aria-controls="navbar-menu"
            aria-expanded={isMenuVisible[0]}
            onMouseOver={mouseOverHandler(link)}
            onFocus={mouseOverHandler(link)}
            onMouseOut={mouseOutHandler(link)}
            onBlur={mouseOutHandler(link)}
            onKeyDown={keyDownHandler(link, index)}
          >
            {link.name}
          </Link>
        ))}
        <p id="navbar-link-instructions" className="sr-only">
          Press Enter to visit this category, or Down Arrow to browse its
          subcategories.
        </p>
      </div>
    </div>
  );
};

export default NavbarLinks;
