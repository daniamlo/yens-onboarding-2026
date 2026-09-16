---
layout: default
title: "2. Document"
parent: "Part 1 — Profile & Submit a Job"
grand_parent: "Day 2 — The Yen-Slurm Cluster"
nav_order: 2
permalink: /day2/resource-profile/
---

# Document

{: .note }
> 🔴 **Red sticky** = I need help. Put it up the moment you are stuck — an instructor will
> come to you.
>
> 🟢 **Green sticky** = I have done 1–4 and am moving on to the bonus work, and I am ready
> to help my table.

<svg viewBox="0 0 720 164" role="img" aria-labelledby="daymap-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:720px;height:auto;margin:1.5rem auto" font-family="'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="daymap-title">Day 2 arc — you are on step 2, document.</title>
  <defs>
    <marker id="daymap-ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c2cad4"/></marker>
  </defs>
  <text x="70" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">profile</text>
  <text x="210" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="#8C1515">document</text>
  <text x="350" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">submit</text>
  <text x="490" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">read logs</text>
  <text x="630" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">scale (Part 2)</text>
  <line x1="92" y1="80" x2="608" y2="80" stroke="#c2cad4" stroke-width="3"/>
  <path d="M490,101 L490,124 Q490,130 484,130 L356,130 Q350,130 350,124 L350,103" fill="none" stroke="#c2cad4" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#daymap-ah)"/>
  <text x="420" y="150" text-anchor="middle" font-size="15" font-weight="400" fill="#6a7280">debug</text>
  <circle cx="70" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="70" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">1</text>
  <circle cx="210" cy="80" r="20" fill="#fff" stroke="#8C1515" stroke-width="3"/><text x="210" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#8C1515">2</text>
  <circle cx="350" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="350" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">3</text>
  <circle cx="490" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="490" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">4</text>
  <circle cx="630" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="630" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">5</text>
</svg>

Everything on this page runs from your clone, with the environment active:

```bash
cd ~/yens-onboarding-2026
source .venv/bin/activate
```
{: .yens }

{: .important }
> **Task:** Write down the resources you measured for the 10-filing run in your README.

Now that you've profiled **10 filings**, write down what you measured. Open the `README.md` in your repo and add a **Resource Profile** section:

```markdown
## Resource Profile

### extract_form_3_batch.py — 10 filings

- Yen node used:
- Wall-clock time (real):
- CPU cores used:
- RAM used (RES from htop, or % Mem from userload):
- Serial or parallel:
```
{: .file }

{: .tip }
> If your RAM here is tiny — just a few MB (`RES`), showing as 0% Mem in `userload` — you can't ask for 0, so a good tip is to write down a small round number like `1G`.

Fill in the actual numbers from your `time`, `userload`, and `htop` output.

{: .important }
> **Finish all four pages before you start any bonus.** The numbers you write down on one
> page are the inputs to the next, and Part 2 assumes all four are done.

<details id="bonus-claude-readme" markdown="1">
<summary>⭐ Bonus — let Claude write it into the README</summary>

You already have the numbers. Turning them into a formatted README section is the tedious
half — hand that to Claude.

Start Claude Code in your repo:

```bash
ml claude-code
cd ~/yens-onboarding-2026
claude
```
{: .yens }

Then give it your measurements. The `<...>` are placeholders — replace the whole thing,
brackets included: `yen2`, not `<yen2>`.

```
> Add a "Resource Profile" section to README.md for scripts/extract_form_3_batch.py over 10 filings: ran on <node>, real <wall-clock time>, <cores> cores, <RAM> RES, <serial or parallel>. Add just that section and leave the rest of the file alone.
```
{: .claude }

**Read the diff before you approve it.** Two things to check:

- **The numbers are yours.** Claude did not watch your run, so any figure you do not
  hand it, it will invent — and it will look reasonable. That matters more here than
  anywhere else today: these numbers become the `--time` and `--mem` on the next page, so a
  made-up one turns into a job that gets killed or waits far longer than it needs to.
- **Nothing else moved.** You asked for one section added, not a tidied-up README.

Then `/exit` to get your shell back, and check the result:

```bash
cat README.md
```
{: .yens }

</details>
