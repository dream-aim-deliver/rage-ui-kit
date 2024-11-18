import type { Meta, StoryObj } from "@storybook/react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";

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

function generateTimestamps(daysAgo: number): number[] {
  const now = new Date(); // Current date
  const timestamps: number[] = [];

  for (let i = daysAgo; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    timestamps.push(date.getTime());
  }

  return timestamps;
}

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
