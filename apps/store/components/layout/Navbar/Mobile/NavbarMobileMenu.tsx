import { ChevronRight } from 'lucide-react';
import React from 'react';
import NavbarMobileLink from '@/components/layout/Navbar/Mobile/NavbarMobileLink';
import {
  MenuCategory,
  MenuSubCategory,
} from '@/components/layout/Header/types';

type navbarMobileMenu = {
  links: MenuCategory[];
  setIsSubMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSubCategories: React.Dispatch<React.SetStateAction<MenuSubCategory[]>>;
};

const NavbarMobileMenu = ({
  links,
  setIsSubMenuVisible,
  setSubCategories,
}: navbarMobileMenu) => {
  // Handling click of category with some sub-categories
  const categoryClickHandler = (subcategories: MenuSubCategory[]) => {
    setSubCategories(subcategories);
    setIsSubMenuVisible(true);
  };

  return (
    <>
      {links.length === 0 && <div className="pl-2">No links found!!</div>}
      {links.length > 0 && (
        <ul className="px-2">
          {links.map((link) => (
            <li
              key={link.id}
              className="border-b border-dotted border-slate-400 dark:border-gray-500"
            >
              {/* START: When we have {subcategories: [...]} */}
              {!!link.subcategories?.length && (
                <span
                  className="flex justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-500"
                  onClick={() => categoryClickHandler(link.subcategories || [])}
                >
                  <span>{link.name}</span>
                  <button className="bg-slate-200 p-1 dark:bg-slate-600">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </span>
              )}
              {/* END: When we have {subcategories: [...]} */}

              {/* START: When we don't have {subcategories: [...]} */}
              {!link.subcategories?.length && <NavbarMobileLink link={link} />}
              {/* END: When we don't have {subcategories: [...]} */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavbarMobileMenu;
