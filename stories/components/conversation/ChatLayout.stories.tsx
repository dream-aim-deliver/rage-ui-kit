import { Meta, StoryObj } from "@storybook/react";
import { ChatPage, ROLEViewModel } from "@/components/conversation/chat-layout";

const meta = {
  title: "Pages/Chat",
  component: ChatPage,
} satisfies Meta<typeof ChatPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const mermaidData = `
To create a flow diagram with mermaid syntax, you simply need to start your code block with the mermaid keyword and then start coding the diagram using the mermaid syntax. For example, the following code will produce a sequence diagram:
### Mermaid Flow Diagram: Automatically Importing Tasks

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant TC as Task Collector Service
    participant PM as Parameter Matching Service
    participant UN as User Notification Service
    participant TM as Task Management Service

    U->>+TC: Connects to email, calendar, IM apps
    TC->>+PM: Detects potential tasks
    PM->>+TM: Categorizes tasks with parameters
    TM-->>-U: Saves imported tasks
    PM->>UN: Inconclusive parameter inference
    UN-->>U: Notifies for user input on task details
    U->>TM: Reviews and edits tasks
\`\`\`

### Mermaid Flow Diagram: Manually Adding Tasks

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant UI as User Interface
    participant TM as Task Management Service

    U->>+UI: Accesses task addition form
    UI->>+TM: Submits new task details
    TM-->>-U: Confirms task added
    U->>TM: Optionally assigns task to slot
\`\`\`
`;

const markdownWithCode = `
### Some python code
\`\`\`python
def hello():
    print("Hello World")
\`\`\`

### Typescript code
\`\`\`typescript
function hello() {
    console.log("Hello World")
}
\`\`\`
`;

export const ChatCapabilities: Story = {
  args: {
    title: "Conversation/1",
    messages: [
      {
        role: ROLEViewModel.USER,
        content: "Hello, can you render formatted text?",
        timestamp: 1,
        type: "text",
        isLoading: false,
      },
      {
        role: ROLEViewModel.AGENT,
        content: "Hello, yes. \n Let me give you an example:",
        timestamp: 2,
        type: "text",
        isLoading: false,
      },
      {
        role: ROLEViewModel.AGENT,
        timestamp: 3,
        type: "text",
        content: markdownWithCode,
      },
      {
        role: ROLEViewModel.USER,
        content: "Well done!",
        timestamp: 4,
        type: "text",
        isLoading: false,
      },
      {
        role: ROLEViewModel.AGENT,
        content: mermaidData,
        timestamp: 5,
        type: "text",
        isLoading: false,
      },
    ],
    onSendMessage: (message) => {
      console.log("Message sent:", message);
    },
  },
};
