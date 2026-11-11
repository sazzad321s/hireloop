<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop

Single-package Next.js 16.4.4 App Router app (React 19, Tailwind v4, shadcn/ui). Use `npm` (package-lock.json). Path alias `@/*` maps to the repo root.

## Verify changes

Run `npm run lint` then `npm run typecheck`; `npm run build` is the full check (it also type-checks and loads `.env`). There is no test runner, no test script, and no CI.

- `npm run format` rewrites only `**/*.{ts,tsx}` — not md/json/css. Several existing files are not Prettier-clean, so a repo-wide format creates unrelated diffs (`.prettierrc`: no semicolons, double quotes, Tailwind class sorting).
- `npm run lint` reports warnings without failing (exit 0); read the output, don't trust the exit code alone.

## Stack quirks

- shadcn style is `base-nova`: UI primitives come from `@base-ui/react`, **not** Radix. Add components with `npx shadcn@latest add <name>`.
- `cn` is the standalone `cn` package; `lib/utils.ts` re-exports it. Both `@/lib/utils` and `cn` are imported in existing code.
- Tailwind v4 is CSS-first: there is no `tailwind.config`; theme tokens live in `app/globals.css` (`@theme inline`).

## Auth (better-auth, in progress)

- Server config `lib/auth.ts` (email/password + GitHub social), client `lib/auth-client.ts`, catch-all handler `app/api/auth/[...all]/route.ts` — keep the `[...all]` segment.
- `.env` is gitignored (`.env*`) and auto-loaded. It has `BETTER_AUTH_SECRET`/`BETTER_AUTH_URL`; GitHub sign-in also needs `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`, which are not set yet (`next build` warns about it).
- `mongodb` and `@better-auth/mongo-adapter` are installed but not wired into `betterAuth()` — there is no database layer yet.

## Notes

- `CLAUDE.md` just imports `@AGENTS.md`; keep guidance in this file.
- Images live in `app/images/` (`logo.png`, `globe.png`, `cta-bg.png`), not `public/`.
