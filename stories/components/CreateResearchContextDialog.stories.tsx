import type { Meta, StoryObj } from "@storybook/react";

import {
  CreateResearchContextDialog,
  onSubmitInputValues,
} from "@/components/dialog/CreateResearchContextDialog";

import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/Dialogs/CreateResearchContext",
  component: CreateResearchContextDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateResearchContextDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyAction: Story = {
  args: {
    onSubmit: action("buttonAction"),
  },
};

export const AlertExample: Story = {
  args: {
    onSubmit: (inputValues: onSubmitInputValues) => {
      const formattedInputValues = Object.entries(inputValues)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n   ");
      alert(`User inputs were:\n\n   ${formattedInputValues}`);
    },
  },
};
