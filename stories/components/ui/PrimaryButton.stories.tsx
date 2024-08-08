import { Meta, StoryObj } from "@storybook/react";
import { PrimaryAction, PrimaryButton } from "@/components/ui/primary-button";

const meta = {
  title: "Building Blocks/Primary Button",
  component: PrimaryButton,
} satisfies Meta<typeof PrimaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: {
    text: "New",
    url: "#",
    action: PrimaryAction.ADD,
  },
};

export const Send: Story = {
  args: {
    text: "Send",
    url: "#",
    action: PrimaryAction.SEND,
  },
};
