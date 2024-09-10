import type { Meta, StoryObj } from "@storybook/react";
import { ResearchContextCard } from "@/components/research-context/research-context-card";
import { ListResearchContextCard } from "@/components/research-context/list-research-context-layout";

const handleNavigateToSourcesPage = (id: number) => {
  alert(`Navigate to sources for item ${id}`);
};

const handleNavigateToListConversationPage = (id: number) => {
  alert(`Navigate to conversations for item ${id}`);
};

// Single card
const singleCardProps = {
  id: 1,
  title: "Research Context 1",
  description: "This is a sample description for research context 1.",
  callbacks: {
    onNavigateToSourcesPage: handleNavigateToSourcesPage,
    onNavigateToListConversationPage: handleNavigateToListConversationPage,
  },
};

// List of cards
const listOfCardsProps = [
  {
    id: 1,
    title: "Research Context 1",
    description: "This is a sample description for research context 1.",
    callbacks: {
      onNavigateToSourcesPage: handleNavigateToSourcesPage,
      onNavigateToListConversationPage: handleNavigateToListConversationPage,
    },
  },
  {
    id: 2,
    title: "Research Context 2",
    description: "This is a sample description for research context 2.",
    callbacks: {
      onNavigateToSourcesPage: handleNavigateToSourcesPage,
      onNavigateToListConversationPage: handleNavigateToListConversationPage,
    },
  },
  {
    id: 3,
    title: "Research Context 3",
    description: "This is a sample description for research context 3.",
    callbacks: {
      onNavigateToSourcesPage: handleNavigateToSourcesPage,
      onNavigateToListConversationPage: handleNavigateToListConversationPage,
    },
  },
  {
    id: 4,
    title: "Research Context 4",
    description: "This is a sample description for research context 3.",
    callbacks: {
      onNavigateToSourcesPage: handleNavigateToSourcesPage,
      onNavigateToListConversationPage: handleNavigateToListConversationPage,
    },
  },
  {
    id: 5,
    title: "Research Context 5",
    description: "This is a sample description for research context 3.",
    callbacks: {
      onNavigateToSourcesPage: handleNavigateToSourcesPage,
      onNavigateToListConversationPage: handleNavigateToListConversationPage,
    },
  },
  {
    id: 6,
    title: "Research Context 6",
    description: "This is a sample description for research context 3.",
    callbacks: {
      onNavigateToSourcesPage: handleNavigateToSourcesPage,
      onNavigateToListConversationPage: handleNavigateToListConversationPage,
    },
  },
];

const meta = {
  title: "Components/ResearchContextCard",
  component: ResearchContextCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ResearchContextCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleCard: Story = {
  args: singleCardProps,
};

export const ListOfCards = {
  render: () => <ListResearchContextCard items={listOfCardsProps} />,
};
