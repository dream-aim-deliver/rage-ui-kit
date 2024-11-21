import type { Meta, StoryObj } from "@storybook/react";
import { generateTimestamps } from "../../utils.ts";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage.tsx";
import { faker } from "@faker-js/faker";
import { TClimateData } from "@/components/case-study/table/ClimateDataTable.tsx";

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

const generateClimateDataFixture = (): TClimateData => {
  return {
    id: faker.string.uuid(),
    location: faker.location.city(),
    temperature: faker.number.int({ min: -100, max: 100 }),
    humidity: faker.number.int({ min: 0, max: 100 }),
  };
};

const generateFixtureKeyframeClimate = (timestamp: string) => {
  const length = 30;
  const baseFrame = {
    timestamp,
    images: [
      {
        relativePath: faker.lorem.sentence(),
        signedUrl: faker.image.url({ width: 640, height: 480 }),
        description: faker.lorem.paragraph(50),
        kind: "webcam",
      },
      {
        relativePath: faker.lorem.sentence(),
        signedUrl: faker.image.url({ width: 640, height: 480 }),
        description: faker.lorem.sentence(),
        kind: "satellite",
      },
    ],
    dataDescription: faker.lorem.sentence(),
  };

  return {
    ...baseFrame,
    data: Array.from({ length: length }, generateClimateDataFixture),
  };
};

export const ClimateMessages: Story = {
  args: {
    info: {
      caseStudy: "climate-monitoring",
      keyFrames: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeClimate(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: ["webcam", "satellite"],
    },
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

export const ClimateErrors: Story = {
  args: {
    info: {
      caseStudy: "climate-monitoring",
      keyFrames: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeClimate(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: ["webcam", "satellite", "error"],
    },
    messages: [],
  },
};