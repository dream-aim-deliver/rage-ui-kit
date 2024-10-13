import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/components/skeleton";

const DummyFullPageTable = () => {
  return (
    <div className="w-screen h-screen">
      <Skeleton className="absolute flex items-center justify-center w-full h-full rounded-b-none"></Skeleton>
    </div>
  );
};
const meta = {
  title: "Components/Skeleton",
  component: DummyFullPageTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DummyFullPageTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
