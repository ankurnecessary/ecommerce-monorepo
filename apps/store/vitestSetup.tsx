import * as matchers from '@testing-library/jest-dom/matchers';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';
import React from 'react';
import { mockUseHeaderContext } from '@/components/layout/Header/Header.context.test.mock';
import { cleanup } from '@testing-library/react';
import MatchMediaMock from 'vitest-matchmedia-mock';

expect.extend(matchers);

declare global {
  // eslint-disable-next-line no-var
  var matchMediaMock: MatchMediaMock;
}

beforeAll(() => {
  globalThis.ResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  globalThis.matchMediaMock = new MatchMediaMock();
});

vi.mock('next/font/google', () => ({
  Mulish: () => ({
    className: 'mock-mulish',
    variable: '--mock-mulish',
  }),
}));

vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const { href, children, ...rest } = props;
      return (
        <a href={href} {...rest}>
          {children}
        </a>
      );
    },
  };
});

vi.mock('@/components/layout/Header/Header.context', () => ({
  __esModule: true,
  useHeaderContext: vi.fn(() => mockUseHeaderContext({})),
  HeaderContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
  globalThis.matchMediaMock.clear();
});

afterAll(() => {
  globalThis.matchMediaMock.destroy();
});
