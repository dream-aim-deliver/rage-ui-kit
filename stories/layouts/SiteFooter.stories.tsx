import type { Meta, StoryObj } from "@storybook/react";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { SatelliteIcon } from "lucide-react";

// Example menu sections (can be provided from outside)
const brandSection = (
  <div className="flex items-center gap-2">
    <SatelliteIcon size={20} className="text-neutral-800 dark:text-white" />
    <span className="text-xl font-bold text-neutral-800 dark:text-white">
      SDA
    </span>
    <span className="text-sm text-neutral-500 dark:text-neutral-400">
      © 2024
    </span>
  </div>
);

const linksSection = (
  <div className="flex flex-wrap justify-center space-x-6">
    <a
      href="/about"
      className="hover:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-300"
    >
      About
    </a>
    <a
      href="/privacy"
      className="hover:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-300"
    >
      Privacy
    </a>
    <a
      href="/terms"
      className="hover:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-300"
    >
      Terms
    </a>
    <a
      href="/contact"
      className="hover:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-300"
    >
      Contact
    </a>
  </div>
);

const contactSection = (
  <a
    href="mailto:support@mycustomdomain.com"
    className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-300"
  >
    support@mycustomdomain.com
  </a>
);

const meta = {
  title: "Components/Footer/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandSection: brandSection,
    linksSection: linksSection,
    contactSection: contactSection,
  },
};
