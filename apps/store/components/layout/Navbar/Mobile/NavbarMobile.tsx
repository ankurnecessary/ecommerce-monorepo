"use client";
import React, { useState } from "react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import {
  HeaderContext,
  MenuSubCategory,
} from "@/components/layout/Header/types";
import { ChevronLeft, X } from "lucide-react";
import clsx from "clsx";
import dynamic from "next/dynamic";

const NavbarMobileMenu = dynamic(
  () => import("@/components/layout/Navbar/Mobile/NavbarMobileMenu"),
  {
    ssr: false,
    loading: () => <div className="p-2">Loading...</div>,
  },
);

const NavbarMobileSubmenu = dynamic(
  () => import("@/components/layout/Navbar/Mobile/NavbarMobileSubmenu"),
  {
    ssr: false,
    loading: () => <div className="p-2">Loading...</div>,
  },
);

const NavbarMobile = () => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState<boolean>(false);
  const [subcategories, setSubCategories] = useState<MenuSubCategory[]>([]);
  const {
    navLinks,
    mobile: { isMenuVisible, toggleMenu },
  }: HeaderContext = useHeaderContext();

  const mainMenuHandler = () => {
    toggleMenu(false);
    setSubCategories([]);
    setIsSubMenuVisible(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div
        data-testid="mobile-menu"
        className={`fixed left-0 top-0 z-1 h-full w-75 border-r transition-transform duration-300 bg-background ${!isMenuVisible && "-translate-x-96"}`}

      >
        {/* START: Button to collapse main mobile menu */}
        <button
          className="absolute -right-10 top-0 z-10 p-1 border-pink-300 bg-pink-100 border dark:border-pink-300/10 dark:bg-pink-400/10 rounded-full mt-2 text-pink-700 dark:text-pink-500"
          onClick={mainMenuHandler}
          aria-label="Close Menu"
        >
          <X />
        </button>
        {/* END: Button to collapse main mobile menu */}

        {/* START: Button to collapse sub-menu */}
        {isSubMenuVisible && (
          <button
            className="absolute left-2 top-2 z-10 bg-primary text-white p-1 pr-2 flex"
            onClick={() => setIsSubMenuVisible(false)}
          >
            <ChevronLeft /> Back
          </button>
        )}
        {/* END: Button to collapse sub-menu */}

        {/* START: Main menu links */}
        <div className="mt-10 h-full overflow-auto">
          {isMenuVisible && (
            <NavbarMobileMenu
              links={navLinks}
              setIsSubMenuVisible={setIsSubMenuVisible}
              setSubCategories={setSubCategories}
            />
          )}
        </div>
        {/* END: Main menu links */}

        {/* START: Sub-menu links */}
        <div
          data-testid="mobile-submenu"
          className={clsx(
            "absolute left-0 top-0 z-2 mt-12 h-full w-full overflow-auto transition-transform duration-300 bg-background",
            { "-translate-x-full": !isSubMenuVisible },
          )}
        >
          {isSubMenuVisible && (
            <NavbarMobileSubmenu subcategories={subcategories} />
          )}
        </div>
        {/* END: Sub-menu links */}
      </div>

      {/* START: Translucent Backdrop */}
      {isMenuVisible && (
        <div
          className="fixed inset-0 z-0 bg-black/50"
          onClick={mainMenuHandler}
          data-testid="backdrop"
        ></div>
      )}
      {/* END: Translucent Backdrop */}
    </>
  );
};

export default NavbarMobile;
