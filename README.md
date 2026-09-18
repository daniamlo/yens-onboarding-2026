# Yens Onboarding 2026

A two-day, hands-on onboarding to research computing and AI at Stanford GSB, for
incoming PhD students and faculty. Both mornings run 9:00–12:00.

**🌐 Course website:** <https://gsbdarc.github.io/yens-onboarding-2026/>

## Resource Profile

### extract_form_3_batch.py — 10 filings

- Yen node used: 1
- Wall-clock time (real): 0m18.346s
- CPU cores used: 1
- RAM used (RES from htop, in MB or GB): 1GB
- Serial or parallel: Serial

### scripts/extract_array.py — 100 filings (Slurm array, `--array=0-99`, job 612491)

- Yen node used: 1 (`yen20`, shared by all 100 tasks)
- Per-task wall-clock time (Elapsed, from `sacct`): 5s–21s (most tasks 6–18s)
- Total array wall-clock (submit → last task finished): ~2m04s (11:08:38 → 11:10:42),
  vs. ~22s of queue wait before the first task started
- CPU cores used: 1 per task (requested `--cpus-per-task=1`)
- RAM used (MaxRSS from `sacct`, per task): ~71–78MB — the `--mem=1G` request in
  `slurm/extract_array.slurm` was roughly **13x more than any task actually used**
- Serial or parallel: Parallel — 100 independent tasks, one filing each, run
  concurrently on the same node
- Outcome: 97/100 filings extracted successfully. 3 tasks (array indices 12, 22, 27)
  failed with `anthropic.BadRequestError: prompt is too long` — those three filings'
  raw text exceeds the model's 200k-token context window, not a bug in the script or
  job. 10 of the 100 tasks (indices 0-9) had already been processed by the Part 1
  batch run, so `extract_array.py`'s rerun-safety check (`output_path.exists()`) let
  them skip straight to a no-op instead of re-calling the API.

### scripts/extract_array.py — 992 filings (Slurm array, `--array=0-495`, job 613067)

- Route chosen and why: the cluster's `MaxArraySize` is 512 (`scontrol show config`),
  so 992 filings can't map one-to-one onto array tasks anymore. Rather than splitting
  the work across multiple separate array-job submissions, each task now loops over a
  small chunk of `FILES_PER_TASK = ceil(992/512) = 2` filings sequentially, giving
  `NUM_TASKS = 496` (`--array=0-495`) — one array, one `sbatch` submission, and the
  same per-file rerun-safety skip (`output_path.exists()`) as before.
- Yen node used: 1, shared by all 496 tasks
- Per-task wall-clock time (Elapsed, from `sacct`): 3s–19s (most tasks 6–13s)
- Total array wall-clock (submit → last task finished): ~6m26s (11:37:24 → 11:43:50),
  vs. ~15s of queue wait before the first task started
- CPU cores used: 1 per task (requested `--cpus-per-task=1`)
- RAM used (MaxRSS from `sacct`, per task): ~75–78MB — in line with the 100-filing
  run, since each task still processes its filings one at a time
- Serial or parallel: Parallel — 496 tasks, each processing up to 2 filings, run
  concurrently on the same node
- Outcome: 152/496 tasks COMPLETED, 344 FAILED.
  - 336 failures: `anthropic.BadRequestError` — "Your credit balance is too low to
    access the Anthropic API" — the Anthropic account ran out of API credits partway
    through the run. This is an account/billing issue, not a bug in the script or job;
    tasks were running concurrently, so which ones got a request in before the credit
    balance hit zero was effectively random rather than tied to array index.
  - 8 failures: `anthropic.BadRequestError: prompt is too long` (240k–411k tokens) —
    the same 200k-token context-window limit hit in the 100-filing run, on filings
    with unusually large raw text.

