import { expect, test } from "@playwright/test";

const SALE_ID = "fleet-auction-july-2026";
const SALE_TITLE = "July Fleet Auction";
const VEHICLE_ID = "ford-fiesta-001";
const VEHICLE_TITLE = "Ford Fiesta 1.0 EcoBoost Zetec";

test("public sale browsing journey: sales → catalogue → vehicle details → back", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Public Sales Calendar" }),
  ).toBeVisible();
  const saleLink = page.getByRole("link", {
    name: new RegExp(`View catalog for ${SALE_TITLE}`, "i"),
  });
  await expect(saleLink).toBeVisible();

  await saleLink.click();
  await expect(page).toHaveURL(new RegExp(`/sales/${SALE_ID}$`));
  await expect(page.getByRole("heading", { name: SALE_TITLE })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Vehicle Lots Catalog" }),
  ).toBeVisible();

  const vehicleLink = page.getByRole("link", {
    name: /View details for 2016 Ford Fiesta/i,
  });
  await expect(vehicleLink).toBeVisible();
  await vehicleLink.click();
  await expect(page).toHaveURL(new RegExp(`/vehicles/${VEHICLE_ID}$`));
  await expect(
    page.getByRole("heading", { name: VEHICLE_TITLE }),
  ).toBeVisible();
  await expect(page.getByText(/£800/)).toBeVisible();

  await page
    .getByRole("link", { name: new RegExp(`Back to ${SALE_TITLE}`, "i") })
    .click();
  await expect(page).toHaveURL(new RegExp(`/sales/${SALE_ID}$`));
  await expect(page.getByRole("heading", { name: SALE_TITLE })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Vehicle Lots Catalog" }),
  ).toBeVisible();
});
