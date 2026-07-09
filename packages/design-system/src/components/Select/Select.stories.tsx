import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SELECT_EMPTY_VALUE, Select } from "./index";

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Single-choice dropdown for forms and filters. Composes Radix Select internally — keyboard navigation and ARIA are handled by the primitive.

**Use when:** choosing one value from a predefined list (filters, form fields).

**Do not use when:** free text, multi-select, or searchable combobox behaviour is required.

**Accessibility:** provide a \`label\` for association; use \`SELECT_EMPTY_VALUE\` for "all / clear" options in GET forms. Icon-only triggers are not supported.`,
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const filterItems = (
  <>
    <Select.Item value={SELECT_EMPTY_VALUE}>All Statuses</Select.Item>
    <Select.Item value="live">Live / Current</Select.Item>
    <Select.Item value="upcoming">Upcoming</Select.Item>
  </>
);

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Select
      label="Status"
      name="state"
      placeholder="All Statuses"
      defaultValue={SELECT_EMPTY_VALUE}
      emptyValue={SELECT_EMPTY_VALUE}
    >
      {filterItems}
    </Select>
  ),
};

export const Variants: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "280px" }}>
      <Select label="Enabled" placeholder="Choose…" defaultValue="live">
        {filterItems}
      </Select>
      <Select label="Disabled" placeholder="Choose…" disabled defaultValue="live">
        {filterItems}
      </Select>
      <Select label="No selection" placeholder="All Statuses">
        {filterItems}
      </Select>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: "Status",
    placeholder: "All Statuses",
    disabled: false,
    children: null,
  },
  render: function PlaygroundSelect(args) {
    const [value, setValue] = useState<string | undefined>(SELECT_EMPTY_VALUE);

    return (
      <div style={{ maxWidth: "280px" }}>
        <Select
          {...args}
          value={value}
          emptyValue={SELECT_EMPTY_VALUE}
          onValueChange={setValue}
        >
          {filterItems}
        </Select>
      </div>
    );
  },
};
