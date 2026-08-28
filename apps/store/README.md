# Ecommerce

Project link - [Click to see the project.](https://main.d7nwpvnublww4.amplifyapp.com/)

## Stack

1. Next.js 15.
2. Vitest for testing.
3. TailwindCSS

## Font Icons

You can search for the font icons that you want to use in the project at [lucid-react](https://lucide.dev/icons/)

## AWS

Deployed this application on AWS Amplify with the help of CI. You can checkout the github workflow files @ <https://github.com/ankurnecessary/ecommerce/blob/main/.github/workflows/main.yml>

## Commands

```bash
pnpm run dev
```

This will run the project in development mode.

```bash
pnpm run build
```

This command will prepare a build of the project.

```bash
pnpm run build:analyze
```

This command will build the project and analyze its bundle.

```bash
pnpm run start
```

This will run the project from the most recent build in .next folder.

```bash
pnpm run lint
```

This command will lint the code of whole project.

```bash
pnpm run lint:fix
```

This command will fix all the lint bugs which are auto-fixable.

```bash
pnpm run lint:strict
```

This command will strictly run the lint only on the files that we are actullay coding.

```bash
pnpm run prettier
```

This command will format the code.

```bash
pnpm run test
```

This command will run both the unit and integration test projects.

```bash
pnpm run test:unit
```

This command will run the main unit test project.

```bash
pnpm run test:integration
```

This command will run the integration test project.

```bash
pnpm run test:coverage
```

This command will run the main unit test project once and generate a coverage report.

```bash
pnpm run lighthouse
```

This command will generate the lighthouse report in CI.

```bash
pnpm run lighthouse:windows
```

This command will run the local Lighthouse workflow for Windows.

```bash
pnpm run lighthouse:wsl
```

This command will run the local Lighthouse workflow for WSL.

```bash
pnpm run validate-html
```

This command will validate the HTML.

```bash
pnpm run check-types
```

This command will generate Next.js route types and run TypeScript without emitting files.
