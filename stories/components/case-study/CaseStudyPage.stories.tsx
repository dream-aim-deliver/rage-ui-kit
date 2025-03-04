import type { Meta, StoryObj } from "@storybook/react";
import { generateTimestamps } from "../../utils.ts";
import {
  CaseStudyPage,
  TError,
} from "@/components/case-study/CaseStudyPage.tsx";
import { faker } from "@faker-js/faker";
import { TClimateData } from "@/components/case-study/table/ClimateDataTable.tsx";
import { TSentinelData } from "@/components/case-study/table/SentinelDataTable.tsx";
import { ChatPage } from "@/lib/components";
import { TSwissGridData } from "@/components/case-study/table/SwissGridDataTable.tsx";

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
    timestamp: (faker.date.anytime().getTime() / 1000).toString(),
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    CarbonMonoxideLevel: faker.lorem.word(),
    PredictedWeather: faker.lorem.sentence(),
    ActualWeather: faker.lorem.sentence(),
  };
};

const generateSentinelDataFixture = (): TSentinelData => {
  return {
    timestamp: (faker.date.anytime().getTime() / 1000).toString(),
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    CarbonMonoxideLevel: faker.lorem.word(),
  };
};

const generateSwissGridDataFixture = (): TSwissGridData => {
  return {
    confidence: faker.number.float(),
    timestamp: (faker.date.anytime().getTime() / 1000).toString(),
    model: faker.lorem.word() + "_" + faker.lorem.word(),
    prediction: "ON",
  };
};

const generateErrorFixture = (): TError => {
  return {
    errorName: faker.lorem.sentence(),
    errorMessage: faker.lorem.sentence(),
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

const generateFixtureKeyframeClimateSingleImageError = (timestamp: string) => {
  const length = 30;
  const baseFrame = {
    timestamp,
    images: [generateErrorFixture()],
    dataDescription: faker.lorem.sentence(),
  };

  return {
    ...baseFrame,
    data: Array.from({ length: length }, generateClimateDataFixture),
  };
};

const generateFixtureKeyframeSentinel = (timestamp: string) => {
  const length = 45;
  const baseFrame = {
    timestamp,
    images: [
      {
        relativePath: faker.lorem.sentence(),
        signedUrl: faker.image.url({ width: 640, height: 480 }),
        description:
          "dataset: SENTINEL2-L1C | coords_wgs84: (-156.708984, 20.955027, -156.299744, 20.759645) | details: A Sentinel-2 image highlighting areas of interest based on water, vegetation, and spectral thresholds in true color. Bands: B04, B03, B02, B08, B11, B12",
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
    data: Array.from({ length: length }, generateSentinelDataFixture),
  };
};

const generateFixtureKeyframeSwissGrid = (timestamp: string) => {
  const baseFrame = {
    timestamp,
    images: [
      {
        relativePath: faker.lorem.sentence(),
        signedUrl: faker.image.url({ width: 640, height: 480 }),
        description:
          "dataset: SENTINEL2-L1C | coords_wgs84: (-156.708984, 20.955027, -156.299744, 20.759645) | details: A Sentinel-2 image highlighting areas of interest based on water, vegetation, and spectral thresholds in true color. Bands: B04, B03, B02, B08, B11, B12",
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
    data: Array.from({ length: 45 }, generateSwissGridDataFixture),
  };
};

const generateFixtureKeyframeSwissGridRowErrors = (timestamp: string) => {
  const baseFrame = {
    timestamp,
    images: [
      {
        relativePath: faker.lorem.sentence(),
        signedUrl: faker.image.url({ width: 640, height: 480 }),
        description:
          "dataset: SENTINEL2-L1C | coords_wgs84: (-156.708984, 20.955027, -156.299744, 20.759645) | details: A Sentinel-2 image highlighting areas of interest based on water, vegetation, and spectral thresholds in true color. Bands: B04, B03, B02, B08, B11, B12",
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
    data: [
      ...Array.from({ length: 45 }, generateErrorFixture),
      ...Array.from({ length: 45 }, generateSwissGridDataFixture),
    ],
  };
};

const generateFixtureKeyframeSwissGridImageErrors = (timestamp: string) => {
  const baseFrame = {
    timestamp,
    images: [
      generateErrorFixture(),
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
    data: [...Array.from({ length: 45 }, generateSwissGridDataFixture)],
  };
};

export const ClimateMessages: Story = {
  args: {
    info: {
      caseStudy: "climate-monitoring",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeClimate(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: ["webcam", "satellite"],
    },
    sideComponent: (
      <ChatPage
        messages={[
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
        ]}
        className="border rounded-lg"
      />
    ),
  },
};

export const ClimateErrors: Story = {
  args: {
    info: {
      caseStudy: "climate-monitoring",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeClimate(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: ["webcam", "satellite", "error"],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};

export const ClimateSingleImageError: Story = {
  args: {
    info: {
      caseStudy: "climate-monitoring",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeClimateSingleImageError(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: [],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};

export const Sentinel: Story = {
  args: {
    info: {
      caseStudy: "sentinel-5p",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeSentinel(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: ["webcam", "satellite"],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};

export const NoImageKinds: Story = {
  args: {
    info: {
      caseStudy: "sentinel-5p",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeSentinel(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: [],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};

export const SwissGrid: Story = {
  args: {
    info: {
      caseStudy: "swissgrid",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeSwissGrid(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: [],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};

export const SwissGridRowErrors: Story = {
  args: {
    info: {
      caseStudy: "swissgrid",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeSwissGridRowErrors(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: [],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};

export const SwissGridImageErrors: Story = {
  args: {
    info: {
      caseStudy: "swissgrid",
      keyframes: generateTimestamps(30).map((timestamp) =>
        generateFixtureKeyframeSwissGridImageErrors(timestamp.toString()),
      ),
      expirationTime: faker.date.anytime().getTime(),
      imageKinds: ["satellite"],
    },
    sideComponent: <ChatPage messages={[]} className="border rounded-lg" />,
  },
};
