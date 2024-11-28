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

export const CaseStudy: Story = {
  args: {
    parameters: {
      caseStudy: undefined,
      jobId: undefined,
      tracerId: undefined,
    },
    setParameters: () => {},
    jobIds: undefined,
    tracerIds: undefined,
    caseStudies: {
      "climate-monitoring": "Climate Monitoring",
      "disaster-tracking": "Disaster Tracking",
    },
    onSubmit: () => alert("Submit clicked"),
  },
};

export const TracerID: Story = {
  args: {
    parameters: {
      caseStudy: "climate-monitoring",
      jobId: undefined,
      tracerId: undefined,
    },
    setParameters: () => {},
    jobIds: undefined,
    tracerIds: ["test", "world"],
    caseStudies: {
      "climate-monitoring": "Climate Monitoring",
      "disaster-tracking": "Disaster Tracking",
    },
    onSubmit: () => alert("Submit clicked"),
  },
};

export const JobID: Story = {
  args: {
    parameters: {
      caseStudy: "climate-monitoring",
      jobId: undefined,
      tracerId: "test",
    },
    setParameters: () => {},
    jobIds: [0, 1],
    tracerIds: ["test", "world"],
    caseStudies: {
      "climate-monitoring": "Climate Monitoring",
      "disaster-tracking": "Disaster Tracking",
    },
    onSubmit: () => alert("Submit clicked"),
  },
};
