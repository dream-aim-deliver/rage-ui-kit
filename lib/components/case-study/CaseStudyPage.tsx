import { z } from "zod";
import {
  ClimateDataSchema,
  ClimateDataTable,
} from "@/components/table/case-study/ClimateDataTable.tsx";
import {
  DisasterDataSchema,
  DisasterDataTable,
} from "@/components/table/case-study/DisasterDataTable.tsx";
import { useState } from "react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";
import { CaseStudyTable } from "@/components/table/case-study/CaseStudyTable.tsx";
import { ChatPage, TMessage } from "@/lib/components";

const ClimateKeyframeSchema = z.object({
  timestamp: z.string(),
  image: z.object({
    url: z.string().url(),
    description: z.string(), // TODO: display as a hint
  }),
  caseStudy: z.literal("climate"),
  data: z.array(ClimateDataSchema),
});

const DisasterKeyframeSchema = z.object({
  timestamp: z.string(),
  image: z.object({
    url: z.string().url(),
    description: z.string(), // TODO: display as a hint
  }),
  caseStudy: z.literal("disaster"),
  data: z.array(DisasterDataSchema),
});

const KeyframeSchema = z.union([ClimateKeyframeSchema, DisasterKeyframeSchema]);

export type TKeyframe = z.infer<typeof KeyframeSchema>;

export interface CaseStudyPageProps {
  keyframes: TKeyframe[];
  messages: TMessage[];
  onSendMessage?: (message: string) => void;
}

export const CaseStudyPage = ({
  keyframes,
  messages,
  onSendMessage,
}: CaseStudyPageProps) => {
  const timelineEnabled = keyframes.length > 1;

  const [selectedTimestampIndex, setSelectedTimestampIndex] =
    useState<number>(0);

  const onTimestampChange = (newValue: number[]) => {
    setSelectedTimestampIndex(newValue[0]);
  };

  const currentFrame = keyframes[selectedTimestampIndex];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tablesForCaseStudies: Record<string, CaseStudyTable<any>> = {
    climate: ClimateDataTable,
    disaster: DisasterDataTable,
  };
  const Table = tablesForCaseStudies[currentFrame.caseStudy];

  // TODO: implement slider throttling

  return (
    <div className="flex flex-row grow space-x-4">
      <div className="flex flex-1 flex-col grow space-y-4">
        <div
          className="flex-1 bg-cover bg-center w-full h-auto"
          style={{ backgroundImage: `url(${currentFrame.image.url})` }}
        ></div>
        <div className="flex flex-1 grow">
          <Table rowData={currentFrame.data} isLoading={false} />
        </div>
        {timelineEnabled && (
          <DateSlider
            timestamps={keyframes.map((frame) => parseInt(frame.timestamp))}
            value={[selectedTimestampIndex]}
            onValueChange={onTimestampChange}
          />
        )}
      </div>
      <div className="flex flex-1 grow">
        <ChatPage messages={messages} onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};
