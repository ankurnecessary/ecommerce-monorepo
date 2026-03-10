import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hooksDir = resolve(rootDir, ".githooks");

if (!existsSync(hooksDir)) {
  process.exit(0);
}

try {
  execSync("git rev-parse --is-inside-work-tree", {
    cwd: rootDir,
    stdio: "ignore",
  });
  execSync("git config core.hooksPath .githooks", {
    cwd: rootDir,
    stdio: "ignore",
  });
} catch {
  // Skip hook setup outside git repos (for example, some CI build contexts).
}
