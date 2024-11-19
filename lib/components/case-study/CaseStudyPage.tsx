import { z } from "zod";
import {
  ClimateDataSchema,
  ClimateDataTable,
} from "@/components/table/case-study/ClimateDataTable.tsx";
import {
  DisasterDataSchema,
  DisasterDataTable,
} from "@/components/table/case-study/DisasterDataTable.tsx";
import { useRef, useState } from "react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";
import { CaseStudyTable } from "@/components/table/case-study/CaseStudyTable.tsx";
import { ChatPage, TMessage } from "@/lib/components";
import { Skeleton } from "@/ui/skeleton.tsx";
import { cn } from "@/utils/utils.ts";

const BaseKeyframeSchema = z.object({
  timestamp: z.string(),
  image: z.object({
    signedUrl: z.string().url(),
    description: z.string(),
  }),
  expirationTime: z.number().int().positive(), // A unix timestamp
});

const ClimateKeyframeSchema = BaseKeyframeSchema.merge(
  z.object({
    caseStudy: z.literal("climate-monitoring"),
    data: z.array(ClimateDataSchema),
  }),
);

const DisasterKeyframeSchema = BaseKeyframeSchema.merge(
  z.object({
    caseStudy: z.literal("disaster-tracking"),
    data: z.array(DisasterDataSchema),
  }),
);

const KeyframeSchema = z.discriminatedUnion("caseStudy", [
  ClimateKeyframeSchema,
  DisasterKeyframeSchema,
]);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttleTimeoutId = useRef<any>(undefined);

  const onTimestampChange = (newValue: number[]) => {
    setIsLoading(true);
    setSelectedTimestampIndex(newValue[0]);

    if (throttleTimeoutId.current === undefined) {
      throttleTimeoutId.current = setTimeout(() => {
        setIsLoading(false);
        throttleTimeoutId.current = undefined;
      }, 1000);
    }
  };

  const currentFrame = keyframes[selectedTimestampIndex];

  const tablesForCaseStudies: Record<
    TKeyframe["caseStudy"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CaseStudyTable<any>
  > = {
    "climate-monitoring": ClimateDataTable,
    "disaster-tracking": DisasterDataTable,
  };

  const Table = tablesForCaseStudies[currentFrame.caseStudy];

  const getImage = () => {
    const commonClasses = "lg:flex-1 w-full lg:h-auto h-[300px]";

    if (isLoading) {
      return <Skeleton className={commonClasses} />;
    } else {
      return (
        <div
          className={cn(commonClasses, "bg-cover bg-center")}
          style={{ backgroundImage: `url(${currentFrame.image.signedUrl})` }}
        ></div>
      );
    }
  };

  // TODO: display image description as a hint on hover
  return (
    <div className="lg:flex lg:flex-row grow lg:space-x-4 lg:space-y-0 space-y-4 space-x-0">
      <div className="flex flex-1 flex-col grow space-y-4">
        {timelineEnabled && (
          <DateSlider
            timestamps={keyframes.map((frame) => parseInt(frame.timestamp))}
            value={[selectedTimestampIndex]}
            onValueChange={onTimestampChange}
          />
        )}
        {getImage()}
        <div className="flex flex-1 grow">
          <Table
            rowData={isLoading ? [] : currentFrame.data}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="flex lg:flex-1 grow lg:h-auto h-[600px]">
        <ChatPage messages={messages} onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};
