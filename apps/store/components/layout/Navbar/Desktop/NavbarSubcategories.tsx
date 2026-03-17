'use client';
import VerticalScrollContainer from '@/components/custom-ui/VerticalScrollContainer';
import React from 'react';
import { MenuCategory } from '@/components/layout/Header/types';
import NavbarSubcategory from '@/components/layout/Navbar/Desktop/NavbarSubcategory';
import clsx from 'clsx';

type NavbarSubcategoriesProps = {
  category: MenuCategory | null;
};

const NavbarSubcategories = ({ category }: NavbarSubcategoriesProps) => {
  //[ ]: Later on we will extract sub-categories of a category via a separate HTTP request
  const subCategories = category?.subcategories || [];

  return (
    <VerticalScrollContainer>
      <div
        className={clsx('flex flex-wrap gap-6 py-5', {
          'justify-center': subCategories.length === 0,
        })}
        data-testid="navbar-subcategories"
      >
        {subCategories.length === 0 && <div>Sub-categories not found!</div>}
        {subCategories.map((subCategory) => (
          <NavbarSubcategory key={subCategory.id} subCategory={subCategory} />
        ))}
      </div>
    </VerticalScrollContainer>
  );
};

export default NavbarSubcategories;
