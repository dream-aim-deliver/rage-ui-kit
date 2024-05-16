import type { Meta, StoryObj } from "@storybook/react";

import {
  CreateConversationDialog,
  buttonActionInputValues,
} from "@/components/dialog/CreateConversationDialog";

import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/Dialogs/CreateConversation",
  component: CreateConversationDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateConversationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyAction: Story = {
  args: {
    buttonAction: action("buttonAction"),
  },
};

export const AlertExample: Story = {
  args: {
    buttonAction: (inputValues: buttonActionInputValues) => {
      const formattedInputValues = Object.entries(inputValues)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n   ");
      alert(`User inputs were:\n\n   ${formattedInputValues}`);
    },
  },
};
