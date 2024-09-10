import type { Meta, StoryObj } from "@storybook/react";

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

  const startDate_c = new Date(2024, 0, 1);
  const endDate_c = new Date(2024, 1, 1);
  const created_at = getRandomDate(startDate_c, endDate_c).toISOString();

  const datum: SourceDataRow = {
    id: randomChoice(thousand).toString(),
    name: `File names can be long ${file_number}`,
    relativePath: relative_path,
    createdAt: created_at,
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
    enableUpload: false,
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
    enableUpload: true,
    handleDownloadSourceData: (name: string, relativePath: string) => {
      alert(`Downloading source data '${relativePath}', with name '${name}'`);
    },
    handleUploadSourceData: () => {
      alert(`Uploading source data...`);
    },
  },
};

export const WithUploading: Story = {
  args: {
    rowData: Array.from({ length: 106 }, dataGenerator),
    isLoading: false,
    isUploading: true,
    enableUpload: true,
    handleDownloadSourceData: (name: string, relativePath: string) => {
      alert(`Downloading source data '${relativePath}' with name '${name}'`);
    },
    handleUploadSourceData: () => {
      alert(`Uploading source data...`);
    },
  },
};
