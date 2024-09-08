import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components//site-header/SiteHeader";
import { NavigationMenuItem, NavigationMenuLink } from "@/ui/header";

const handleItemClick = (item: string) => {
  alert(`You clicked on ${item}`);
};

const menuItems = [
  <NavigationMenuItem>
    <NavigationMenuLink
      href="/"
      className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => handleItemClick("Home")}
    >
      Home
    </NavigationMenuLink>
  </NavigationMenuItem>,
  <NavigationMenuItem>
    <NavigationMenuLink
      href="/"
      className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => handleItemClick("Source")}
    >
      Source
    </NavigationMenuLink>
  </NavigationMenuItem>,
  <NavigationMenuItem>
    <NavigationMenuLink
      href="/"
      className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => handleItemClick("Research Context")}
    >
      Research Context
    </NavigationMenuLink>
  </NavigationMenuItem>,
  <NavigationMenuItem>
    <NavigationMenuLink
      href="/"
      className="relative after:absolute after:left-0 after:top-5 after:w-0 after:h-1 after:bg-neutral-700 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => handleItemClick("Documentation")}
    >
      Documentation
    </NavigationMenuLink>
  </NavigationMenuItem>,
];

export const TestPage = () => {
  return (
    <div>
      <Header>{menuItems}</Header>
    </div>
  );
};

const meta = {
  title: "Components/Header/SiteHeader",
  component: TestPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TestPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithClickActions: Story = {
  args: {
    children: menuItems,
  },
};
