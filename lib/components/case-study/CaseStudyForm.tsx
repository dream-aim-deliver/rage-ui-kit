import { Button } from "@/ui/button.tsx";
import React, { SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select.tsx";

export type CaseStudyParameters = {
  caseStudy?: string;
  tracerId?: string;
  jobId?: number;
};

type CaseStudyFormProps = {
  parameters: CaseStudyParameters;
  setParameters: React.Dispatch<SetStateAction<CaseStudyParameters>>;
  caseStudies: Record<string, string>;
  tracerIds?: string[];
  jobIds?: number[];
  onSubmit: () => void;
};

export const CaseStudyForm = ({
  caseStudies,
  onSubmit,
  setParameters,
  parameters,
  tracerIds,
  jobIds,
}: CaseStudyFormProps) => {
  const onClick = () => {
    // Any validity checks should be on the side of the client
    onSubmit();
  };

  const getCaseStudySelectItems = () => {
    const items = [];
    for (const [key, value] of Object.entries(caseStudies)) {
      items.push(<SelectItem value={key}>{value}</SelectItem>);
    }
    return <>{items}</>;
  };

  const getJobIdSelectItems = () => {
    if (!jobIds) return <></>;
    return jobIds.map((jobId) => (
      <SelectItem key={`jobId-${jobId}`} value={jobId.toString()}>
        {jobId}
      </SelectItem>
    ));
  };

  const getTracerIdSelectItems = () => {
    if (!tracerIds) return <></>;
    return tracerIds.map((tracerId) => (
      <SelectItem key={`tracerId-${tracerId}`} value={tracerId}>
        {tracerId}
      </SelectItem>
    ));
  };

  const onCaseStudyChanged = (value: string) => {
    setParameters({
      caseStudy: value,
      jobId: undefined,
      tracerId: undefined,
    });
  };

  const getJobIdPlaceholder = () => {
    if (!jobIds) return "Select a case study and tracer ID first";
    if (jobIds.length === 0) return "No job IDs found";
    return "Select a job ID";
  };

  const getTracerIdPlaceholder = () => {
    if (!tracerIds) return "Select a case study first";
    if (tracerIds.length === 0) return "No tracer IDs found";
    return "Select a tracer ID";
  };

  const onJobIdChanged = (value: string) => {
    setParameters((prevState) => ({
      caseStudy: prevState.caseStudy,
      jobId: parseInt(value),
      tracerId: prevState.tracerId,
    }));
  };

  const onTracerIdChanged = (value: string) => {
    setParameters((prevState) => ({
      caseStudy: prevState.caseStudy,
      jobId: undefined,
      tracerId: value,
    }));
  };

  return (
    <div className="flex flex-col grow space-y-4 max-w-xl">
      <Select value={parameters.caseStudy} onValueChange={onCaseStudyChanged}>
        <SelectTrigger>
          <SelectValue placeholder="Select a case study" />
        </SelectTrigger>
        <SelectContent>{getCaseStudySelectItems()}</SelectContent>
      </Select>
      <Select
        disabled={tracerIds === undefined || tracerIds.length === 0}
        value={parameters.tracerId?.toString()}
        onValueChange={onTracerIdChanged}
        key={parameters.caseStudy}
      >
        <SelectTrigger>
          <SelectValue placeholder={getTracerIdPlaceholder()} />
        </SelectTrigger>
        <SelectContent>{getTracerIdSelectItems()}</SelectContent>
      </Select>
      <Select
        disabled={jobIds === undefined || jobIds.length === 0}
        value={parameters.jobId?.toString()}
        onValueChange={onJobIdChanged}
        key={(parameters.caseStudy ?? "") + (parameters.tracerId ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder={getJobIdPlaceholder()} />
        </SelectTrigger>
        <SelectContent>{getJobIdSelectItems()}</SelectContent>
      </Select>
      <Button onClick={onClick}>Proceed</Button>
    </div>
  );
};
