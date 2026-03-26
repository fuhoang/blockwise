import { render, screen } from "@testing-library/react";

import LearnModulePage from "@/app/(dashboard)/learn/module/[slug]/page";

const notFound = vi.fn(() => {
  throw new Error("notFound");
});
const hasProAccessForCurrentUser = vi.fn();

vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));

vi.mock("@/lib/account-status", () => ({
  hasProAccessForCurrentUser: () => hasProAccessForCurrentUser(),
}));

vi.mock("@/components/learn/ModuleOverview", () => ({
  default: ({
    module,
  }: {
    module: { title: string; lessons: { title: string }[] };
  }) => (
    <div data-testid="module-overview">
      <h1>{module.title}</h1>
      <p>{module.lessons.length} lessons</p>
    </div>
  ),
}));

vi.mock("@/components/billing/ProFeatureGate", () => ({
  ProFeatureGate: ({ title }: { title: string }) => (
    <div data-testid="pro-feature-gate">{title}</div>
  ),
}));

describe("learn module page route", () => {
  beforeEach(() => {
    notFound.mockClear();
    hasProAccessForCurrentUser.mockReset();
    hasProAccessForCurrentUser.mockResolvedValue(false);
  });

  it("renders the module overview for a valid module slug", async () => {
    const page = await LearnModulePage({
      params: Promise.resolve({ slug: "foundations" }),
    });

    render(page);

    expect(screen.getByTestId("module-overview")).toBeInTheDocument();
    expect(screen.getByText("Foundations")).toBeInTheDocument();
    expect(screen.getByText("5 lessons")).toBeInTheDocument();
  });

  it("renders the pro gate for premium modules when the user is free", async () => {
    const page = await LearnModulePage({
      params: Promise.resolve({ slug: "advanced-basics" }),
    });

    render(page);

    expect(screen.getByTestId("pro-feature-gate")).toHaveTextContent(
      "Advanced Basics is part of Pro",
    );
  });

  it("calls notFound for an unknown module slug", async () => {
    await expect(
      LearnModulePage({
        params: Promise.resolve({ slug: "missing-module" }),
      }),
    ).rejects.toThrow("notFound");
  });
});
