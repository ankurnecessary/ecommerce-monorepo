'use client';
import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '@/components/layout/Header/Header.context';
import { CalculateOffset } from '@/components/layout/Header/types';
import clsx from 'clsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const calculateOffset: CalculateOffset =
  (direction) => (parentWidth, childWidth) => (offset) => {
    let displacer = 0;

    // Setting displacer
    if (childWidth > parentWidth) {
      displacer = parentWidth;
    }

    // Handling left movement
    if (direction === 'left') {
      offset = offset + displacer;
      const maxLeftOffset = 0;
      return offset < maxLeftOffset ? offset : maxLeftOffset;
    }

    // Handling right movement
    offset = offset - displacer;
    const maxRightOffset = parentWidth - childWidth;
    return offset < maxRightOffset ? maxRightOffset : offset;
  };

const NavbarScroller = () => {
  const {
    desktop: {
      navbar: {
        child: navbarChild,
        parent: navbarParent,
        childOffset: navbarChildOffset,
        setNavbarOffsetDsktp,
      },
    },
  } = useHeaderContext();

  const [parentWidth, setParentWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  useEffect(() => {
    // Recalculate widths when the component mounts or when the DOM changes
    const updateWidths = () => {
      // <parent> - Need width of the <div> having overflow property set over it.
      setParentWidth(navbarParent?.getBoundingClientRect().width ?? 0);
      // <child> - Need width of the <div> wrapping all links inside <parent>.
      setChildWidth(navbarChild?.getBoundingClientRect().width ?? 0);
    };

    updateWidths();

    // Add a resize observer or event listener to handle dynamic changes in the size of parent and child elements
    const resizeObserver = new ResizeObserver(updateWidths);
    if (navbarParent instanceof Element) resizeObserver.observe(navbarParent);
    if (navbarChild instanceof Element) resizeObserver.observe(navbarChild);

    return () => {
      if (navbarParent instanceof Element)
        resizeObserver.unobserve(navbarParent);
      if (navbarChild instanceof Element) resizeObserver.unobserve(navbarChild);
    };
  }, [navbarParent, navbarChild]);

  const maxRightOffset = parentWidth - childWidth;

  const calculateLeftOffset = calculateOffset('left')(parentWidth, childWidth);
  const calculateRightOffset = calculateOffset('right')(
    parentWidth,
    childWidth,
  );

  const linksLeftScroller = () => {
    setNavbarOffsetDsktp(calculateLeftOffset(navbarChildOffset));
  };

  const linksRightScroller = () => {
    setNavbarOffsetDsktp(calculateRightOffset(navbarChildOffset));
  };

  return (
    <div
      className={clsx('shadow-left flex whitespace-nowrap dark:text-zinc-300', {
        hidden: childWidth <= parentWidth,
      })}
    >
      <button
        type="button"
        className="inline-block cursor-pointer p-1 disabled:cursor-auto disabled:opacity-25"
        onClick={linksLeftScroller}
        disabled={navbarChildOffset == 0}
        aria-label="left scroller"
      >
        <ChevronLeft className="h-5 w-4" />
      </button>
      <button
        type="button"
        className="inline-block cursor-pointer p-1 disabled:cursor-auto disabled:opacity-25"
        onClick={linksRightScroller}
        disabled={navbarChildOffset === maxRightOffset}
        aria-label="right scroller"
      >
        <ChevronRight className="h-5 w-4" />
      </button>
    </div>
  );
};

export default NavbarScroller;
