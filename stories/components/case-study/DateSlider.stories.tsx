import type { Meta, StoryObj } from "@storybook/react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";
import { generateTimestamps } from "../../utils.ts";

const meta = {
  title: "Example/DateSlider",
  component: DateSlider,
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
} satisfies Meta<typeof DateSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    timestamps: generateTimestamps(15),
  },
};

export const Long: Story = {
  args: {
    timestamps: generateTimestamps(60),
  },
};
