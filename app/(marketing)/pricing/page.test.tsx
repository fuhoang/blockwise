import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import PricingPage from "@/app/(marketing)/pricing/page";

const getBillingSnapshotForCurrentUser = vi.fn();
const hasProAccess = vi.fn();

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/billing", () => ({
  getBillingSnapshotForCurrentUser: () => getBillingSnapshotForCurrentUser(),
  hasProAccess: (snapshot: unknown) => hasProAccess(snapshot),
}));

describe("pricing page", () => {
  beforeEach(() => {
    getBillingSnapshotForCurrentUser.mockReset();
    hasProAccess.mockReset();
  });

  it("disables the monthly CTA when the user is already on Pro monthly", async () => {
    const snapshot = {
      configured: true,
      customerId: "cus_123",
      purchaseEvents: [],
      subscription: {
        plan_slug: "pro_monthly",
      },
    };

    getBillingSnapshotForCurrentUser.mockResolvedValue(snapshot);
    hasProAccess.mockReturnValue(true);

    const page = await PricingPage();

    render(page);

    expect(screen.getByText("Current subscription")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Upgrade to yearly" })).toHaveAttribute(
      "href",
      "/purchases?plan=pro_yearly",
    );
  });

  it("shows a downgrade CTA for monthly when the user is on Pro yearly", async () => {
    const snapshot = {
      configured: true,
      customerId: "cus_123",
      purchaseEvents: [],
      subscription: {
        plan_slug: "pro_yearly",
      },
    };

    getBillingSnapshotForCurrentUser.mockResolvedValue(snapshot);
    hasProAccess.mockReturnValue(true);

    const page = await PricingPage();

    render(page);

    expect(
      screen.getByRole("link", { name: "Downgrade to monthly" }),
    ).toHaveAttribute("href", "/purchases?plan=pro_monthly");
    expect(screen.getByText("Current subscription")).toBeInTheDocument();
  });

  it("keeps paid CTAs active when the user is not on a matching subscription", async () => {
    getBillingSnapshotForCurrentUser.mockResolvedValue({
      configured: true,
      customerId: null,
      purchaseEvents: [],
      subscription: null,
    });
    hasProAccess.mockReturnValue(false);

    const page = await PricingPage();

    render(page);

    expect(screen.getByRole("link", { name: "Upgrade to Pro" })).toHaveAttribute(
      "href",
      "/purchases?plan=pro_monthly",
    );
    expect(screen.getByRole("link", { name: "Choose yearly" })).toHaveAttribute(
      "href",
      "/purchases?plan=pro_yearly",
    );
  });
});
