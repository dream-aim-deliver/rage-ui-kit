"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuIndicator,
} from "@/ui/header";
import { cn } from "@/utils/utils";
import { Menu, X, SatelliteIcon } from "lucide-react"; // Import icons for mobile menu toggle

export interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // State to manage mobile menu

  return (
    <header
      className={cn(
        "sticky z-[100] top-0 bg-neutral-100 text-neutral-800 dark:bg-neutral-800 shadow-lg",
      )}
    >
      <div
        className={cn("w-screen px-4 flex items-center justify-between py-4")}
      >
        <div className="flex items-center gap-2">
          <SatelliteIcon
            className={cn("text-neutral-800 size-10 dark:text-white")}
          />
          {/* Logo */}
          <a
            href="/"
            className={cn("text-xl font-bold text-neutral-800 dark:text-white")}
          >
            SkyPulse
          </a>
        </div>

        {/* Mobile Menu Button */}
        {props.children && (
          <button
            className="block lg:hidden text-neutral-800 dark:text-white relative z-50 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} role="button" id="close-menu-button" />
            ) : (
              <Menu size={24} role="button" id="open-menu-button" />
            )}
          </button>
        )}

        <NavigationMenu>
          {/* Desktop Menu */}
          <NavigationMenuList
            role="menubar"
            id="desktop-menu"
            className={cn(
              "hidden lg:flex space-x-9 text-neutral-800 dark:text-white  ",
            )}
          >
            {props.children}
          </NavigationMenuList>

          {/* Mobile Menu */}
          <div
            role="menubar"
            id="mobile-menu"
            className={cn(
              "lg:hidden shadow-lg fixed top-0 right-0 max-w-sm bg-neutral-100 dark:bg-neutral-800 transition-transform transform ease-in-out duration-300 w-full z-50",
              isMenuOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <NavigationMenuList className="flex flex-col p-4 space-y-4 text-black dark:text-white">
              {props.children}
            </NavigationMenuList>
          </div>

          <NavigationMenuIndicator />
        </NavigationMenu>
      </div>
    </header>
  );
};
