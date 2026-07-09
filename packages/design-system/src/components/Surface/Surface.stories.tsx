import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../Text/index";
import { Surface } from "./index";

const meta = {
  title: "Surfaces/Surface",
  component: Surface,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Visual container for grouping related content.

**Use when:** content needs a distinct background, border, or elevation (cards, panels).

**Do not use when:** spacing alone is sufficient — use Stack instead.

**Accessibility:** set \`role\` when the surface represents a landmark region (e.g. \`role="status"\` for empty states).`,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["default", "card", "subtle"] },
    padding: { control: "select", options: ["none", "small", "medium", "large"] },
    radius: { control: "select", options: ["none", "small", "medium", "large"] },
    fullWidth: { control: "boolean" },
    maxWidth: { control: "select", options: [undefined, "medium"] },
  },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "card",
    padding: "medium",
    radius: "medium",
    children: (
      <>
        <Text variant="h3" as="h3">
          Sale Information
        </Text>
        <Text variant="body" color="secondary">
          Grouped content inside a card surface.
        </Text>
      </>
    ),
  },
};

export const Variants: Story = {
  args: {
    children: "Surface",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Surface variant="default" padding="medium" radius="medium">
        <Text variant="body">Default surface</Text>
      </Surface>
      <Surface variant="card" padding="medium" radius="medium">
        <Text variant="body">Card surface</Text>
      </Surface>
      <Surface variant="subtle" padding="medium" radius="medium">
        <Text variant="body">Subtle surface</Text>
      </Surface>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "card",
    padding: "medium",
    radius: "medium",
    fullWidth: false,
    children: "Surface content — adjust props in Controls.",
  },
  render: (args) => (
    <Surface {...args}>
      <Text variant="body">Surface content — adjust props in Controls.</Text>
    </Surface>
  ),
};
