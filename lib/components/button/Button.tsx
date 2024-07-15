import { Button as ShadcnButton } from "@/ui/button";
// import { primary as primaryStyles, secondary as secondaryStyles } from "@/components/button/Button.styles";

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /**
   * How large should the button be?
   */
  size?: "sm" | "default" | "lg" | "icon";
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * Button contents. Can be a string or a React node (e.g. an icon)
   */
  label: string | React.ReactNode;
  /**
   * Button type. Can be "button", "submit", or "reset"
   */
  type?: "button" | "submit" | "reset";
  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Optional tailwindcss classes
   */
  className?: string;
}

/**
 * Button component
 */
export const Button = ({
  variant = "default",
  size = "default",
  type = "button",
  label,
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton variant={variant} size={size} type={type} {...props}>
      {label}
    </ShadcnButton>
  );
};
