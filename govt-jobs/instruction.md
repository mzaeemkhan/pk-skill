# Government Jobs

## What this skill does

Reads live job openings from the National Job Portal (`njp.gov.pk`), the Government of Pakistan's portal for federal ministries, divisions and corporations (e.g. Cabinet Division, Finance Division, NTC, PNSC, EXIM Bank). Read-only. No API key.

## When to use

- "Any government jobs open right now?"
- "Federal government engineer jobs"
- "BPS-17 jobs" (search, then filter by `grade`)
- "Details and last date for NJP job 9821"

Not covered: FPSC/PPSC exams (use `exam-results` for results), provincial service commissions, private-sector jobs.

## Workflow

1. Run one of:
   - `node scripts/jobs.mjs latest [--count N] [--page P]` — newest live openings
   - `node scripts/jobs.mjs search --query "<keyword>" [--count N]` — keyword search (title/description)
   - `node scripts/jobs.mjs job --id <id>` — full description, posted date, deadline, age limit
2. Listing fields: `title`, `department`, `jobType` (Regular/Contract), `grade` (BPS/PPS/scale as posted), `quota` (regional quota, if any), `vacancies`, `experience`, `lastDate`, `link`.
   - `lastDate: "today"` means the card says "Last day to apply".
3. To filter by grade or department, run `latest --count 100` and filter the JSON yourself.
4. Show a short table (title, department, grade, last date) and the `link`. For one job, run `job --id` and summarise the eligibility.
5. Tell the user they apply by registering on njp.gov.pk. This skill cannot apply.

## Limitations

- No location/city field on NJP listings. If the user asks for a city, say so and suggest checking each job page.
- Listing pages hold 20 jobs. The script reads up to 5 pages per call.

## Errors

Non-numeric `--id`, missing `--query` or HTTP failures exit non-zero with a message on stderr.
