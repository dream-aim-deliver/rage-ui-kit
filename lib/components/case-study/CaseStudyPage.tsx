import { z } from "zod";
import React, { useRef, useState } from "react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";
import { ChatPage, TMessage } from "@/lib/components";
import { Skeleton } from "@/ui/skeleton.tsx";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import { cn } from "@/utils/utils.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip.tsx";
import {
  SentinelDataSchema,
  SentinelDataTable,
} from "@/components/case-study/table/SentinelDataTable.tsx";
import {
  ClimateDataSchema,
  ClimateDataTable,
} from "@/components/case-study/table/ClimateDataTable.tsx";
import { CaseStudyTable } from "@/components/case-study/table/CaseStudyTable.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select.tsx";

const ErrorSchema = z.object({
  errorName: z.string(),
  errorMessage: z.string(),
});
type TError = z.infer<typeof ErrorSchema>;

const ImageSchema = z.object({
  relativePath: z.string(),
  signedUrl: z.string().url(),
  description: z.string(),
  kind: z.string(),
});
type TImage = z.infer<typeof ImageSchema>;

const BaseKeyframeSchema = z.object({
  timestamp: z.string(),
  images: z.array(ImageSchema.or(ErrorSchema)),
  dataDescription: z.string(),
});

const ClimateKeyframeSchema = BaseKeyframeSchema.merge(
  z.object({
    data: z.array(ClimateDataSchema.or(ErrorSchema)),
  }),
);

const SentinelKeyframeSchema = BaseKeyframeSchema.merge(
  z.object({
    data: z.array(SentinelDataSchema.or(ErrorSchema)),
  }),
);

const BaseInfoSchema = z.object({
  expirationTime: z.number().int().positive(),
  imageKinds: z.array(z.string()),
});

const ClimateInfoSchema = BaseInfoSchema.merge(
  z.object({
    caseStudy: z.literal("climate-monitoring"),
    keyFrames: z.array(ClimateKeyframeSchema),
  }),
);

const SentinelInfoSchema = BaseInfoSchema.merge(
  z.object({
    caseStudy: z.literal("sentinel-5p"),
    keyFrames: z.array(SentinelKeyframeSchema),
  }),
);

const InfoSchema = z.discriminatedUnion("caseStudy", [
  ClimateInfoSchema,
  SentinelInfoSchema,
]);
type TInfoSchema = z.infer<typeof InfoSchema>;

export interface CaseStudyPageProps {
  info: TInfoSchema;
  messages: TMessage[];
  onSendMessage?: (message: string) => void;
}

export const CaseStudyPage = ({
  info,
  messages,
  onSendMessage,
}: CaseStudyPageProps) => {
  const keyframes = info.keyFrames;
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
    TInfoSchema["caseStudy"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CaseStudyTable<any>
  > = {
    "climate-monitoring": ClimateDataTable,
    "sentinel-5p": SentinelDataTable,
  };

  const Table = tablesForCaseStudies[info.caseStudy];
  const [imageKind, setImageKind] = useState<string>(info.imageKinds[0] ?? "");

  const getImageKindSelector = () => {
    return (
      <Select value={imageKind} onValueChange={setImageKind}>
        <SelectTrigger className="mb-3">
          <SelectValue placeholder="Select a case study" />
        </SelectTrigger>
        <SelectContent>
          {info.imageKinds.map((kind) => {
            return (
              <SelectItem key={kind} value={kind}>
                {kind}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  };

  const getImageBlock = () => {
    const commonClasses = "rounded-lg lg:flex-1 w-full max-h-[300px] h-[300px]";
    let imageElement;
    if (info.imageKinds.length === 0) {
      imageElement = currentFrame.images[0];
    } else {
      imageElement = currentFrame.images.find((image) => {
        return (image as TImage).kind === imageKind;
      });
    }

    if (!imageElement) {
      return <span>Couldn't load</span>;
    }

    if (ErrorSchema.safeParse(imageElement).success) {
      const imageError = imageElement as TError;
      return <span>{imageError.errorMessage}</span>;
    }

    const image = imageElement as TImage;

    // A wrapper is required for skeleton display during image loading
    const imageContents = (
      <div className={cn(commonClasses, "relative border")}>
        <Skeleton className={cn(commonClasses, "absolute inset-0 z-0")} />;
        <Zoom>
          <img
            loading="lazy"
            className={cn(
              commonClasses,
              "absolute inset-0 z-10 object-cover object-center",
            )}
            src={image.signedUrl}
          />
        </Zoom>
      </div>
    );

    if (isLoading) {
      return <Skeleton className={commonClasses} />;
    } else {
      return (
        <TooltipProvider delayDuration={250}>
          <Tooltip>
            <TooltipTrigger asChild>{imageContents}</TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{image.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  };

  return (
    <div className="lg:flex lg:flex-row grow lg:space-x-4 lg:space-y-0 space-y-4 space-x-0">
      <div className="flex flex-1 flex-col grow">
        {getImageKindSelector()}
        <div className="relative h-[300px]">
          {getImageBlock()}
          {timelineEnabled && (
            <DateSlider
              className="absolute inset-0 self-end p-4 z-20 bg-neutral-900 bg-opacity-40 rounded-b-lg"
              timestamps={keyframes.map((frame) => parseInt(frame.timestamp))}
              value={[selectedTimestampIndex]}
              onValueChange={onTimestampChange}
            />
          )}
        </div>
        <div className="flex flex-1 grow">
          <Table
            rowData={isLoading ? [] : currentFrame.data}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="flex lg:flex-1 grow lg:h-auto h-[600px]">
        <ChatPage
          messages={messages}
          onSendMessage={onSendMessage}
          className="border rounded-lg"
        />
      </div>
    </div>
  );
};
