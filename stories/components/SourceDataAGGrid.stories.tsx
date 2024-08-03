import type { Meta, StoryObj } from "@storybook/react";
import { Button as ShadcnButton } from "@/components/button/index";

import {
  SourceDataAGGrid,
  SourceDataRow,
} from "@/components/table/SourceDataAGGrid";

const meta: Meta = {
  title: "Components/AGGrid/SourceData",
  component: SourceDataAGGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SourceDataAGGrid>;

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
  const file_number = randomChoice(thousand);
  const extensions = ["txt", "csv", "json", "xml"];
  const ext = randomChoice(extensions);
  const relative_path = `/sda/${randomChoice<number>(thousand)}/${randomChoice<string>(topics)}/file_${file_number}.${ext}`;

  const statuses = [
    "created",
    "available",
    "unavailable",
    "inconsistent_dataset",
  ];

  const startDate_c = new Date(2024, 0, 1);
  const endDate_c = new Date(2024, 1, 1);
  const created_at = getRandomDate(startDate_c, endDate_c).toISOString();

  const startDate_u = new Date(2024, 1, 2);
  const endDate_u = new Date();
  const updated_at = getRandomDate(startDate_u, endDate_u).toISOString();

  const datum: SourceDataRow = {
    id: randomChoice(thousand),
    name: `File ${file_number}`,
    relative_path: relative_path,
    type: ext,
    protocol: "S3",
    status: randomChoice(statuses),
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

const alertRawCallBack = (selectedRows: SourceDataRow[]) => {
  alert(
    "Selected rows:\n\n" +
      selectedRows.map((row) => JSON.stringify(row)).join("\n\n"),
  );
};

const alertButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ShadcnButton
      label={"Alert selected file names"}
      variant="default"
      onClick={onClick}
      title="Alert the file names of the selected rows"
    />
  );
};

const alertCallBack = (selectedRows: SourceDataRow[]) => {
  alert(
    "Selected file names:\n\n- " +
      selectedRows.map((row) => row.name).join("\n- "),
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
