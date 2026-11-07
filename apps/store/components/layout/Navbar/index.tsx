import React from 'react';
import NavbarDesktop from '@/components/layout/Navbar/Desktop/NavbarDesktop';
import NavbarMobile from '@/components/layout/Navbar/Mobile/NavbarMobile';

const Navbar = () => {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
    </>
  );
};

export default Navbar;
