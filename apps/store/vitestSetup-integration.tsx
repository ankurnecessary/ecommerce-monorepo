import * as matchers from '@testing-library/jest-dom/matchers';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';
import React from 'react';
// import { mockUseHeaderContext } from '@/components/layout/Header/Header.context.test.mock';
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

beforeAll(() => {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
});

vi.mock("@clerk/nextjs", () => ({
  Show: ({
    when,
    children,
  }: {
    when: "signed-in" | "signed-out";
    children: React.ReactNode;
  }) => (when === "signed-out" ? <>{children}</> : null),

  useClerk: () => ({
    signOut: vi.fn(),
  }),

  useUser: () => ({
    isLoaded: true,
    isSignedIn: false,
    user: null,
  }),
}));

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
