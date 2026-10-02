#!/usr/bin/env sh
set -eu

staged_files=$(git diff --cached --name-only --diff-filter=ACMR)

run_api=false
run_store=false
run_admin=false

for file in $staged_files; do
  case "$file" in
    apps/api/*)
      run_api=true
      ;;
    apps/store/*)
      run_store=true
      ;;
    apps/admin/*)
      run_admin=true
      ;;
    .githooks/*|packages/*|package.json|pnpm-lock.yaml|pnpm-workspace.yaml|turbo.json)
      run_api=true
      run_store=true
      run_admin=true
      ;;
  esac
done

if [ "$run_api" = false ] && [ "$run_store" = false ] && [ "$run_admin" = false ]; then
  echo "No staged changes affecting apps/api or apps/store or apps/admin. Skipping precommit checks."
  exit 0
fi

if [ "$run_api" = true ]; then
  echo "> pnpm turbo run lint check-types test:coverage --filter=api"
  pnpm turbo run lint check-types test:coverage --filter=api

  echo "> pnpm --filter api openapi"
  pnpm --filter api openapi

  echo "> pnpm --filter api validate-openapi:local"
  pnpm --filter api validate-openapi:local
fi

if [ "$run_store" = true ]; then
  echo "> pnpm --filter store prettier:check"
  if ! pnpm --filter store prettier:check; then
    echo "> pnpm --filter store prettier"
    pnpm --filter store prettier
    pnpm --filter store prettier:check
  fi
 
  echo "> pnpm turbo run lint check-types --filter=store"
  pnpm turbo run lint check-types --filter=store
 
  echo "> pnpm turbo run test:coverage --filter=store"
  pnpm turbo run test:coverage --filter=store
  
  echo "> pnpm turbo run test:ct --filter=store"
  pnpm turbo run test:ct --filter=store
fi

if [ "$run_admin" = true ]; then
  echo "> pnpm --filter admin prettier:check"
  if ! pnpm --filter admin prettier:check; then
    echo "> pnpm --filter admin prettier"
    pnpm --filter admin prettier
    pnpm --filter admin prettier:check
  fi

  echo "> pnpm turbo run lint check-types --filter=admin"
  pnpm turbo run lint check-types --filter=admin

  echo "> pnpm turbo run test:coverage --filter=admin"
  pnpm turbo run test:coverage --filter=admin

  echo "> pnpm turbo run test:ct --filter=admin"
  pnpm turbo run test:ct --filter=admin
fi
