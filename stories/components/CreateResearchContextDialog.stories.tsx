import type { Meta, StoryObj } from "@storybook/react";

import { CreateResearchContextDialog } from "@/components/dialog/CreateResearchContextDialog";

const meta = {
  title: "Components/Dialogs/CreateResearchContext",
  component: CreateResearchContextDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateResearchContextDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    onSubmit(researchContextName, researchContextDescription, files) {
      alert(
        `Submitted: ${researchContextName}, ${researchContextDescription}, ${files}`,
      );
    },
    clientFiles: [
      {
        id: "1",
        name: "File 1",
        relativePath: "path/to/file1",
        createdAt: "2021-01-01",
      },
      {
        id: "2",
        name: "File 2",
        relativePath: "path/to/file2",
        createdAt: "2021-01-02",
      },
    ],
    viewModel: {
      status: "success",
      researchContext: {
        id: 1,
        title: "Research Context",
        description: "Description",
      },
    },
  },
};

export const Request: Story = {
  args: {
    onSubmit(researchContextName, researchContextDescription, files) {
      alert(
        `Submitted: ${researchContextName}, ${researchContextDescription}, ${files}`,
      );
    },
    clientFiles: [],
    viewModel: {
      status: "request",
      researchContextName: "Research Context",
    },
  },
};

export const Error: Story = {
  args: {
    onSubmit(researchContextName, researchContextDescription, files) {
      alert(
        `Submitted: ${researchContextName}, ${researchContextDescription}, ${files}`,
      );
    },
    clientFiles: [],
    viewModel: {
      status: "error",
      message: "Error message",
      context: "",
    },
  },
};

export const Progress: Story = {
  args: {
    onSubmit(researchContextName, researchContextDescription, files) {
      alert(
        `Submitted: ${researchContextName}, ${researchContextDescription}, ${files}`,
      );
    },
    clientFiles: [],
    viewModel: {
      status: "progress",
      message: "Progress message",
      context: "",
    },
  },
};
