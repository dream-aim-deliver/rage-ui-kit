import type { Meta, StoryObj } from "@storybook/react";

import {
  ConversationAGGrid,
  ConversationRow,
} from "@/components/table/ConversationAGGrid";

const meta: Meta = {
  title: "Components/AGGrid/Conversation",
  component: ConversationAGGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConversationAGGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

function randomChoice<T>(list: T[]): T {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

const thousand = Array.from({ length: 1000 }, (_, i) => i + 1);

function getRandomDate(start: Date, end: Date): Date {
  const startTimestamp = start.getTime();
  const endTimestamp = end.getTime();
  const randomTimestamp =
    startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  return new Date(randomTimestamp);
}

const dataGenerator = () => {
  const topics = [
    "wildfires",
    "earthquakes",
    "floods",
    "hurricanes",
    "tornadoes",
  ];
  const random_topic = randomChoice(topics);
  const conv_number = randomChoice(thousand);

  const startDate_c = new Date(2024, 0, 1);
  const endDate_c = new Date(2024, 1, 1);
  const created_at = getRandomDate(startDate_c, endDate_c).toISOString();

  const datum: ConversationRow = {
    id: randomChoice(thousand),
    title: `Conversation number ${conv_number}, about ${random_topic}`,
    created_at: created_at,
  };

  return datum;
};

export const LoadingWithNoData: Story = {
  args: {
    rowData: [],
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    rowData: [],
    isLoading: false,
    errorOverlayProps: {
      errorStatus: true,
      overlayText:
        "An error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus.an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus. an error occurred while fetching the data: lorem ipsum dolor sit amet, consectetur adipiscing elit. nullam nec purus. nullam nec purus. nullam nec purus.",
    },
  },
};

export const WithAlertFunctions: Story = {
  args: {
    rowData: Array.from({ length: 106 }, dataGenerator),
    isLoading: false,
    goToConversation: (id: number) => {
      alert(`Navigating to conversation ${id}`);
    },
    handleNewConversation: (title: string) => {
      alert(`Creating new conversation with title: ${title}
      This feature is not implemented yet.`);
    },
  },
};
