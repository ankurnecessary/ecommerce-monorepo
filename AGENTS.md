# Repository instructions

## Purpose and maturity

This pnpm/Turborepo repository is building an ecommerce system. It currently contains a responsive Next.js storefront and an Express API with user authentication and PostgreSQL persistence. It is early-stage: the store uses static navigation data, does not yet call the API, and core commerce domains such as catalog, cart, inventory, orders, and payments are not implemented.

## Repository map

- `apps/store` (`store`): Next.js 16/React 19 App Router storefront. Owns pages, layout components, responsive header/navigation state, themes, browser tests, HTML validation, and Lighthouse checks. It may consume shared packages.
- `apps/api` (`api`): Express 5 REST API, exposed under `/api/v1`, with conventional server and AWS Lambda entry points. Owns auth/user modules, HTTP validation/controllers, application use cases, Prisma adapters, OpenAPI annotations, and API tests.
- `packages/ui` (`@repo/ui`): shared React/Tailwind 4 UI primitives, design tokens, global styles, and the `cn` utility. It must not import from an application.
- `packages/eslint-config` (`@repo/eslint-config`): reusable base, Next.js, and internal React ESLint configurations.
- `packages/typescript-config` (`@repo/typescript-config`): reusable strict base, Next.js, and React-library TypeScript configurations.

Applications may depend on packages; packages must not depend on applications. Do not introduce direct dependencies between `apps/store` and `apps/api`; integrate them through a documented HTTP contract.

## API layer boundaries

Within an API feature, dependencies point inward:

1. Routes and controllers depend on application use cases and HTTP validation.
2. Application use cases depend on domain objects and port/repository interfaces.
3. Domain objects and port interfaces must not depend on Express, Prisma, JWT, bcrypt, or other infrastructure.
4. Infrastructure adapters implement ports and may depend on Prisma or external libraries.
5. Controllers or a composition root wire concrete adapters into use cases; use cases must not instantiate infrastructure.

Keep cross-feature contracts in the feature that owns the concept. Do not make a domain interface depend on an application-specific DTO from another feature. Existing code is not perfect precedent: inspect dependency direction before extending it.

## Commands

Run commands from the repository root unless a command explicitly changes directory. Use the pinned pnpm version from `packageManager` and the Node version in `.nvmrc`.

### Monorepo

- Install: `pnpm install`
- Reproducible/CI install: `pnpm install --frozen-lockfile`
- Develop all workspaces with a `dev` task: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Type-check Turbo `check-types` tasks: `pnpm check-types`
- Run configured coverage tasks: `pnpm test:coverage`
- Format supported TypeScript, TSX, Markdown, and JSON: `pnpm format`
- Run the staged-file pre-commit selection: `pnpm precommit:check`

`pnpm dev` includes `api:dev`, which is Docker-based, requires the API environment/Docker setup, and rewrites the `NODE_VERSION` line in `apps/api/.env`. Prefer workspace development commands when only one application is in scope. Root formatting is write-mode; inspect its diff.

### Store workspace

- Develop: `pnpm --filter store dev`
- Build/start: `pnpm --filter store build` / `pnpm --filter store start`
- Lint: `pnpm --filter store lint`
- Strict lint: `pnpm --filter store lint:strict`
- Type-check: `pnpm --filter store check-types`
- Unit tests: `pnpm --filter store test:unit`
- Integration tests: `pnpm --filter store test:integration`
- Both test suites: `pnpm --filter store test`
- Unit coverage used by CI: `pnpm --filter store test:coverage`
- HTML validation requires a built, running store: build, start it, wait for `http://localhost:3000`, then run `pnpm --filter store validate-html`
- Lighthouse against a running production build: `pnpm --filter store lighthouse`
- Store formatter: `pnpm --filter store prettier`

Store Vitest projects use Playwright Chromium. Ensure the browser/runtime is available; CI uses a Playwright container.

### API workspace

- Non-Docker API plus OpenAPI watch: `pnpm --filter api dev-api`
- Non-Docker server only: `pnpm --filter api dev:server`
- Docker debug stack: `pnpm --filter api dev`
- Build/start: `pnpm --filter api build` / `pnpm --filter api start`
- Lint: `pnpm --filter api lint`
- Type-check: `pnpm --filter api check-types`
- One test run: `pnpm --filter api test:run`
- Coverage: `pnpm --filter api test:coverage`
- Generate Prisma client: `pnpm --filter api exec prisma generate`
- Create/apply a development migration: `pnpm --filter api exec prisma migrate dev --name <descriptive_name>`
- Apply committed migrations: `pnpm --filter api exec prisma migrate deploy`
- Seed: `pnpm --filter api exec prisma db seed`
- Destructive local reset and seed: `pnpm --filter api reset:db`
- Generate OpenAPI: `pnpm --filter api openapi`
- Validate OpenAPI for CI: `pnpm --filter api validate-openapi`
- Validate without the configured server URL: `pnpm --filter api validate-openapi:local`
- Build static API docs: `pnpm --filter api static-api-doc`

API runtime, Prisma, seed, and OpenAPI commands require the applicable environment variables. Never print or commit secret values. `reset:db` deletes data and requires explicit confirmation that the target is a disposable local database.

### Shared packages

- UI lint: `pnpm --filter @repo/ui lint`
- UI type-check: `pnpm --filter @repo/ui typecheck`
- UI format: `pnpm --filter @repo/ui format`

`@repo/ui` has `typecheck`, not `check-types`, so root `pnpm check-types` does not replace the explicit UI type-check. The config-only packages have no build, lint, or type-check scripts; validate consumers after changing them.

## Files not to edit manually

- Dependencies and outputs: `node_modules/`, `.next/`, `out/`, `build/`, `dist/`, `coverage/`, `.turbo/`, `.lighthouseci/`, `storybook-static/`, and `*.tsbuildinfo`.
- Generated Prisma client: `apps/api/src/generated/`; change the schema and run Prisma generation.
- Generated API artifacts: `apps/api/openapi.yaml` and `apps/api/docs/`; change annotations/configuration and regenerate.
- Next-generated types: `apps/store/next-env.d.ts` and `.next/types/`.
- Local secrets and state: `.env*`, `*.pem`, cookies, logs, database backups, and local tool caches. Do not overwrite a developer's local environment file.
- `pnpm-lock.yaml`: do not hand-edit; update it only through pnpm when an authorized dependency change requires it.
- Existing `apps/api/prisma/migrations/**`: never rewrite, rename, reorder, or delete migration history that may have been applied. Create a new migration for later changes.

## Database and migration safety

- Inspect `apps/api/prisma/schema.prisma`, `apps/api/prisma.config.ts`, current migrations, and affected repositories before changing persistence.
- Confirm the target database and environment before any migration, seed, restore, or reset. Never run destructive database commands against shared or production data.
- Use `prisma migrate dev --name ...` only for development migration creation; use `prisma migrate deploy` to apply committed migrations outside development.
- Review generated SQL before applying or committing it. Preserve existing data and provide explicit data migration/backfill SQL when a schema change requires it.
- Do not use `migrate reset` to solve migration-history failures. Diagnose drift/failure and add a forward-safe migration. Ask before deleting any migration record or folder.
- Keep schema, migration, generated client, repository mapping, seed behavior, tests, and documentation consistent.
- Seeding requires `ADMIN_PASSWORD`; production also requires `ADMIN_EMAIL`. Treat both as secrets.

## Authentication and security

Changes under `apps/api/src/modules/auth`, `apps/api/src/shared/middleware`, environment configuration, CORS, cookies, user roles, password storage, token storage, or auth OpenAPI definitions are security-sensitive.

- Preserve bcrypt password hashing, separate access/refresh secrets, JWT algorithm restrictions, payload validation, HTTP-only cookie behavior, refresh-token rotation, and generic credential errors unless a reviewed design intentionally changes them.
- Never log passwords, tokens, cookies, database URLs, secrets, or sensitive headers; do not place real credentials in tests, docs, fixtures, or commits.
- Review cookie `secure`, `sameSite`, lifetime, CORS credentials/origins, CSRF implications, logout invalidation, and browser versus header-token behavior together.
- Authentication is not authorization. The schema has `dashboardUser` and `storeUser`, but no general role enforcement is wired to current routes. Do not claim a route is protected merely because `requireAuth` exists; verify route middleware and use-case authorization.
- Add tests for successful flows, invalid/expired/tampered tokens, validation failures, cookie/header behavior, revocation/rotation, and permission boundaries affected by a change.

## Completion and validation

Run the narrowest relevant checks, expanding when shared code or configuration changes:

- Store change: lint, type-check, and the affected unit/integration tests; build for routing/config/build-sensitive work. Run HTML validation or Lighthouse when markup, accessibility, or performance behavior changes.
- API change: lint, type-check, affected tests (normally `test:run` or coverage), and build. Regenerate and validate OpenAPI when routes, payloads, responses, auth, or annotations change.
- Prisma change: generate the client, review/create the migration, run relevant repository/use-case tests, and build/type-check the API. Database-backed verification requires a confirmed disposable database.
- `packages/ui` change: UI lint and `typecheck`, affected store tests, and store build/type-check.
- ESLint/TypeScript config change: validate every consuming workspace explicitly.
- Cross-workspace change: run the applicable root checks plus workspace checks omitted by Turbo, especially `pnpm --filter @repo/ui typecheck`.

Do not consider a task complete with failing checks. Report every command run, its result, and any check not run with the reason. Do not “fix” unrelated pre-existing failures without authorization.

## Documentation maintenance

Update documentation in the same change whenever architecture, workspace responsibilities, dependency direction, commands, environment-variable names, database/migration behavior, API contracts, authentication behavior, deployment, or CI workflows change. Update this file when agent instructions or authoritative commands change. Verify documentation against source and manifests; do not propagate stale README claims. Document environment variable names and purpose, never values.

## Working instructions for AI agents

- Inspect the relevant source, tests, manifests, configuration, and current git diff before editing.
- Preserve user changes and make the smallest coherent change that fulfills the request.
- Avoid unrelated refactoring, dependency upgrades, formatting churn, generated-output edits, and speculative abstractions.
- State material assumptions and stop for direction when an assumption would broaden scope or risk data/security.
- Run relevant validation in proportion to the change and inspect the final diff.
- Clearly state what was changed, what was verified, and anything that could not be verified.
