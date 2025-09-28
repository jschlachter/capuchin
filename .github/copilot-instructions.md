# Copilot Instructions for AI Coding Agents

## Project Overview

- This is a Next.js app using the `/src/app` directory structure, bootstrapped with `create-next-app`.
- UI components are organized under `src/components/ui/` and `src/app/components/`.
- Shared hooks and utilities are in `src/hooks/` and `src/lib/`.
- Static assets (SVGs, icons) are in `public/`.
- Tailwind CSS is used for styling, with global styles in `src/app/globals.css`.

## Styling

- Tailwind CSS with consistent color palette
- Responsive design patterns
- Dark mode support
- Follow container queries best practices
- Maintain semantic HTML structure

## Architecture & Patterns

- The main layout is defined in `src/app/layout.tsx` and global styles in `src/app/globals.css`.
- Pages use the Next.js App Router (`src/app/page.tsx`).
- Sidebar and other app-level components are in `src/app/components/`.
- UI primitives (e.g., `button.tsx`, `input.tsx`, `sheet.tsx`) follow a composable, prop-driven pattern.
- TypeScript is used throughout; prefer `import type { ... }` for type-only imports.
- Use functional components and hooks; avoid class components.

## Developer Workflows

- Start dev server: `pnpm dev` (also supports `npm`, `yarn`, or `bun`).
- No custom build/test scripts found; use Next.js defaults (`next build`, `next test` if tests are added).
- Hot reload is enabled by default.

## Conventions & Practices

- Use the `src/app/components/Providers.tsx` for context providers.
- Keep business logic in hooks (`src/hooks/`) and utilities (`src/lib/utils.ts`).
- UI components should be stateless and reusable.
- Use SVGs from `public/` for icons and illustrations.
- Follow Next.js file-based routing and conventions.
- Use modern CSS (via `globals.css` and component styles).

## Integration Points

- No external API/service integrations detected in the codebase.
- Font optimization via `next/font` and Geist font.
- Deployment is intended for Vercel; see Next.js deployment docs.

## Examples

- To add a new UI component: place in `src/components/ui/`, export as default, and import where needed.
- To add a new page: create a file in `src/app/` (e.g., `src/app/about/page.tsx`).
- To use a hook: import from `src/hooks/` and use in a functional component.

## Key Files & Directories

- `src/app/layout.tsx` — App layout
- `src/app/page.tsx` — Main page
- `src/app/components/` — App-level components
- `src/components/ui/` — UI primitives
- `src/hooks/` — Custom hooks
- `src/lib/utils.ts` — Utility functions
- `public/` — Static assets

---

If any conventions or workflows are unclear or missing, please provide feedback to improve these instructions.
