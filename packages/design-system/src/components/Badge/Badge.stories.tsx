import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./index";

const meta = {
  title: "Indicators/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Compact label for status, category, or metadata.

**Use when:** surfacing short categorical or status text (e.g. live/upcoming, sale type).

**Do not use when:** long descriptive text — use Text instead; or interactive actions — use Button.

**Accessibility:** always include readable text content; do not rely on colour alone to convey meaning.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["danger", "primary", "neutral"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "neutral",
    children: "Public",
  },
};

export const Variants: Story = {
  args: {
    children: "Badge",
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
      <Badge variant="danger">Live</Badge>
      <Badge variant="primary">Upcoming</Badge>
      <Badge variant="neutral">Public</Badge>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "neutral",
    children: "Badge label",
  },
};
