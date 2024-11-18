import type { Meta, StoryObj } from "@storybook/react";
import { generateTimestamps } from "../../utils.ts";
import {
  CaseStudyPage,
  TKeyframe,
} from "@/components/case-study/CaseStudyPage.tsx";
import { TDisasterData } from "@/components/table/case-study/DisasterDataTable.tsx";
import { TClimateData } from "@/components/table/case-study/ClimateDataTable.tsx";

const meta = {
  title: "Pages/CaseStudy",
  component: CaseStudyPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      // The current tailwind setup doesn't allow to set those properties
      <div style={{ height: "100vh", margin: "10px" }} className="flex">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof CaseStudyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateDisasterDataFixture = (): TDisasterData => {
  return {
    id: "example",
    name: "Example",
    dateOccurred: new Date("2024-08-15T00:00:00Z"),
    affectedPopulation: Math.floor(Math.random() * 1000000),
  };
};

const generateClimateDataFixture = (): TClimateData => {
  return {
    id: "example",
    location: "Example",
    temperature: Math.floor(Math.random() * (100 - -100 + 1)) - 100, // Random temperature between -100 and 100
    humidity: Math.floor(Math.random() * (100 + 1)), // Random humidity between 0 and 100
  };
};

const generateFixtureKeyframe = (
  caseStudy: "climate" | "disaster",
  timestamp: string,
): TKeyframe => {
  const length = 30;
  const baseFrame = {
    timestamp,
    image: {
      url: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      description: "Example",
    },
  };

  if (caseStudy === "climate") {
    return {
      ...baseFrame,
      caseStudy: caseStudy,
      data: Array.from({ length: length }, generateClimateDataFixture),
    };
  } else {
    return {
      ...baseFrame,
      caseStudy: caseStudy,
      data: Array.from({ length: length }, generateDisasterDataFixture),
    };
  }
};

export const Climate: Story = {
  args: {
    keyframes: generateTimestamps(30).map((timestamp) =>
      generateFixtureKeyframe("climate", timestamp.toString()),
    ),
    messages: [],
  },
};

export const Disaster: Story = {
  args: {
    // Generate a single keyframe
    keyframes: generateTimestamps(0).map((timestamp) =>
      generateFixtureKeyframe("disaster", timestamp.toString()),
    ),
    messages: [],
  },
};

export const ClimateMessages: Story = {
  args: {
    keyframes: generateTimestamps(30).map((timestamp) =>
      generateFixtureKeyframe("climate", timestamp.toString()),
    ),
    messages: [
      {
        sender_type: "user",
        status: "success",
        message_contents: [
          {
            content: "Hello, can you render formatted text?",
            content_type: "text",
          },
        ],
        created_at: `${Date.now()}`,
        sender: "Carla",
      },
      {
        sender_type: "agent",
        status: "success",
        message_contents: [
          {
            content: "Hello, yes. \n Let me give you an example:",
            content_type: "text",
          },
        ],
        created_at: `${Date.now()}`,
        sender: "Agent",
      },
      {
        sender_type: "user",
        status: "success",
        message_contents: [
          {
            content: "Well done!",
            content_type: "text",
          },
        ],
        created_at: `${Date.now()}`,
        sender: "Carla",
      },
    ],
    onSendMessage: (message) => {
      alert(`Message sent: ${message}`);
    },
  },
};
