import type { Meta, StoryObj } from "@storybook/react";
import { Button as ShadcnButton } from "@/components/button/index";

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

  const startDate_u = new Date(2024, 1, 2);
  const endDate_u = new Date();
  const updated_at = getRandomDate(startDate_u, endDate_u).toISOString();

  const datum: ConversationRow = {
    id: randomChoice(thousand),
    title: `Conversation number ${conv_number}, about ${random_topic}`,
    created_at: created_at,
    updated_at: updated_at,
  };

  return datum;
};

export const SmallTable: Story = {
  args: {
    rowData: Array.from({ length: 5 }, dataGenerator),
  },
};

export const LargeTable: Story = {
  args: {
    rowData: Array.from({ length: 106 }, dataGenerator),
  },
};

const alertRawButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ShadcnButton
      label={"Alert raw data"}
      variant="default"
      onClick={onClick}
      title="Alert the raw data of the selected rows"
    />
  );
};

const alertRawCallBack = (selectedRows: ConversationRow[]) => {
  alert(
    "Dump of the selected rows:\n\n" +
      selectedRows.map((row) => JSON.stringify(row)).join("\n\n"),
  );
};

const alertButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ShadcnButton
      label={"Alert selected titles"}
      variant="default"
      onClick={onClick}
      title="Alert the titles of the selected rows"
    />
  );
};

const alertCallBack = (selectedRows: ConversationRow[]) => {
  alert(
    "Titles of the selected conversaitons:\n\n- " +
      selectedRows.map((row) => row.title).join("\n- "),
  );
};

export const WithAlertSelectionButtons: Story = {
  args: {
    rowData: Array.from({ length: 106 }, dataGenerator),
    buttonsWithCallBack: [
      {
        reactComponent: alertRawButton,
        callbackFunction: alertRawCallBack,
      },
      {
        reactComponent: alertButton,
        callbackFunction: alertCallBack,
      },
    ],
  },
};
