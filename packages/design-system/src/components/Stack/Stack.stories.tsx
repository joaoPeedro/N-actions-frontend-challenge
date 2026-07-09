import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../Text/index";
import { Stack } from "./index";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Single layout primitive for vertical and horizontal flex composition.

**Use when:** composing layouts with consistent spacing between children (\`direction="vertical"\` or \`"horizontal"\`).

**Do not use when:** only a single margin between two elements is required.

**Accessibility:** use native \`role\` and semantic children where the layout conveys structure (e.g. navigation groups).`,
      },
    },
  },
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal"] },
    gap: { control: "select", options: ["none", "small", "medium", "large"] },
    align: {
      control: "select",
      options: ["stretch", "center", "start", "end", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "end", "center", "space-between"],
    },
    wrap: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Stack gap="medium">
      <Text variant="body-bold">Public Sales Calendar</Text>
      <Text variant="body" color="secondary">
        Browse active and upcoming auctions.
      </Text>
      <Text variant="caption" color="secondary">
        Updated daily
      </Text>
    </Stack>
  ),
};

export const Variants: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Stack gap="large">
      <Stack gap="small">
        <Text variant="caption" color="secondary">
          Vertical — gap small
        </Text>
        <Text variant="body">Item one</Text>
        <Text variant="body">Item two</Text>
      </Stack>
      <Stack direction="horizontal" justify="space-between" align="center" fullWidth>
        <Text variant="body">Horizontal row</Text>
        <Text variant="body-semibold" color="action">
          12 Lots
        </Text>
      </Stack>
      <Stack direction="horizontal" gap="large" wrap>
        <Text variant="caption">Tag A</Text>
        <Text variant="caption">Tag B</Text>
        <Text variant="caption">Tag C</Text>
      </Stack>
    </Stack>
  ),
};

export const Playground: Story = {
  args: {
    direction: "vertical",
    gap: "medium",
    align: "stretch",
    wrap: true,
    fullWidth: false,
    children: null,
  },
  render: (args) => (
    <Stack {...args}>
      <Text variant="body">First item</Text>
      <Text variant="body">Second item</Text>
      <Text variant="body">Third item</Text>
    </Stack>
  ),
};
