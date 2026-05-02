"use client";

import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

type ProvidersProps = {
  children: ReactNode;
};

const ThemeProviderComponent =
  ThemeProvider as ComponentType<PropsWithChildren<ThemeProviderProps>>;

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProviderComponent
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProviderComponent>
  );
}
