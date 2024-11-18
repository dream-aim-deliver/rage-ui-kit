import { z } from "zod";
import {
  ClimateDataSchema,
  ClimateDataTable,
} from "@/components/table/case-study/ClimateDataTable.tsx";
import {
  DisasterDataSchema,
  DisasterDataTable,
} from "@/components/table/case-study/DisasterDataTable.tsx";
import { useEffect, useState } from "react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";
import { CaseStudyTable } from "@/components/table/case-study/CaseStudyTable.tsx";
import { ChatPage, TMessage } from "@/lib/components";

const ClimateKeyframeSchema = z.object({
  timestamp: z.string(),
  image: z.object({
    url: z.string().url(),
    description: z.string(),
  }),
  caseStudy: z.literal("climate"),
  data: z.array(ClimateDataSchema),
});

const DisasterKeyframeSchema = z.object({
  timestamp: z.string(),
  image: z.object({
    url: z.string().url(),
    description: z.string(),
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onTimestampChange = (newValue: number[]) => {
    setIsLoading(true);
    setSelectedTimestampIndex(newValue[0]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentFrame = keyframes[selectedTimestampIndex];

  const tablesForCaseStudies: Record<
    TKeyframe["caseStudy"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CaseStudyTable<any>
  > = {
    climate: ClimateDataTable,
    disaster: DisasterDataTable,
  };

  const Table = tablesForCaseStudies[currentFrame.caseStudy];

  // TODO: display image description as a hint on hover
  return (
    <div className="flex flex-row grow space-x-4">
      <div className="flex flex-1 flex-col grow space-y-4">
        <div
          className="flex-1 bg-cover bg-center w-full h-auto"
          style={{ backgroundImage: `url(${currentFrame.image.url})` }}
        ></div>
        <div className="flex flex-1 grow">
          <Table
            rowData={isLoading ? [] : currentFrame.data}
            isLoading={isLoading}
          />
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
