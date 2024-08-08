import mermaid from "mermaid";
import { ReactNode, useEffect } from "react";

export const MermaidMessageContent = ({
  diagram,
  className,
}: {
  diagram: ReactNode;
  className?: string;
}) => {
  const baseClasses = "mermaid overflow-x-auto bg-blue-900 p-4 rounded-xl";
  const classes = className ? `baseClasses ${className}` : baseClasses;
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "linear",
      },
    });
    mermaid.contentLoaded();
  });

  return <pre className={classes}>{diagram}</pre>;
};
