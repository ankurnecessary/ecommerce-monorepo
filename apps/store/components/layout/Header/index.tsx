import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import NavbarMenu from "@/components/layout/Navbar/Desktop/NavbarMenu";
import { HeaderContextProvider } from "@/components/layout/Header/Header.context";
import { Search } from "lucide-react";
import { links } from "@/components/layout/Navbar/XnavbarLinkObj";
import MobileHamburgerButton from "@/components/layout/Header/MobileHamburgerButton";
import { Button } from "@repo/ui/components/button";
import {
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroup,
} from "@repo/ui/components/input-group";

const Header = () => {
  // [ ]: Replace "links" with <HeaderContextProvider/> with an API call to fetch the links
  // const links = await fetchLinksFromAPI();
  // [ ]: [navlinks] [categories] [sub-categories] Use No-SQL DB to store the links data. This will increase the fetching speed. Whenever we update categories or thier subcategories in SQL DB, a new object will be created in No-SQL DB with the updated data. This will help us to fetch the data faster.

  return (
    <HeaderContextProvider categories={links}>
      <header className="relative z-1 border-b bg-white lg:h-30.75 dark:bg-background">
        <div className="relative flex items-center justify-between lg:container lg:mx-auto lg:py-5">
          {/* Logo container */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-28">
            <h1
              className={`relative p-1 text-3xl font-bold uppercase`}
            >
              <Link href={"/"}>Celeb</Link>
            </h1>
          </div>

          {/* [Moblie only]: For left side of the header  */}
          <div className="border-r lg:grow">
            {/* For hamburger menu button */}
            <MobileHamburgerButton />
          </div>

          {/* For the center of the header */}
          <div className="lg:grow">
            {/* [Mobile only]: Center space for logo which is absolutely positioned */}
            <div
              role="search"
              className="mx-auto my-1 hidden w-1/2 lg:invisible lg:flex"
            >
              {/* lg:invisible - Just remove this class from the <div> above to see the search text box */}
              <InputGroup className="border border-primary rounded-none has-[>[data-align=inline-end]]:[&>input]:pe-0 overflow-hidden">
                <InputGroupInput className="px-0 py-0 pl-1" placeholder="Search..." />
                <InputGroupAddon className="p-0 has-[>button]:me-0" align="inline-end">
                  <InputGroupButton className="h-8 w-8 rounded-none bg-primary text-white border-0 hover:border-0 hover:bg-primary/80" aria-label="search" variant="secondary">
                    <Search />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          {/* For the right side of the header */}
          <div className="flex lg:grow lg:justify-end">
            {/* Start: [Mobile only]: <div> */}
            <div className="lg:hidden">
              {/* [Mobile only]: Search button */}
              <button
                className="border-l px-4 py-3"
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
