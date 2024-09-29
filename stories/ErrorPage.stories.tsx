import type { Meta, StoryObj } from "@storybook/react";
import { ErrorPage } from "@/components/error-page/ErrorPage";

// Create a sample child component to pass into the error page
const sampleChild = (
  <div className="text-center">
    <p className="text-neutral-600 dark:text-white">
      It seems the page you're looking for doesn't exist.
    </p>
    <p className="text-neutral-600 dark:text-white">
      Please check the URL or return to the homepage.
    </p>
  </div>
);

const meta: Meta<typeof ErrorPage> = {
  title: "Components/Error/ErrorPage",
  component: ErrorPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorCode: 404,
    errorMessage: "Page not found",
    children: sampleChild,
  },
};

export const ServerError: Story = {
  args: {
    errorCode: 500,
    errorMessage: "Internal Server Error",
    children: (
      <div className="text-center">
        <p className="text-neutral-600 dark:text-neutral-800">
          Something went wrong. Please try again later.
        </p>
      </div>
    ),
  },
};
