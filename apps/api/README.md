# Node with typescript

This project gives a boiler plate code for a node project with typescript. It has following features enabled:

1. Development using Hot reloading via Docker.
2. Using Prisma ORM to handle database.
3. Development using Docker container for postgresql DB.
4. API Documentation via Swagger.
5. There are 2 main branches i.e. main and main-rest
   1. `main` - GraphQL specific
   2. `main-rest` - REST specific

## Documentation

1. [API Documentation](https://ankurnecessary.github.io/ecommerce-monorepo/)

## PNPM Scripts

1. `pnpm dev` - This is a way to run the code while developing the project without using docker. Even Dockerfile uses this command to run the project inside the container. It generates openAPI documentation and runs express.js server on the fly.
2. `pnpm dev:server` - It only runs the express.js server in development watch mode.
3. `pnpm dev:docker` - This command runs docker compoose file to spin up a development container. This will provide a URL for the APIs that we can use further while coding.
4. `pnpm dev:docker:debug` - This script will run the dev server in watchable debug mode.
5. `pnpm build` - This will just build a project and put the files in dist folder.
6. `pnpm start` - This will start the project using the build files. So before running this command we should have a build in place via command `pnpm build`.
7. `pnpm build:start` - This will make a build and then run the build.
8. `pnpm test` - This will fire up the test files and run the test cases, if present.
9. `prepare` - This will fire automatically when we will run the command `pnpm i`. It will fire after installing all the dependencies.
10. `pnpm lint` - This command will find any kind of linting issues. If we have.
11. `pnpm prod:create` - This command will create a new docker image, uploads new image to AWS ECR, create a new AWS Lambda function and update it with newly created docker image at AWS ECR.
12. `pnpm prod:update` - This command will update an existing docker image, uploads that image to AWS ECR and update existing AWS Lambda function with new image at AWS ECR.
13. `pnpm openapi` - This command will generate openapi.yaml.
14. `pnpm validate-openapi` - This command will validate the generated openapi.yaml.
15. `pnpm watch-openapi` - This command will watch for changes in files to determine new content of opneapi.yaml.
16. `pnpm static-api-doc` - This command will generate static API documentation using redocly at './docs' but this is used in CI / github workflow only.
17. `pnpm db:reset` - This command will help in resetting database. This means all data will be deleted. IMPORTANT: Use it mindfully and only in dev environment.

## Development

Start development server and other utilities using command `pnpm dev`. After that you can use following links to access respective utilities.

1. You can access APIs @ <http://localhost:5000/api/v1>.
2. You can access swagger API documentation @ <http://localhost:8080/>
3. You can access pgAdmin4 @ <http://localhost:8000/>. Username: `admin@local.com`, password: `admin123`.

### How to generate auth or refresh token?

`node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### How to connect to dev DB in pgAdmin?

This is a one time activity. You need to register dev DB with following details in pgAdmin.

Host: db
Port: 5432
Username: postgres
Password: postgres
Database: ecommerce

## How to debug?

1. Start development server in debug mode using command `pnpm dev:docker:debug`.
2. In VS Code, do ctrl + shift + p
3. Select "Debug: Select and start debugging".
4. Select "Attach to Docker: Node(9229)".
5. Now start debugging as usual. You can put breakpoints now.

## Prisma migration failure playbook

Use this when `prisma migrate dev` fails and Prisma suggests a reset.

1. Do not reset database. Because we can face the same issue while migrating to production.
2. Understand why we are getting the error during migration.
3. Undo failing migration. This is a 2 step process.
   1. Delete last row in _prisma_migrations table.
   2. Delete the last migration folder.
4. Now run `prisma migrate dev --create-only`. This will not fire the migration on database and will create migration file only.
5. Now sort the problem (found at step 2) by adding the custom SQL in the migration file created in step 4.
6. Now run `prisma migrate dev` again to check and finalize the fix.

Keep on repeating all the above steps till the time problem is not resolved. Most of the times issues are related to existing data and it needs modification in logical manner via custom SQL.

## pgAdmin backup storage

pgAdmin runs inside Docker as the `pgadmin` user (UID/GID `5050`). This project mounts
[`apps/api/db-backup`](turborepo/apps/api/db-backup) into the
container so database backup files are available on the host machine.

To avoid future permission issues, run this one-time setup after cloning the repo:

1. `mkdir -p apps/api/db-backup`
2. `sudo chown -R 5050:5050 apps/api/db-backup`
3. `sudo chmod -R u+rwX,g+rwX apps/api/db-backup`
4. `docker compose -f apps/api/compose.yaml up -d --force-recreate pgadmin`

After that, pgAdmin backups will be written under a user-specific folder such as:

1. `apps/api/db-backup/admin_local.com`

If you need to inspect or restore a backup from the terminal, you may also want temporary
read access for your host user:

1. `sudo chown -R "$USER:$USER" apps/api/db-backup`

If you do that, re-run the one-time setup above before using pgAdmin backup/restore again.
