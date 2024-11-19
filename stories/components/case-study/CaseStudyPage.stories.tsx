import type { Meta, StoryObj } from "@storybook/react";
import { generateTimestamps } from "../../utils.ts";
import {
  CaseStudyPage,
  TKeyframe,
} from "@/components/case-study/CaseStudyPage.tsx";
import { TDisasterData } from "@/components/table/case-study/DisasterDataTable.tsx";
import { TClimateData } from "@/components/table/case-study/ClimateDataTable.tsx";
import { faker } from "@faker-js/faker";

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
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    dateOccurred: faker.date.past({ years: 1 }),
    affectedPopulation: faker.number.int({ min: 0, max: 1000000 }),
  };
};

const generateClimateDataFixture = (): TClimateData => {
  return {
    id: faker.string.uuid(),
    location: faker.location.city(),
    temperature: faker.number.int({ min: -100, max: 100 }),
    humidity: faker.number.int({ min: 0, max: 100 }),
  };
};

const generateFixtureKeyframe = (
  caseStudy: "climate-monitoring" | "disaster-tracking",
  timestamp: string,
): TKeyframe => {
  const length = 30;
  const baseFrame = {
    timestamp,
    image: {
      signedUrl: faker.image.url({ width: 640, height: 480 }),
      description: faker.lorem.sentence(),
    },
    expirationTime: faker.date.anytime().getTime(),
  };

  if (caseStudy === "climate-monitoring") {
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
      generateFixtureKeyframe("climate-monitoring", timestamp.toString()),
    ),
    messages: [],
  },
};

export const Disaster: Story = {
  args: {
    // Generate a single keyframe
    keyframes: generateTimestamps(0).map((timestamp) =>
      generateFixtureKeyframe("disaster-tracking", timestamp.toString()),
    ),
    messages: [],
  },
};

export const ClimateMessages: Story = {
  args: {
    keyframes: generateTimestamps(30).map((timestamp) =>
      generateFixtureKeyframe("climate-monitoring", timestamp.toString()),
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
