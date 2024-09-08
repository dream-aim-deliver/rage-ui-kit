import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components//site-header/SiteHeader";
import { action } from "@storybook/addon-actions";

export const TestPage = () => {
  return (
    <div>
      <Header></Header> Holi Boli. 4got 2 tell u
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
    onItemClick: action("onItemClick"),
  },
};
