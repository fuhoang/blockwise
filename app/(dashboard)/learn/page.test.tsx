import { render, screen } from "@testing-library/react";

import LearnPage from "@/app/(dashboard)/learn/page";

const hasProAccessForCurrentUser = vi.fn();

vi.mock("@/components/learn/LearnOverview", () => ({
  LearnOverview: ({
    hasProAccess,
    modules,
    totalLessons,
  }: {
    hasProAccess: boolean;
    modules: { title: string }[];
    totalLessons: number;
  }) => (
    <div
      data-has-pro-access={String(hasProAccess)}
      data-total-lessons={totalLessons}
      data-testid="learn-overview"
    >
      {modules.map((module) => (
        <span key={module.title}>{module.title}</span>
      ))}
    </div>
  ),
}));

vi.mock("@/lib/account-status", () => ({
  hasProAccessForCurrentUser: () => hasProAccessForCurrentUser(),
}));

describe("learn page route", () => {
  beforeEach(() => {
    hasProAccessForCurrentUser.mockReset();
    hasProAccessForCurrentUser.mockResolvedValue(false);
  });

  it("renders the overview with curriculum data", async () => {
    const page = await LearnPage();

    render(page);

    expect(screen.getByTestId("learn-overview")).toHaveAttribute(
      "data-total-lessons",
      "45",
    );
    expect(screen.getByTestId("learn-overview")).toHaveAttribute(
      "data-has-pro-access",
      "false",
    );
    expect(screen.getByText("Foundations")).toBeInTheDocument();
    expect(screen.getByText("Mindset & Strategy")).toBeInTheDocument();
  });
});
