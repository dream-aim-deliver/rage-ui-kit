import type { Meta, StoryObj } from "@storybook/react";

import { SourceDataAGGrid } from "@/components/table/SourceDataDemo";

const meta: Meta = {
  title: "Components/AGGrid/FuckThisShit",
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

  // const statuses = [
  //   "created",
  //   "available",
  //   "unavailable",
  //   "inconsistent_dataset",
  // ];

  const startDate_c = new Date(2024, 0, 1);
  const endDate_c = new Date(2024, 1, 1);
  const created_at = getRandomDate(startDate_c, endDate_c).toISOString();

  // const startDate_u = new Date(2024, 1, 2);
  // const endDate_u = new Date();
  // const updated_at = getRandomDate(startDate_u, endDate_u).toISOString();

  const datum = {
    id: randomChoice(thousand).toString(),
    name: `File names can be long ${file_number}`,
    relativePath: relative_path,
    createdAt: created_at,
  };

  return datum;
};

export const WithAlertSelectionButtons: Story = {
  args: {
    rowData: Array.from({ length: 106 }, dataGenerator),
    isLoading: false,
    download: {
      isDownloading: false,
      progress: 40,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onDownload: (selectedRows: any) => {
        console.log(selectedRows);
      },
    },
  },
};
