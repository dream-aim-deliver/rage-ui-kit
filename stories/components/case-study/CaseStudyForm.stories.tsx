import type { Meta, StoryObj } from "@storybook/react";
import { CaseStudyForm } from "@/components/case-study/CaseStudyForm.tsx";

const meta = {
  title: "Pages/CaseStudyForm",
  component: CaseStudyForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CaseStudyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    caseStudies: {
      "climate-monitoring": "Climate Monitoring",
      "disaster-tracking": "Disaster Tracking",
    },
    onSubmit: () => alert("Submit clicked"),
  },
};
