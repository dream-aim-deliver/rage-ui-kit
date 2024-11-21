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
  const selectedIndex = props.value ? props.value[0] : 0;
  const currentDate = new Date(timestamps[selectedIndex]).toLocaleDateString();

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        value={props.value}
        onValueChange={props.onValueChange}
        max={timestamps.length - 1} // Set max to the last index of timestamps
        step={1}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200">
          <SliderPrimitive.Range className="absolute h-full bg-neutral-900" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-neutral-900 focus-visible:outline-none" />
      </SliderPrimitive.Root>
      <span>{currentDate}</span>
    </div>
  );
});
DateSlider.displayName = SliderPrimitive.Root.displayName;

export { DateSlider };
