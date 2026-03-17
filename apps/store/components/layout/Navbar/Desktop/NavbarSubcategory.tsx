'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuSubCategory } from '@/components/layout/Header/types';
import { Skeleton } from '@/components/ui/skeleton';

const NavbarSubcategory = ({
  subCategory,
}: {
  subCategory: MenuSubCategory;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Link
      key={subCategory.id}
      href={`/category${subCategory.url}`}
      className="group/subcat relative flex w-20 flex-col"
    >
      {!imageLoaded && (
        <span
          data-testid="skeleton"
          className="absolute m-1 flex justify-center"
        >
          <Skeleton className="mx-2 h-[57px] w-[57px] rounded-full" />
        </span>
      )}
      <span className="m-1 flex justify-center">
        <Image
          src={subCategory.imagePath}
          alt={subCategory.name}
          width={55}
          height={55}
          className="rounded-full object-cover transition-transform duration-200 group-hover/subcat:scale-110 group-hover/subcat:[box-shadow:0_0_7px_1px_rgba(0,0,0,0.20)] group-hover/subcat:dark:[box-shadow:0_0_7px_1px_rgba(255,255,255,0.20)]"
          style={!imageLoaded ? { visibility: 'hidden' } : {}}
          onLoad={() => setImageLoaded(true)}
        />
      </span>
      <span className="w-full text-center text-xs">{subCategory.name}</span>
    </Link>
  );
};

export default NavbarSubcategory;
