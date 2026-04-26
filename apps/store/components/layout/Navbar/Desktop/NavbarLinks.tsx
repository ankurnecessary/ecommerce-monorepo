"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import { CategoryMouseEventHandler } from "@/components/layout/Header/types";
import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";

type NavbarLinksProps = {
  mouseOverHandler: CategoryMouseEventHandler;
  mouseOutHandler: CategoryMouseEventHandler;
};
const NavbarLinks = ({
  mouseOverHandler,
  mouseOutHandler,
}: NavbarLinksProps) => {
  const parentNavbarRef = useRef<HTMLDivElement>(null);
  const childNavbarRef = useRef<HTMLDivElement>(null);

  const {
    navLinks,
    desktop: {
      selectedHorizontalNavLink,
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
      className="grow overflow-x-hidden whitespace-nowrap"
      ref={parentNavbarRef}
    >
      <div
        className={cn(
          "inline-flex transition-transform duration-300",
          {
            "pt-3": navLinks.length === 0,
          },
        )}
        style={{ transform: `translateX(${childOffset || 0}px)` }}
        ref={childNavbarRef}
      >
        {/* [ ]: Change this condition when API call is implemented */}
        {navLinks.length === 0 && <Skeleton className="h-4 w-137.5" />}
        {navLinks.map((link) => (
          <Link key={link.id} href={`/category${link.url}`}>
            <span
              id={link.id}
              className={cn(
                "relative top-px inline-block p-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:content-[''] dark:text-zinc-300 dark:after:bg-white",
                {
                  "bg-gray-100 after:scale-x-100 dark:bg-zinc-800":
                    selectedHorizontalNavLink === link.name,
                },
              )}
              onMouseOver={mouseOverHandler(link)}
              onMouseOut={mouseOutHandler(link)}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarLinks;
