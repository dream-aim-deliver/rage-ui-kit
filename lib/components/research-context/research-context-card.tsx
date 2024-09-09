export interface ResearchContextCardProps {
  title: string;
  description: string;
  id: number;
  callbacks: {
    onNavigateToSourcesPage: (id: number) => void;
    onNavigateToListConversationPage: (id: number) => void;
  };
}

export const ResearchContextCard = (props: ResearchContextCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button onClick={() => props.callbacks.onNavigateToSourcesPage(props.id)}>
        Sources
      </button>
      <button
        onClick={() =>
          props.callbacks.onNavigateToListConversationPage(props.id)
        }
      >
        Conversuations
      </button>
    </div>
  );
};
