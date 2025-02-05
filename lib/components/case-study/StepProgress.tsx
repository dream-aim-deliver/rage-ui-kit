interface StepProgressProps {
  totalSteps: number;
  currentStep: number;
}

export const StepProgress = ({
  totalSteps,
  currentStep,
}: StepProgressProps) => {
  const step = Math.min(currentStep, totalSteps);
  let progress = (step / totalSteps) * 100;

  if (progress > 100) {
    progress = 100;
  }

  return (
    <div className="w-full max-w-md">
      <div className="relative h-3 w-full overflow-hidden rounded-full border border-neutral-200">
        <div
          className="absolute h-full bg-neutral-900"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
