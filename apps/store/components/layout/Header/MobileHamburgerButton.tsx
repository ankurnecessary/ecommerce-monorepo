"use client";
import React from "react";
import { Menu } from "lucide-react";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import { HeaderContext } from "@/components/layout/Header/types";
import { Button } from "@repo/ui/components/button";

const MobileHamburgerButton = () => {
  const {
    mobile: { toggleMenu },
  }: HeaderContext = useHeaderContext();

  const mobileMenuHandler = () => {
    toggleMenu(true);
  };

  return (
    <Button
      className="px-4 py-3 lg:hidden"
      aria-label="Open navigation menu"
      onClick={mobileMenuHandler}
    >
      <Menu />
    </Button>
  );
};

export default MobileHamburgerButton;
