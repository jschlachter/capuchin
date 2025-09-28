"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";
import { ConvexClientProvider } from "./ConvexClientProvider";

const props: ThemeProviderProps = {
  attribute: "data-theme",
  defaultTheme: "system",
  enableSystem: true,
  themes: ["light", "dark"],
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </ConvexClientProvider>
  );
}
