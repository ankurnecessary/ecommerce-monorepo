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

This command will run the unit test cases in watch mode.

```bash
pnpm run coverage
```

This command will run the unit test cases once and generate a coverage report in the end. Good for CI.

```bash
pnpm run lighthouse
```

This command will generate the lighthouse report in CI.

```bash
pnpm run lighthouse:local
```

This command will generate the lighthouse report. A developer can run it locally at any time.

```bash
pnpm run validate-html
```

This command will validate the HTML.
