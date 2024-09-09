import type { Meta, StoryObj } from "@storybook/react";
import { ToastComponent } from "@/components/toast/ToastComponent";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/Toast/ToastComponent", // Title for the component
  component: ToastComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// ToastComponent with type "success"
export const SuccessToast: Story = {
  args: {
    id: "toast-success",
    title: "Success",
    description: "This is a success message.",
    type: "success",
    onClose: action("onClose"),
  },
};

// ToastComponent with type "error"
export const ErrorToast: Story = {
  args: {
    id: "toast-error",
    title: "Error",
    description: "An error occurred.",
    type: "error",
    onClose: action("onClose"),
  },
};

// ToastComponent with type "info"
export const InfoToast: Story = {
  args: {
    id: "toast-info",
    title: "Info",
    description: "This is an informational message.",
    type: "info",
    onClose: action("onClose"),
  },
};

// ToastComponent with type "warning"
export const WarningToast: Story = {
  args: {
    id: "toast-warning",
    title: "Warning",
    description: "This is a warning message.",
    type: "warning",
    onClose: action("onClose"),
  },
};
