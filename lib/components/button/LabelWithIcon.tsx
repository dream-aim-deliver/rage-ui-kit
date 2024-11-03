import { LucideIcon } from "lucide-react";

export const LabelWithIcon = ({
  label,
  Icon,
}: {
  label: string;
  Icon: LucideIcon;
}) => {
  return (
    <span className="flex flex-row items-center space-x-2">
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </span>
  );
};
