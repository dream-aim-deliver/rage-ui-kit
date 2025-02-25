import { z } from "zod";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { DateSlider } from "@/components/case-study/DateSlider.tsx";
import { Skeleton } from "@/ui/skeleton.tsx";
import { cn } from "@/utils/utils.ts";
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
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { XIcon } from "lucide-react";
import {
  SwissGridDataSchema,
  SwissGridDataTable,
} from "@/components/case-study/table/SwissGridDataTable.tsx";
import { useToast } from "@/ui/use-toast.tsx";

const ErrorSchema = z.object({
  errorName: z.string(),
  errorMessage: z.string(),
});
export type TError = z.infer<typeof ErrorSchema>;

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

const SwissGridKeyframeSchema = BaseKeyframeSchema.merge(
  z.object({
    data: z.array(SwissGridDataSchema.or(ErrorSchema)),
  }),
);

const BaseInfoSchema = z.object({
  expirationTime: z.number().int().positive(),
  imageKinds: z.array(z.string()),
});

const ClimateInfoSchema = BaseInfoSchema.merge(
  z.object({
    caseStudy: z.literal("climate-monitoring"),
    keyframes: z.array(ClimateKeyframeSchema),
  }),
);

const SentinelInfoSchema = BaseInfoSchema.merge(
  z.object({
    caseStudy: z.literal("sentinel-5p"),
    keyframes: z.array(SentinelKeyframeSchema),
  }),
);

const SwissGridInfoSchema = BaseInfoSchema.merge(
  z.object({
    caseStudy: z.literal("swissgrid"),
    keyframes: z.array(SwissGridKeyframeSchema),
  }),
);

const InfoSchema = z.discriminatedUnion("caseStudy", [
  ClimateInfoSchema,
  SentinelInfoSchema,
  SwissGridInfoSchema,
]);
type TInfoSchema = z.infer<typeof InfoSchema>;

export interface CaseStudyPageProps {
  info: TInfoSchema;
  sideComponent: ReactNode;
}

export const CaseStudyPage = ({ info, sideComponent }: CaseStudyPageProps) => {
  const { toast } = useToast();

  const keyframes = info.keyframes;
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

  useEffect(() => {
    let hasError = false;
    for (const row of currentFrame.data) {
      const errorParseResult = ErrorSchema.safeParse(row);
      if (errorParseResult.success) {
        console.log(
          "A keyframe row indicated an error:",
          errorParseResult.data.errorMessage,
        );
        hasError = true;
      }
    }
    for (const image of currentFrame.images) {
      const errorParseResult = ErrorSchema.safeParse(image);
      if (errorParseResult.success) {
        console.log(
          "A keyframe image indicated an error:",
          errorParseResult.data.errorMessage,
        );
        hasError = true;
      }
    }

    if (!hasError) return;

    const toasterTimer = setTimeout(() => {
      toast({
        title: "Error",
        description:
          "There were faulty entries in the keyframe. Please check the console for details.",
        variant: "warning",
      });
    }, 500);

    return () => {
      clearTimeout(toasterTimer);
    };
  }, [currentFrame, toast]);

  const tablesForCaseStudies: Record<
    TInfoSchema["caseStudy"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CaseStudyTable<any>
  > = {
    "climate-monitoring": ClimateDataTable,
    "sentinel-5p": SentinelDataTable,
    swissgrid: SwissGridDataTable,
  };

  const Table = tablesForCaseStudies[info.caseStudy];
  const [imageKind, setImageKind] = useState<string>(info.imageKinds[0] ?? "");

  const getImageKindSelector = () => {
    if (info.imageKinds.length === 0) {
      return <></>;
    }
    return (
      <Select value={imageKind} onValueChange={setImageKind}>
        <SelectTrigger className="mb-3">
          <SelectValue placeholder="Select an image kind" />
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

  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const switchPopupVisible = () => {
    setPopupVisible((prevState) => !prevState);
  };

  const getImagePopup = (image: TImage) => {
    const visibilityClass = popupVisible ? "visible" : "hidden";
    const formattedDescription = image.description.replaceAll(" | ", "\n");

    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center ${visibilityClass} z-50 cursor-zoom-out`}
        onClick={() => switchPopupVisible()}
      >
        <div
          className="relative max-w-screen-lg space-y-2 w-full p-4 bg-white rounded-lg cursor-default overflow-y-auto max-h-screen"
          onClick={(event) => {
            // Don't propagate the clicks to the parent
            event.stopPropagation();
          }}
        >
          <XIcon
            onClick={() => switchPopupVisible()}
            className="cursor-pointer"
          />
          <div className="flex w-full justify-center mb-2">
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={image.signedUrl}
                  alt="full image"
                  className="w-full h-auto object-cover"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          <p className="whitespace-pre-wrap">{formattedDescription}</p>
        </div>
      </div>
    );
  };

  const getImageBlock = () => {
    const commonClasses = "rounded-lg lg:flex-1 w-full max-h-[250px] h-[250px]";
    let imageElement;
    if (info.imageKinds.length === 0) {
      imageElement = currentFrame.images[0];
    } else {
      imageElement = currentFrame.images.find((image) => {
        return (image as TImage).kind === imageKind;
      });
    }

    let errorMessage: string | undefined = undefined;

    if (!imageElement) {
      errorMessage = "Missing an image";
    }

    if (ErrorSchema.safeParse(imageElement).success) {
      const imageError = imageElement as TError;
      errorMessage = imageError.errorMessage;
    }

    if (isLoading) {
      return <Skeleton className={commonClasses} />;
    } else if (errorMessage) {
      return (
        <div
          className={cn(
            commonClasses,
            "bg-neutral-100 flex items-center justify-center",
          )}
        >
          <span>{errorMessage}</span>
        </div>
      );
    } else {
      const image = imageElement as TImage;
      return (
        <>
          {getImagePopup(image)}
          <div className={cn(commonClasses, "relative border")}>
            <Skeleton className={cn(commonClasses, "absolute inset-0 z-0")} />;
            <img
              loading="lazy"
              className={cn(
                commonClasses,
                "absolute inset-0 z-10 object-cover object-center cursor-zoom-in",
              )}
              src={image.signedUrl}
              onClick={() => switchPopupVisible()}
              alt="collapsed image"
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="lg:flex lg:flex-row grow lg:space-x-4 lg:space-y-0 space-y-4 space-x-0 max-w-full">
      <div className="flex flex-1 flex-col grow">
        {getImageKindSelector()}
        <div className="relative h-[250px]">
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
            rowData={
              isLoading
                ? []
                : currentFrame.data.filter(
                    (row) => !ErrorSchema.safeParse(row).success,
                  )
            }
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="flex lg:flex-1 grow lg:h-auto h-[600px]">
        {sideComponent}
      </div>
    </div>
  );
};
