#!/bin/bash
# File: shell-scripts/lighthouse-wsl.sh

set -euo pipefail

pick_chrome_bin() {
  local candidates=(
    "google-chrome-stable"
    "google-chrome"
    "chromium"
    "chromium-browser"
  )

  local candidate
  for candidate in "${candidates[@]}"; do
    if command -v "$candidate" > /dev/null 2>&1; then
      command -v "$candidate"
      return 0
    fi
  done

  return 1
}

if ! command -v pnpm &> /dev/null; then
  echo "pnpm not found. Please install it or use npm/yarn equivalent."
  exit 1
fi

if ! CHROME_BIN="$(pick_chrome_bin)"; then
  echo "No Chrome/Chromium binary found. Install Google Chrome or Chromium in WSL."
  exit 1
fi

CHROME_PROFILE_DIR="$(mktemp -d /tmp/lighthouse-chrome.XXXXXX)"
cleanup() {
  rm -rf "$CHROME_PROFILE_DIR"
}
trap cleanup EXIT

export CHROME_PATH="$CHROME_BIN"
export LIGHTHOUSE_CHROME_FLAGS="--headless --disable-gpu --no-sandbox --user-data-dir=$CHROME_PROFILE_DIR"

echo "Using Chrome binary: $CHROME_PATH"
echo "Using temp Chrome profile: $CHROME_PROFILE_DIR"
echo "Running Lighthouse CI via pnpm..."

pnpm exec lhci autorun

echo "Audit complete."
