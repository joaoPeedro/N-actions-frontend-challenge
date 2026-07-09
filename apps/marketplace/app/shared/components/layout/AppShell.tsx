import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
