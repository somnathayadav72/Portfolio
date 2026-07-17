import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "public/brand/sy-mark.svg",
  "public/brand/somnath-yadav-wordmark.svg",
  "public/brand/somnath-yadav-lockup-dark.svg",
  "public/brand/somnath-yadav-lockup-light.svg",
  "public/brand/social-avatar.svg",
  "src/app/icon.svg",
];
const failures = required.filter((relative) => {
  const path = join(root, relative);
  return !existsSync(path) || statSync(path).size === 0;
});
if (failures.length) {
  console.error(`Missing or empty assets:\n${failures.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}
console.log(`Asset validation passed (${required.length} files checked).`);
