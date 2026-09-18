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

