# Ecommerce

Project link - [Click to see the project.](https://main.d26n91xt1o9he3.amplifyapp.com/)

Storybook - [Click here to see components and their stories in Storybook.](https://21-storybook-integration--684b2dd0e00196c6b3028277.chromatic.com/)

Chromatic library - [Click here to see the Chromatic library](https://www.chromatic.com/library?appId=684b2dd0e00196c6b3028277&branch=21-storybook-integration)

## Stack

1. Next.js 15.
2. Vitest for testing.
3. TailwindCSS
4. Storybook

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

```bash
pnpm run storybook
```

You can run storybook locally using this command.

```bash
pnpm run build-storybook
```

With this command you can check locally whether the storybook build is made without any errors or not.

```bash
pnpm chromatic
```

This is CI command to generate a storybook build and share it with chromatic for the review of the changes in the components and their stories.
