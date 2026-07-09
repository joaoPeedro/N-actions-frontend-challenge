import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./index";

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Semantic typography primitive backed by design tokens.

**Use when:** applying consistent text styles and semantic colors across the product.

**Do not use when:** a raw HTML element with no token consistency is sufficient.

**Accessibility:** prefer semantic tags via the \`as\` prop (\`p\`, \`h1\`, \`label\`, etc.) instead of styling a \`span\` to look like a heading.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "body",
        "body-semibold",
        "body-bold",
        "heading",
        "h1",
        "h2",
        "h3",
        "subtle",
        "caption",
        "overline",
        "price",
        "display-price",
      ],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "subtle", "on-primary", "danger", "action", "success"],
    },
    as: {
      control: "select",
      options: ["span", "p", "h1", "h2", "h3", "label"],
    },
    transform: {
      control: "select",
      options: [undefined, "capitalize"],
    },
    inheritColor: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "body",
    color: "primary",
    children: "Browse active and upcoming auctions and sales events.",
  },
};

export const Variants: Story = {
  args: {
    children: "Text",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Text variant="h1" as="h1">
        Heading 1
      </Text>
      <Text variant="h2" as="h2">
        Heading 2
      </Text>
      <Text variant="body">Body text</Text>
      <Text variant="caption" color="secondary">
        Caption secondary
      </Text>
      <Text variant="overline" color="secondary">
        Overline label
      </Text>
      <Text variant="price" color="action">
        £12,500
      </Text>
      <Text variant="display-price" color="action">
        £12,500
      </Text>
      <Text variant="body" color="danger">
        Error message
      </Text>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "body",
    color: "primary",
    as: "p",
    children: "Edit props in the Controls panel to explore the Text API.",
  },
};
