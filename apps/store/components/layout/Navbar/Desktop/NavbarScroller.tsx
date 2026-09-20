"use client";
import React, { useEffect, useState } from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

const NavbarScroller = () => {
  const {
    desktop: {
      navbar: { parent: navbarParent, child: navbarChild },
    },
  } = useHeaderContext();

  const [position, setPosition] = useState({
    left: 0,
    max: 0,
  });

  useEffect(() => {
    if (!navbarParent) return;

    const updatePosition = () => {
      setPosition({
        left: navbarParent.scrollLeft,
        max: Math.max(0, navbarParent.scrollWidth - navbarParent.clientWidth),
      });
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(navbarParent);
    if (navbarChild) resizeObserver.observe(navbarChild);

    navbarParent.addEventListener("scroll", updatePosition);

    return () => {
      resizeObserver.disconnect();
      navbarParent.removeEventListener("scroll", updatePosition);
    };
  }, [navbarParent, navbarChild]);

  const scrollByViewport = (direction: -1 | 1) => {
    if (!navbarParent) return;

    navbarParent.scrollBy({
      left: direction * navbarParent.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn("shadow-left flex whitespace-nowrap", {
        hidden: position.max <= 1,
      })}
    >
      <button
        type="button"
        className="inline-block cursor-pointer p-1 disabled:cursor-auto disabled:opacity-25"
        onClick={() => scrollByViewport(-1)}
        disabled={position.left <= 1}
        aria-label="Scroll categories left"
      >
        <ChevronLeft className="h-5 w-4" />
      </button>

      <button
        type="button"
        className="inline-block cursor-pointer p-1 disabled:cursor-auto disabled:opacity-25"
        onClick={() => scrollByViewport(1)}
        disabled={position.left >= position.max - 1}
        aria-label="Scroll categories right"
      >
        <ChevronRight className="h-5 w-4" />
      </button>
    </div>
  );
};

export default NavbarScroller;
