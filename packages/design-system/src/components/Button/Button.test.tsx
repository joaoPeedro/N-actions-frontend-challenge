import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./index";

describe("Button", () => {
  it("renders the button with the provided accessible name", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders as a button element by default", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" }).tagName).toBe("BUTTON");
  });

  it("preserves the native button type attribute", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");
  });

  it("prevents interaction when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });

    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("prevents interaction and exposes loading state when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button loading onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });

    await user.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("exposes an accessible name for icon-only buttons", () => {
    render(
      <Button iconOnly aria-label="Add to favourites">
        <span aria-hidden="true">★</span>
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Add to favourites" })).toBeInTheDocument();
  });

  it("calls the click handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
