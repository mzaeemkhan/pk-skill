#!/usr/bin/env node
// Smoke test: run one cheap subcommand per skill (see smoke.json), check exit 0 + non-empty JSON.
// Usage: node scripts/smoke.mjs [--only live|offline] [--skill <name>]
import { execFile } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TIMEOUT_MS = 45_000;
const CONCURRENCY = 6;

const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : undefined; };
const only = flag("only");
const skill = flag("skill");
if (only && !["live", "offline"].includes(only)) { console.error("--only must be live or offline"); process.exit(2); }

const config = JSON.parse(readFileSync(join(ROOT, "smoke.json"), "utf8"));
const entries = Object.entries(config).filter(([name, e]) =>
  (!skill || name === skill) && (!only || (only === "live") === e.live));
if (!entries.length) { console.error("no matching skills"); process.exit(2); }

const isEmpty = (v) => v == null || (Array.isArray(v) ? v.length === 0 : typeof v === "object" && Object.keys(v).length === 0);

function run(name, { script, args, live }) {
  const started = Date.now();
  return new Promise((resolve) => {
    execFile(process.execPath, [script, ...args], { cwd: join(ROOT, name), timeout: TIMEOUT_MS, maxBuffer: 20 * 1024 * 1024 },
      (err, stdout, stderr) => {
        const ms = Date.now() - started;
        let status = "pass", reason = "";
        if (err) {
          status = "fail";
          reason = err.killed ? `timeout ${TIMEOUT_MS / 1000}s` : (stderr || err.message).trim().split("\n").pop();
        } else {
          try { if (isEmpty(JSON.parse(stdout))) { status = "fail"; reason = "empty JSON"; } }
          catch { status = "fail"; reason = "stdout is not JSON"; }
        }
        if (status === "fail" && /blocked|403|cloudflare/i.test(reason)) status = "blocked";
        resolve({ skill: name, live, args: args.join(" "), status, ms, reason: reason.slice(0, 200) });
      });
  });
}

const results = [];
let next = 0;
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, entries.length) }, async () => {
  while (next < entries.length) { const [name, e] = entries[next++]; results.push(await run(name, e)); }
}));
results.sort((a, b) => a.skill.localeCompare(b.skill));

for (const r of results) {
  const mark = { pass: "PASS ", fail: "FAIL ", blocked: "BLOCK" }[r.status];
  console.log(`${mark} ${r.skill.padEnd(30)} ${(r.live ? "live" : "offline").padEnd(8)} ${String(r.ms).padStart(6)}ms  ${r.reason}`);
}
const count = (s) => results.filter((r) => r.status === s).length;
const summary = { total: results.length, pass: count("pass"), fail: count("fail"), blocked: count("blocked") };
console.log(`\n${summary.pass}/${summary.total} passed, ${summary.fail} failed, ${summary.blocked} blocked`);
writeFileSync(join(ROOT, "smoke-report.json"), JSON.stringify({ ranAt: new Date().toISOString(), only: only ?? "all", summary, results }, null, 2) + "\n");
process.exit(summary.pass === summary.total ? 0 : 1);
