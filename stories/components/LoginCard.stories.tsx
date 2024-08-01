import type { Meta, StoryObj } from "@storybook/react";

import {
  LoginCard,
  buttonActionInputValues,
} from "@/components/card/LoginCard";

import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/Cards/LoginCard",
  component: LoginCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginCard>;

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
