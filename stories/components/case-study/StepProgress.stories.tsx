import type { Meta, StoryObj } from "@storybook/react";
import { StepProgress } from "@/components/case-study/StepProgress.tsx";

const meta = {
  title: "Example/StepProgress",
  component: StepProgress,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="w-full flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof StepProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    currentStep: 10,
    totalSteps: 10,
  },
};

export const Half: Story = {
  args: {
    currentStep: 5,
    totalSteps: 10,
  },
};

export const Quarter: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
  },
};

export const Zero: Story = {
  args: {
    currentStep: 0,
    totalSteps: 10,
  },
};
