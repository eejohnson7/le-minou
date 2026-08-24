import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const trackedFiles = execFileSync("git", ["ls-files", "src"], { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);
const trackedByLowerCase = new Map(trackedFiles.map((file) => [file.toLowerCase(), file]));
const importPattern = /(?:from\s+|import\s*)["']([^"']+)["']/g;
const failures = [];

function findTrackedTarget(importingFile, specifier) {
  const basePath = path.posix.normalize(path.posix.join(path.posix.dirname(importingFile), specifier));
  const candidates = [
    basePath,
    `${basePath}.js`,
    `${basePath}.jsx`,
    path.posix.join(basePath, "index.js"),
    path.posix.join(basePath, "index.jsx")
  ];

  for (const candidate of candidates) {
    const trackedTarget = trackedByLowerCase.get(candidate.toLowerCase());
    if (trackedTarget) return { candidate, trackedTarget };
  }

  return null;
}

for (const sourceFile of trackedFiles.filter((file) => /\.[cm]?[jt]sx?$/.test(file))) {
  const source = fs.readFileSync(sourceFile, "utf8");

  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    if (!specifier.startsWith(".")) continue;

    const target = findTrackedTarget(sourceFile, specifier);
    if (target && target.candidate !== target.trackedTarget) {
      failures.push(`${sourceFile}: ${specifier} resolves to tracked path ${target.trackedTarget} with different case`);
    }
  }
}

if (failures.length > 0) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log("All relative imports match tracked path casing.");
}
