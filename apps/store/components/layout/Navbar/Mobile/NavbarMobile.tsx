'use client';
import React, { useState } from 'react';
import { useHeaderContext } from '@/components/layout/Header/Header.context';
import {
  HeaderContext,
  MenuSubCategory,
} from '@/components/layout/Header/types';
import { ChevronLeft, X } from 'lucide-react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const NavbarMobileMenu = dynamic(
  () => import('@/components/layout/Navbar/Mobile/NavbarMobileMenu'),
  {
    ssr: false,
    loading: () => <div className="p-2">Loading...</div>,
  },
);

const NavbarMobileSubmenu = dynamic(
  () => import('@/components/layout/Navbar/Mobile/NavbarMobileSubmenu'),
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
        className={`fixed left-0 top-0 z-[1] h-full w-[300px] border-r border-gray-300 bg-white transition-transform duration-300 dark:border-gray-500 dark:bg-zinc-700 ${!isMenuVisible && '-translate-x-full'}`}
      >
        {/* START: Button to collapse main mobile menu */}
        <button
          className="absolute right-0 top-0 z-10 bg-slate-200 p-1 dark:bg-slate-600"
          onClick={mainMenuHandler}
          aria-label="Close Menu"
        >
          <X />
        </button>
        {/* END: Button to collapse main mobile menu */}

        {/* START: Button to collapse sub-menu */}
        {isSubMenuVisible && (
          <button
            className="absolute left-0 top-0 z-10 bg-slate-200 p-1 dark:bg-slate-600"
            onClick={() => setIsSubMenuVisible(false)}
          >
            <ChevronLeft />
          </button>
        )}
        {/* END: Button to collapse sub-menu */}

        {/* START: Main menu links */}
        <div className="mt-9 h-full overflow-auto dark:bg-zinc-700">
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
            'absolute left-0 top-0 z-[2] mt-9 h-full w-full overflow-auto bg-white transition-transform duration-300 dark:bg-zinc-700',
            { '-translate-x-full': !isSubMenuVisible },
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
          className="fixed inset-0 z-0 bg-black bg-opacity-50"
          onClick={mainMenuHandler}
          data-testid="backdrop"
        ></div>
      )}
      {/* END: Translucent Backdrop */}
    </>
  );
};

export default NavbarMobile;
