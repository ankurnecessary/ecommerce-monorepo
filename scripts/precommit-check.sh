#!/usr/bin/env sh
set -eu

staged_files=$(git diff --cached --name-only --diff-filter=ACMR)

run_api=false
run_store=false

for file in $staged_files; do
  case "$file" in
    apps/api/*)
      run_api=true
      ;;
    apps/store/*)
      run_store=true
      ;;
    .githooks/*|packages/*|package.json|pnpm-lock.yaml|pnpm-workspace.yaml|turbo.json)
      run_api=true
      run_store=true
      ;;
  esac
done

if [ "$run_api" = false ] && [ "$run_store" = false ]; then
  echo "No staged changes affecting apps/api or apps/store. Skipping precommit checks."
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
  echo "> pnpm turbo run lint check-types test:coverage --filter=store"
  pnpm turbo run lint check-types test:coverage --filter=store
fi
