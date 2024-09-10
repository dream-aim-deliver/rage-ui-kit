import { TCreateResearchContextViewModel } from "../models";

export const CreateResearchContextCreating = (
  props: TCreateResearchContextViewModel,
) => {
  const icon = () => {
    if (props.status === "request") {
      return "spinner";
    }
    if (props.status === "progress") {
      return "spinner";
    }
    if (props.status === "error") {
      return "error";
    }
    if (props.status === "success") {
      return "check";
    }
  };
  const title = () => {
    if (props.status === "request") {
      return "Creating research context...";
    }
    if (props.status === "progress") {
      return "Creating research context...";
    }
    if (props.status === "error") {
      return "Error";
    }
    if (props.status === "success") {
      return "Success";
    }
  };
  const message = () => {
    if (props.status === "request") {
      return "Creating research context...";
    }
    if (props.status === "progress") {
      return props.message;
    }
    if (props.status === "error") {
      return props.message;
    }
    if (props.status === "success") {
      return `Research context created: ${props.researchContext.title}`;
    }
  };
  return (
    <div className="flex flex-col gap-2 p-4 items-center justify-between">
      {icon()}
      <h1>{title()}</h1>
      <p>{message()}</p>
    </div>
  );
};
