import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const aliasPrefix = '@/';
const compiledSourceRoot = distDir;

const extsToRewrite = new Set(['.js', '.d.ts']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!extsToRewrite.has(ext)) continue;

    rewriteFile(fullPath);
  }
}

function toRelativeImport(fromFile, aliasPath) {
  const targetPath = path.resolve(compiledSourceRoot, aliasPath);
  let relativePath = path.relative(path.dirname(fromFile), targetPath).replace(/\\/g, '/');
  if (!relativePath.startsWith('.')) relativePath = `./${relativePath}`;
  return relativePath;
}

function rewriteAliases(content, filePath) {
  return content.replace(/(['"])@\/([^'"`]+)\1/g, (full, quote, rest) => {
    const replacement = toRelativeImport(filePath, rest);
    return `${quote}${replacement}${quote}`;
  });
}

function rewriteFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  if (!original.includes(aliasPrefix)) return;

  const rewritten = rewriteAliases(original, filePath);
  if (rewritten !== original) {
    fs.writeFileSync(filePath, rewritten, 'utf8');
  }
}

if (!fs.existsSync(distDir)) {
  console.error(`dist directory not found: ${distDir}`);
  process.exit(1);
}

walk(distDir);
