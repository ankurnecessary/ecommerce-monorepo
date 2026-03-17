import React from 'react';
import { Mulish } from 'next/font/google';
import Link from 'next/link';
import { Navbar } from '@/components/layout';
import NavbarMenu from '@/components/layout/Navbar/Desktop/NavbarMenu';
import { HeaderContextProvider } from '@/components/layout/Header/Header.context';
import { Search } from 'lucide-react';
import { links } from '@/components/layout/Navbar/XnavbarLinkObj';
import MobileHamburgerButton from '@/components/layout/Header/MobileHamburgerButton';
const mulish = Mulish({
  subsets: ['latin'],
});

const Header = () => {
  // [ ]: Replace "links" with <HeaderContextProvider/> with an API call to fetch the links
  // const links = await fetchLinksFromAPI();
  // [ ]: [navlinks] [categories] [sub-categories] Use No-SQL DB to store the links data. This will increase the fetching speed. Whenever we update categories or thier subcategories in SQL DB, a new object will be created in No-SQL DB with the updated data. This will help us to fetch the data faster.

  return (
    <HeaderContextProvider categories={links}>
      <header className="relative z-[1] border-b border-black bg-white lg:h-[123px] lg:border-gray-300 dark:border-gray-500 dark:bg-zinc-700">
        <div className="relative flex items-center justify-between lg:container lg:mx-auto lg:py-5">
          {/* Logo container */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-28">
            <h1
              className={`${mulish.className} relative p-1 text-3xl font-bold uppercase`}
            >
              <Link href={'/'}>Celeb</Link>
            </h1>
          </div>

          {/* [Moblie only]: For left side of the header  */}
          <div className="border-r border-black lg:grow dark:border-gray-500">
            {/* For hamburger menu button */}
            <MobileHamburgerButton />
          </div>

          {/* For the center of the header */}
          <div className="lg:grow">
            {/* [Mobile only]: Center space for logo which is absolutely positioned */}
            <div
              role="search"
              className="mx-auto my-1 hidden w-1/2 border border-black lg:invisible lg:flex"
            >
              {/* lg:invisible - Just remove this class from the <div> above to see the search text box */}
              <input
                type="search"
                placeholder="Search..."
                className="min-w-0 flex-grow border-r border-black px-2 text-sm placeholder-black outline-none"
              />
              <button
                id="header-search-button"
                type="button"
                aria-label="search"
                className="bg-black px-3 py-1.5 text-white"
              >
                <Search />
              </button>
            </div>
          </div>

          {/* For the right side of the header */}
          <div className="flex lg:grow lg:justify-end">
            {/* Start: [Mobile only]: <div> */}
            <div className="lg:hidden">
              {/* [Mobile only]: Search button */}
              <button
                className="border-l border-black px-4 py-3 dark:border-gray-500"
                aria-label="Open search bar"
              >
                <Search />
              </button>
            </div>
            {/* End: [Mobile only]: <div> */}

            {/* Start: [Desktop only]: <div> */}
            <div className="hidden pr-16 lg:block">
              {/* You can add those items which are only visible on desktop version */}
            </div>
            {/* End: [Desktop only]: <div> */}
          </div>
        </div>
        <Navbar />
      </header>
      <NavbarMenu />
    </HeaderContextProvider>
  );
};

export default Header;
