import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "@/ui/header";
import { cn } from "@/utils/utils";
import { Menu, X, SatelliteIcon } from "lucide-react"; // Import icons for mobile menu toggle

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // State to manage mobile menu

  const handleItemClick = (item: string) => {
    alert(`You clicked on ${item}`);
  };

  return (
    <header
      className={cn(
        "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 shadow-lg",
      )}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between py-4 px-8",
        )}
      >
        <div className="flex items-center gap-2">
          <SatelliteIcon className={cn("text-black size-10 dark:text-white")} />
          {/* Logo */}
          <a
            href="/"
            className={cn("text-xl font-bold text-black dark:text-white")}
          >
            SDA
          </a>
        </div>

        {/* Mobile Menu Button */}
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

        <NavigationMenu>
          {/* Desktop Menu */}
          <NavigationMenuList
            role="menubar"
            id="desktop-menu"
            className={cn(
              "hidden lg:flex space-x-8 text-black dark:text-white",
            )}
          >
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => handleItemClick("Home")}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => handleItemClick("Source")}
              >
                Source
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => handleItemClick("Research Context")}
              >
                Research Context
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                onClick={() => handleItemClick("Documentation")}
              >
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
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
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  onClick={() => handleItemClick("Home")}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  onClick={() => handleItemClick("Source")}
                >
                  Source
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  onClick={() => handleItemClick("Research Context")}
                >
                  Research Context
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  onClick={() => handleItemClick("Documentation")}
                >
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </div>

          <NavigationMenuIndicator />
        </NavigationMenu>
      </div>
    </header>
  );
};
