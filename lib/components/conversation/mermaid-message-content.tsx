"use client";
import mermaid from "mermaid";
import { ReactNode, useEffect } from "react";

export const MermaidMessageContent = ({
  diagram,
  className,
}: {
  diagram: ReactNode;
  className?: string;
}) => {
  const baseClasses = "mermaid bg-blue-900 p-4 rounded-xl w-screen";
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
  }, []);

  return (
    <pre className={classes} style={{ width: "100%", whiteSpace: "normal" }}>
      {diagram}
    </pre>
  );
};
