import type { Meta, StoryObj } from "@storybook/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

const ToastTrigger = (props: {
  type: "success" | "info" | "warning" | null | undefined | "error";
}) => {
  const { toast } = useToast();
  console.log(props.type);
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: props.type,
          title: "Scheduled: Catch up ",
          description: "",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }}
    >
      Show toast
    </Button>
  );
};
const meta = {
  title: "Components/Toast", // Title for the component
  component: ToastTrigger,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// ToastComponent with type "success"
export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Error: Story = {
  args: {
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
  },
};

export const Info: Story = {
  args: {
    type: "info",
  },
};

export const Default: Story = {
  args: {
    type: null,
  },
};
