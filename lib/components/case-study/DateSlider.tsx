"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/utils/utils";

interface DateSliderProps {
  timestamps: number[]; // Timestamps in milliseconds
}

// TODO: have current date as an input field which gets validated upon timestamps from props
const DateSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & DateSliderProps
>(({ className, timestamps, ...props }, ref) => {
  const sortedTimestamps = timestamps.toSorted();
  const selectedIndex = props.value ? props.value[0] : 0;

  const currentDate = new Date(sortedTimestamps[selectedIndex] * 1000);
  const dateString =
    currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();

  return (
    <div
      className={cn("flex flex-col items-center space-y-2 w-full", className)}
    >
      <SliderPrimitive.Root
        ref={ref}
        className="relative flex w-full touch-none select-none items-center"
        value={props.value}
        onValueChange={props.onValueChange}
        max={timestamps.length - 1} // Set max to the last index of timestamps
        step={1}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-neutral-300">
          <SliderPrimitive.Range className="absolute h-full bg-neutral-50" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full bg-neutral-50 focus-visible:outline-none" />
      </SliderPrimitive.Root>
      <span className="text-neutral-50">{dateString}</span>
    </div>
  );
});
DateSlider.displayName = SliderPrimitive.Root.displayName;

export { DateSlider };
