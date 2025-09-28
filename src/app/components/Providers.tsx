"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

const props: ThemeProviderProps = {
  attribute: "class",
  defaultTheme: "system",
  enableSystem: true,
  themes: ["light", "dark"],
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
