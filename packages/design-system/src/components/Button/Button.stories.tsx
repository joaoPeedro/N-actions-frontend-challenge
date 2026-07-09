import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./index";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Action button for in-page interactions.

**Use when:** triggering actions such as submit, toggle, or open.

**Do not use when:** navigating to another route or URL — use a link component instead.

**Accessibility:** \`iconOnly\` buttons require an \`aria-label\`. Loading state sets \`aria-busy\`.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "primary",
    children: "Apply Filters",
  },
};

export const Variants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" loading>
        Loading
      </Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" icon={<PlusIcon />}>
        With icon
      </Button>
      <Button variant="secondary" iconOnly aria-label="Add item">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "primary",
    loading: false,
    disabled: false,
    children: "Button label",
  },
};
