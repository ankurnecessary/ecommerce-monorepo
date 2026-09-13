# CELEB Store

CELEB Store is the customer-facing Next.js application in the ecommerce monorepo. It currently demonstrates a responsive storefront navigation experience, Clerk-powered authentication, shared design-system components, and a browser-focused quality workflow.

[View the deployed application](https://main.d7nwpvnublww4.amplifyapp.com/)

## Highlights

- Responsive desktop and mobile navigation with category and subcategory menus
- Clerk sign-up, sign-in, sign-out, user-avatar, and post-registration flows
- Light and dark themes powered by `next-themes`
- Shared UI components consumed from the `@repo/ui` workspace package
- Unit and integration tests running in Chromium with Vitest Browser Mode
- Playwright component tests against a dedicated Vite component gallery
- Static accessibility checks with `eslint-plugin-jsx-a11y`
- Type checking, linting, coverage, component tests, HTML validation, and Lighthouse checks
- Pull-request validation with GitHub Actions and deployment through AWS Amplify

## Technology

| Area                         | Technology                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------- |
| Framework                    | Next.js 15 App Router, React 19, TypeScript                                       |
| Styling                      | Tailwind CSS 4, shared shadcn-style UI components, `next-themes`                  |
| Authentication               | Clerk                                                                             |
| Icons                        | [Lucide React](https://lucide.dev/icons/)                                         |
| Unit and integration testing | Vitest Browser Mode, Testing Library, Chromium                                    |
| Component testing            | Playwright, Vite                                                                  |
| Accessibility                | `eslint-plugin-jsx-a11y`                                                          |
| Quality and delivery         | ESLint, Prettier, Lighthouse CI, W3C HTML validation, GitHub Actions, AWS Amplify |

## Application routes

| Route                     | Purpose                              |
| ------------------------- | ------------------------------------ |
| `/`                       | Storefront entry point               |
| `/category/[slug]`        | Dynamic category route               |
| `/sign-in/[[...sign-in]]` | Clerk sign-in flow                   |
| `/sign-up/[[...sign-up]]` | Clerk registration flow              |
| `/signup-success`         | Successful-registration confirmation |

## Local development

### Prerequisites

- Node.js 24 (the repository includes a root `.nvmrc`)
- pnpm, using the version declared in the root `package.json`
- Clerk development credentials

Install workspace dependencies from the repository root:

```bash
pnpm install
```

Create `apps/store/.env.local` and provide the Clerk values required by the application:

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/signup-success
```

Do not commit real credentials.

Start only the store workspace from the repository root:

```bash
pnpm --filter store dev
```

The application is available at <http://localhost:3000>.

## Testing and validation

Run commands from the repository root with the `store` workspace filter.

| Command                                       | Purpose                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `pnpm --filter store check-types`             | Generate Next.js route types and run TypeScript without emitting files      |
| `pnpm --filter store prettier`                | Format store source files                                                   |
| `pnpm --filter store lint`                    | Run ESLint                                                                  |
| `pnpm --filter store lint:strict`             | Run ESLint with zero warnings allowed                                       |
| `pnpm --filter store lint:fix`                | Apply safe ESLint fixes                                                     |
| `pnpm --filter store test:unit`               | Run the main Vitest project headlessly in Chromium                          |
| `pnpm --filter store test:unit:headed`        | Run the main Vitest project with a visible browser                          |
| `pnpm --filter store test:integration`        | Run the Vitest integration project headlessly in Chromium                   |
| `pnpm --filter store test:integration:headed` | Run the Vitest integration project with a visible browser                   |
| `pnpm --filter store test`                    | Run the unit and integration Vitest projects concurrently                   |
| `pnpm --filter store test:coverage`           | Run both Vitest projects and generate the combined Istanbul coverage report |
| `pnpm --filter store test:ct`                 | Run Playwright component tests                                              |
| `pnpm --filter store test:ct:headed`          | Run Playwright component tests in a visible browser                         |
| `pnpm --filter store test:ct:debug`           | Run Playwright component tests in debug mode                                |
| `pnpm --filter store validate-html`           | Validate application HTML                                                   |
| `pnpm --filter store build`                   | Create an optimized production build                                        |
| `pnpm --filter store build:analyze`           | Build and inspect the client and server bundles                             |
| `pnpm --filter store start`                   | Serve the most recent production build on port 3000                         |

Install the Chromium binary required by local browser tests after installing or updating Playwright:

```bash
pnpm --filter store exec playwright install chromium
```

The repository's pre-commit workflow selects checks based on the staged files. Run it manually with:

```bash
pnpm precommit:check
```

## Performance checks

Lighthouse CI evaluates the locally built application using three mobile-emulated runs:

```bash
pnpm --filter store lighthouse
```

Platform-specific local helpers are also available:

```bash
pnpm --filter store lighthouse:wsl
pnpm --filter store lighthouse:windows
```

## Project structure

```text
apps/store/
├── app/                 # App Router layouts and routes
├── components/          # Store-specific UI and layout components
├── __integration__/     # Vitest browser integration tests
├── playwright/
│   ├── gallery/         # Vite component-test gallery
│   └── tests/           # Playwright component tests
├── hooks/               # Store-specific React hooks
├── test/                # Shared test mocks and support code
├── playwright.config.ts
└── vitest.config.ts
```

Shared components and styling live in `packages/ui`; shared linting and TypeScript configuration live in `packages/eslint-config` and `packages/typescript-config`.

## Continuous integration and deployment

Pull requests targeting `main` run the store's lint, build, browser-test, component-test, HTML-validation, and Lighthouse workflows. See the [store CI workflow](../../.github/workflows/store-ci.yml).

The live application is deployed to AWS Amplify from the repository's `main` branch.

## Current scope

This application is under active development. The current work concentrates on the storefront shell, responsive navigation, authentication, accessibility, and engineering quality foundations; the product catalogue and transactional commerce experience are not presented here as completed features.
