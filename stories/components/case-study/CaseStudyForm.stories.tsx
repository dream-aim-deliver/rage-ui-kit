import type { Meta, StoryObj } from "@storybook/react";
import {
  CaseStudyForm,
  CaseStudyParameters,
} from "@/components/case-study/CaseStudyForm.tsx";
import { useState } from "react";

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

export const Interactive = () => {
  const [parameters, setParameters] = useState<CaseStudyParameters>({
    caseStudy: undefined,
    jobId: undefined,
    tracerId: undefined,
  });
  const caseStudies = {
    "test-1": "Test 1",
    "test-2": "Test 2",
    "test-3": "Test 3",
  };

  const tracerIds: Record<string, string[]> = {
    "test-1": ["tracer-1", "tracer-3"],
    "test-2": ["tracer-1", "tracer-2"],
    "test-3": [],
  };

  const jobIds: Record<string, Record<string, number[]>> = {
    "test-1": {
      "tracer-1": [1, 2],
      "tracer-3": [3, 4],
    },
    "test-2": {
      "tracer-1": [],
      "tracer-2": [3, 4],
    },
  };

  return (
    <CaseStudyForm
      parameters={parameters}
      setParameters={setParameters}
      caseStudies={caseStudies}
      onSubmit={() => {
        alert(parameters);
      }}
      tracerIds={
        parameters.caseStudy ? tracerIds[parameters.caseStudy] : undefined
      }
      jobIds={
        parameters.caseStudy && parameters.tracerId
          ? jobIds[parameters.caseStudy][parameters.tracerId]
          : undefined
      }
    />
  );
};
