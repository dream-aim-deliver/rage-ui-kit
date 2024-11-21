import { Input } from "@/ui/input.tsx";
import { Button } from "@/ui/button.tsx";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select.tsx";

export type CaseStudyParameters = {
  caseStudy: string;
  tracerId: string;
  jobId: string;
};

type CaseStudyFormProps = {
  caseStudies: Record<string, string>;
  onSubmit: (parameters: CaseStudyParameters) => void;
};

export const CaseStudyForm = ({
  caseStudies,
  onSubmit,
}: CaseStudyFormProps) => {
  const [caseStudy, setCaseStudy] = useState<string>("");
  const [tracerId, setTracerId] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");

  const onClick = () => {
    const parameters: CaseStudyParameters = {
      caseStudy,
      tracerId,
      jobId,
    };
    // Any validity checks should be on the side of the client
    onSubmit(parameters);
  };

  const getSelectItems = () => {
    const items = [];
    for (const [key, value] of Object.entries(caseStudies)) {
      items.push(<SelectItem value={key}>{value}</SelectItem>);
    }
    return <>{items}</>;
  };

  const onTracerIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTracerId(event.target.value);
  };

  const onJobIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setJobId(event.target.value);
  };

  return (
    <div className="flex flex-col grow space-y-4 max-w-xl">
      <Select value={caseStudy} onValueChange={setCaseStudy}>
        <SelectTrigger>
          <SelectValue placeholder="Select a case study" />
        </SelectTrigger>
        <SelectContent>{getSelectItems()}</SelectContent>
      </Select>
      <Input
        placeholder="Tracer ID"
        value={tracerId}
        onChange={onTracerIdChanged}
      />
      <Input placeholder="Job ID" value={jobId} onChange={onJobIdChanged} />
      <Button onClick={onClick}>Proceed</Button>
    </div>
  );
};
