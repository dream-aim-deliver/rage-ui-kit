export const ErrorOverlay = ({ message }: { message: string }) => {
  // TODO: add an icon
  return (
    <div className="text-neutral-600 dark:text-neutral-100">{message}</div>
  );
};
