---
layout: default
title: "1. Profile"
parent: "Part 1 — Profile & Submit a Job"
grand_parent: "Day 2 — The Yen-Slurm Cluster"
nav_order: 1
permalink: /day2/profiling/
---

# Profile

{: .note }
> 🔴 **Red sticky** = I need help. Put it up the moment you are stuck — an instructor will
> come to you.
>
> 🟢 **Green sticky** = I have done 1–4 and am moving on to the bonus work, and I am ready
> to help my table.

<svg viewBox="0 0 720 164" role="img" aria-labelledby="daymap-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:720px;height:auto;margin:1.5rem auto" font-family="'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="daymap-title">Day 2 arc — you are on step 1, profile.</title>
  <defs>
    <marker id="daymap-ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c2cad4"/></marker>
  </defs>
  <text x="70" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="#8C1515">profile</text>
  <text x="210" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">document</text>
  <text x="350" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">submit</text>
  <text x="490" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">read logs</text>
  <text x="630" y="46" text-anchor="middle" font-size="17" font-weight="400" fill="#6a7280">scale (Part 2)</text>
  <line x1="92" y1="80" x2="608" y2="80" stroke="#c2cad4" stroke-width="3"/>
  <path d="M490,101 L490,124 Q490,130 484,130 L356,130 Q350,130 350,124 L350,103" fill="none" stroke="#c2cad4" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#daymap-ah)"/>
  <text x="420" y="150" text-anchor="middle" font-size="15" font-weight="400" fill="#6a7280">debug</text>
  <circle cx="70" cy="80" r="20" fill="#fff" stroke="#8C1515" stroke-width="3"/><text x="70" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#8C1515">1</text>
  <circle cx="210" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="210" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">2</text>
  <circle cx="350" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="350" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">3</text>
  <circle cx="490" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="490" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">4</text>
  <circle cx="630" cy="80" r="20" fill="#f3f4f7" stroke="#6a7280" stroke-width="3"/><text x="630" y="87" text-anchor="middle" font-size="20" font-weight="700" fill="#6a7280">5</text>
</svg>

## Computing Resources — A Quick Recap

Before we run anything, let's make sure we have the vocabulary for the resources a program
uses:

| Resource | What it is |
|---|---|
| **CPU core** | An individual worker that executes your code |
| **RAM** | Fast memory the CPU reads from while working |
| **Storage (file system)** | Where your files live — VAST on the Yens |
| **Time** | How long your script takes to finish |

## The Mystery Script

You are going to run a script you have never seen before and work out what resources it uses — without reading the code. That is **profiling**: measuring a script's time, CPU and RAM while it runs.

<svg viewBox="0 0 700 132" role="img" aria-labelledby="twoterm-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:100%;height:auto;margin:1.5rem auto" font-family="'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="twoterm-title">Profiling uses two terminals on the same Yen node: Terminal 1 runs the script, Terminal 2 watches its CPU, RAM and processes live.</title>
  <rect x="16" y="8" width="668" height="116" rx="16" fill="#f7f9fc" stroke="#bcd4f2" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="40" y="34" font-size="12.5" font-weight="700" letter-spacing="0.4" fill="#6b7280">🖥️  ONE INTERACTIVE YEN NODE · BOTH TERMINALS ON IT</text>
  <rect x="40" y="46" width="300" height="70" rx="12" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="60" y="76" font-size="17" font-weight="700" fill="#2c3e50">Terminal 1 · the worker</text>
  <text x="60" y="100" font-size="15" fill="#6a7280">runs the script</text>
  <rect x="360" y="46" width="300" height="70" rx="12" fill="#fff8ef" stroke="#e6cfa8" stroke-width="1.5"/>
  <text x="380" y="76" font-size="17" font-weight="700" fill="#2c3e50">Terminal 2 · the observer</text>
  <text x="380" y="100" font-size="15" fill="#6a7280">watches CPU, RAM and processes</text>
</svg>

{: .important }
> **Task:** Run `mystery_script.py` and measure its resource usage in real time using two terminals — both on the **same Yen node**.

**Step 1 — Note which Yen you are on.**

In your current terminal, run:

```bash
hostname
```
{: .yens }

{: .tip }
> **Pick what it printed** and every command on this page fills itself in, so you can copy
> them without editing. The load balancer hands out yen1–yen5, and both terminals have to
> land on the *same* node.
>
> <span class="personalize-field"><select id="yen-node" data-personalize="yen"><option value="">choose…</option><option>yen1</option><option>yen2</option><option>yen3</option><option>yen4</option><option>yen5</option></select><label class="personalize-affix personalize-affix-end" for="yen-node">.stanford.edu</label></span>

**Step 2 — Open a second terminal on the same node.**

In the new terminal, SSH directly to that node by name — not the load-balanced
`yen.stanford.edu`, which could land you on a different machine:

```bash
ssh SUNetID@YENNODE.stanford.edu
```
{: .laptop }

Everything on this page runs from your clone, with the environment active:

```bash
cd ~/yens-onboarding-2026
source .venv/bin/activate
```
{: .yens }

{: .note }
> 💡 **Skip the second login.** A fresh `ssh` means another password + Duo prompt. To avoid re-authenticating, open a terminal through JupyterHub instead: browse to that node's hub, `https://YENNODE.stanford.edu/jupyter/`, then **New → Terminal**. You're already authenticated there, and it drops you onto that exact node — ideal for the second monitoring terminal.

**Step 3 — Start `watch userload` in Terminal 2 *first*, before running anything.**

Terminal 2:
```bash
watch userload
```
{: .yens }

- `userload` shows how many **cores** you're using and what **% of the node's memory** you're holding — your total footprint across all your processes on this node:

  ```text
  SUNetID  |  0.34 Cores  |  0.00% Mem  on YENNODE
  ```

- `watch` re-runs it every 2 seconds, so the numbers refresh live
- Jupyter processes are tracked separately from processes started in a terminal shell — not a Jupyter terminal — and are not included

**What are we seeing?** Right now — before you run anything — this is your **baseline**: **Cores** near 0 and **% Mem** near 0. That's what an idle account looks like. Keep this terminal visible; you'll watch these numbers move once the script starts. See the [current per-user limits](https://rcpedia.stanford.edu/_policies/user_limits/) for how much CPU and RAM any one user can use on an interactive Yen.

**Step 4 — Now run the script in Terminal 1 and watch Terminal 2 change.**

Terminal 1:
```bash
time python scripts/mystery_script.py
```
{: .yens }

{: .note }
> **What's the `time` in front?** `time` is a wrapper — it runs whatever command follows (`python scripts/mystery_script.py`) exactly as normal, then, once it finishes, prints how long it took. It doesn't change what your script does; it just measures it. That's where the `real` / `user` / `sys` lines below come from.

As it runs, watch Terminal 2: **your Cores number climbs and % Mem grows** — that's the script's footprint stacking on top of your baseline. If Cores climbs above 1, the script is using more than one core at once. When it finishes, the numbers fall back toward baseline, and `time` prints three lines:

```
real    0m31.234s
user    2m0.682s
sys     0m2.212s
```
{: .output }

- **real** — wall-clock time: how long you actually waited
- **user** — CPU time your code consumed across all cores; if `user` > `real`, the script used multiple cores in parallel
- **sys** — CPU time spent on OS-level work (file I/O, memory allocation)

**Step 5 — Run the script again, this time watching it in `htop`.**

First, in **Terminal 2**, stop `watch userload` by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>. Then start `htop`, filtered to just your own processes:

```bash
htop -u SUNetID
```
{: .yens }

The `-u` flag limits `htop` to your processes, so the hundreds of other users' processes on
the node don't drown yours out.

<details markdown="1">
<summary>🖥️ Options to hide the header and make the display more compact</summary>

Some Yens have 256 cores, and if `htop` is drawing one bar per core the header fills the
window and pushes the process list off the bottom.

- <kbd>H</kbd> — hide threads, so each process is one row
- <kbd>t</kbd> — tree mode, which nests the workers a process spawned underneath it. Useful
  here, because that nesting is exactly what you are trying to count

**To hide the header,** swap the per-core meters for a single average bar:

1. <kbd>F2</kbd> — opens Setup, with **Meters** already selected on the left
2. <kbd>→</kbd> to move into the **Left column** list
3. <kbd>↓</kbd> to the CPU entry — it reads something like `CPUs (1/1) [Bar]`
4. <kbd>Delete</kbd> to remove it
5. <kbd>→</kbd> again to reach **Available meters**, then <kbd>↓</kbd> to **CPU average**
6. <kbd>Enter</kbd> to add it back as one bar
7. <kbd>F10</kbd> to leave Setup

You only do this once — `htop` writes it to `~/.config/htop/htoprc` and remembers it next
time. If your header already shows a single `Avg[...]` bar, it is set up correctly and you
can skip this.

</details>

**Each row in `htop` is one process.** The columns that matter:

- **`CPU%`** — how hard that process is pushing. `100%` = one full core busy, `200%` = two cores, and so on — a single process reading over `100%` is spread across multiple cores.
- **`RES`** — the real RAM the process is actually using. Shown in **KB** by default, so `9000` ≈ **9 MB**; bigger values get an `M` or `G` suffix (like `111M`).
- **`MEM%`** — that same `RES` as a share of the **whole node's** RAM. On a 1 TB node a few MB rounds to **0.0%** — which is why `userload` can read `0% Mem` even though the process really is using memory.
- **`VIRT`** — ignore it. That's memory the process *reserved*, not what it's actually using.

Now, in **Terminal 1**, run the script again and watch your rows in `htop` light up:

```bash
time python scripts/mystery_script.py
```
{: .yens }

As the script runs, watch new `python` rows appear — that's it spawning work. Count them to answer "how many processes did it run?"

Answer each one from your own output, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">How long did it take, and how much RAM did it peak at?</span></summary>

**Read them off your own two terminals** — `real` from `time` in Terminal 1, and the peak `RES`
you watched in `htop`. You cannot get either by reading the code, which is the point of
profiling.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">How many cores did it use, and how many processes did it run?</span></summary>

**About 4 of each.** Roughly **4 Cores** in `userload`, and about **4 <code>python</code>
processes** in `htop` — one process per core.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">Serial or parallel, and how do you know?</span></summary>

**Parallel.** Open `scripts/mystery_script.py` and you will find
`num_cores = 4`: it deliberately starts four worker processes, one per core, which is exactly
what made it a multi-core program.

So the amount of parallelism is a **choice in the code**. Change that number and the processes
and cores you see change with it.

</details>

## The Batch Script

Everything on this page runs from your clone, with the environment active:

```bash
cd ~/yens-onboarding-2026
source .venv/bin/activate
```
{: .yens }

{: .important }
> **Task:** Profile the real batch script on 10 filings using the same two-terminal technique.

Now apply the same technique to a **real workload**. `scripts/extract_form_3_batch.py` — committed in the repo, so everyone has it — runs the same Form 3 extraction you did on Day 1 with `extract_form_3_one_file.py`, but loops over many filings instead of one. Process **10 filings** and profile it.

First, open the script so you know what you're profiling — `cat scripts/extract_form_3_batch.py` (or open it in JupyterHub).

<details markdown="1">
<summary>💡 Hint — what the script does</summary>

It loops over the filings in `data/aws_links.csv`, calls the API for each, and writes one JSON per filing to `results/`.

</details>

The script is set to process **10 filings** (see `NUM_FILINGS` near the top — kept small so a stray run doesn't fire hundreds of paid API calls).

**First run — watch the load.** Terminal 2 (start this first):
```bash
watch userload
```
{: .yens }

Terminal 1 — run it and note the `real`, `user`, and `sys` times when it finishes:
```bash
time python scripts/extract_form_3_batch.py
```
{: .yens }

**Second run — watch the processes.** Switch Terminal 2 to `htop`, then run the script once more so you can see the processes live:

Terminal 2:
```bash
htop -u SUNetID
```
{: .yens }

Terminal 1:
```bash
time python scripts/extract_form_3_batch.py
```
{: .yens }

Watch Terminal 2 as the 10 filings process one after another.

{: .note }
> **No need to clear `results/` first.** The script overwrites each file as it goes — there
> is no check for work already done, so the second run repeats all ten API calls whether or
> not the output is already sitting there.
>
> Worth noticing, because it is a real cost: a rerun after a partial failure pays for
> everything again. We will fix this later, in
> [Part 2]({{ '/day2/rerun-safe-tasks/' | relative_url }}).

{: .note }
> **Reminder — `real` / `user` / `sys`:**
> - **`real`** — wall-clock time: how long you actually waited
> - **`user`** — CPU time your code used across all cores (if `user` > `real`, it ran on multiple cores in parallel)
> - **`sys`** — CPU time spent on OS-level work (file I/O, memory allocation)

Answer each one from your own output, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">You watched <code>userload</code> through the whole run. What did Cores and % Mem do?</span></summary>

**Barely moved.** Both sat near the baseline you noted before starting — Cores well under 1,
% Mem showing 0. Ten filings went through and the display hardly changed.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">Ten filings took about 20 seconds, yet Cores stayed near 0. Where did the time go?</span></summary>

**Into waiting on the Anthropic API.** The job sends a filing, then sits idle until the
answer comes back — so it barely touches the CPU. That is the opposite of the mystery script,
which was **CPU-bound**: four cores doing real math, with nothing to wait for.

The `time` output is the fingerprint. A typical run: `real 0m22.5s`, `user 0m1.9s`,
`sys 0m0.5s` — roughly 2 seconds of actual work against 20 of waiting. Whenever `real` ≫ `user`,
you are looking at a job that mostly waits.

Per-filing times vary too: each takes however long the API takes, so ten filings is not exactly
ten times one.

**Every script has a bottleneck.** When you optimize code, optimize the bottleneck first:

| Bottleneck | The job is waiting on | Typical fingerprint |
|---|---|---|
| **CPU-bound** | computation — cores doing math | `user` ≥ `real`, cores pegged |
| **I/O-bound** | the file system — reading and writing data | low CPU, and it gets worse with more files |
| **Memory-bound** | RAM it does not have, so it keeps returning to storage | RAM at the ceiling, and the job crawls |
| **Network-bound** | a reply from another machine — here, the Anthropic API | `real` ≫ `user`, cores near 0 |

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">% Mem reads 0 as well. Does that mean the script uses no memory?</span></summary>

**No — two things are true at once.** The script really does hold little memory, because it
handles one filing at a time rather than loading all ten. But even a few hundred MB would still
print `0%`, because that column measures your share of the node's whole ~1 TB. On a node that
big, almost any single job rounds to zero.

When you want the real number, read **`RES`** in `htop` instead.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">4</span><span class="qtext">Serial or parallel — and which number in your own output settles it?</span></summary>

**Serial.** A single `python` process in `htop`, and `userload` under 1 Core.

The timing agrees. `user` above `real` is what parallel looks like: the mystery script ran
`real 0m31s` against `user 2m0s`, because four cores were each clocking up CPU time while the
wall clock ran once. Here `user` came in far *below* `real`, so only one core was ever busy.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">5</span><span class="qtext">The script sets <code>OPENBLAS_NUM_THREADS=1</code>. Why cap a library's threads on a 256-core node?</span></summary>

**Because you are not allowed all 256.** Libraries like NumPy and pandas try to speed up math by
grabbing *every* core on the machine — 256 on Yen2, for example. But the Yens enforce
[per-user limits](https://rcpedia.stanford.edu/_policies/user_limits/) on how much CPU one person
can use, so grabbing all of them does not help: it crowds a pile of threads onto the cores you
actually have, which can make the job **slower**.

The habit: on a shared node, do not let a library grab the whole machine — keep its thread count
inside your limits.

</details>

{: .important }
> **Finish all four pages before you start any bonus.** The numbers you write down on one
> page are the inputs to the next, and Part 2 assumes all four are done.

<details id="bonus-more-scripts" markdown="1">
<summary>⭐ Bonus — profile two more scripts</summary>

**Bonus — Vectorized vs. Non-Vectorized**

One quick way to speed up scientific Python is **vectorization** — doing the math on a whole array in one operation instead of looping element-by-element in Python. The array operation runs in fast, pre-compiled code, so it's often 10–100× faster. We ship a script that computes the same sum of squares both ways — profile it and see the difference.

Terminal 1 — run it:
```bash
source .venv/bin/activate
time python scripts/vectorize_demo.py
```
{: .yens }

Terminal 2 — watch the load while it runs:
```bash
watch userload
```
{: .yens }

Both versions produce the identical result; the script prints how much faster the vectorized one was (often 10× or more). Notice the slow Python loop pins a core the whole time, while the NumPy version finishes almost before you can look at Terminal 2.

**Bonus — Change the number of cores**

Open `scripts/mystery_script.py` and change `num_cores = 4` to a different number — try **1**, or **8**. Then **profile it again** with the same two-terminal setup: run `time python scripts/mystery_script.py` in Terminal 1, and watch it in Terminal 2 with `watch userload` (or `htop -u SUNetID`).

Document what changes:

- How many `python` processes appear in `htop` now?
- How many **Cores** in `userload`?
- Did the `real` (wall-clock) time go up or down?
- Does the resource usage match the number you set?

</details>

<details id="bonus-cluster-usage" markdown="1">
<summary>⭐ Bonus — explore real cluster usage data</summary>

You have just measured one script. A live Yen node is running dozens of other people's
processes at the same time, and reading a real snapshot of that is the fastest way to make
the vocabulary concrete — what counts as a *process*, how one *user*'s footprint adds up,
and why **RAM in use** and **virtual memory reserved** are different numbers.

Work through
[Exploring Cluster Usage Data]({{ '/reference/cluster-usage-data/' | relative_url }}) — a
real `yenstop` capture, explored with Claude.

</details>

<details id="bonus-your-machine" markdown="1">
<summary>⭐ Bonus — size up your own machine</summary>

Put your own machine's numbers against a Yen node's, and price the same work in the
cloud. The written comparison is in
[Compute Environments]({{ '/reference/compute-environments/' | relative_url }}).

**Bonus — Know your own machine**

**Work with Claude** to figure out how to check your own laptop's CPU core count and RAM — tell it what operating system you're on and have it walk you through finding each one. Then enter your specs below to see just how much bigger one Yen node is (**yen1 has 256 cores and 1 TB of RAM**).

{: .warning }
> Start Claude **on your laptop**, not on the Yens — otherwise it'll report the Yen node's specs (256 cores, 1 TB), not your own machine's.

<details markdown="1">
<summary>💡 Hint — what to ask Claude</summary>

You don't need a fancy prompt. For example:

```
> Would you help me find the RAM and number of cores on my laptop?
```
{: .claude }

</details>

<style>
.yen-widget { border: 1px solid #ddd; border-radius: 6px; padding: 1rem 1.25rem; margin: 1rem 0; }
.yen-widget label { display: block; margin: 0.35rem 0; }
.yen-widget input { width: 6rem; margin-left: 0.4rem; }
.yen-widget button { margin-top: 0.6rem; padding: 0.35rem 0.9rem; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: #f0f0f0; }
#yw-out, #cw-out { margin-top: 0.75rem; line-height: 1.5; }
</style>

<div class="yen-widget">
  <label>Your laptop's CPU cores: <input id="yw-cores" type="number" min="1" step="1" value="8"></label>
  <label>Your laptop's RAM (GB): <input id="yw-ram" type="number" min="1" step="1" value="16"></label>
  <button id="yw-go">Compare</button>
  <p id="yw-out"></p>
</div>

<script>
(function () {
  var YEN_CORES = 256, YEN_RAM = 1024; // one Yen node (yen1): 256 logical cores, ~1 TB RAM
  function compare() {
    var c = parseFloat(document.getElementById('yw-cores').value);
    var r = parseFloat(document.getElementById('yw-ram').value);
    var out = document.getElementById('yw-out');
    if (!(c > 0) || !(r > 0)) { out.textContent = 'Enter your laptop’s cores and RAM above.'; return; }
    var coreX = YEN_CORES / c, ramX = YEN_RAM / r;
    var fit = Math.floor(Math.min(coreX, ramX));
    out.innerHTML =
      'A Yen node has <strong>' + coreX.toFixed(0) + '×</strong> your cores (' + YEN_CORES + ' vs ' + c + ')'
      + ' and <strong>' + ramX.toFixed(0) + '×</strong> your RAM (' + YEN_RAM + ' GB vs ' + r + ' GB).<br>'
      + 'About <strong>' + fit + '</strong> of your laptop' + (fit === 1 ? '' : 's') + ' would fit inside one Yen node.';
  }
  document.getElementById('yw-go').addEventListener('click', compare);
  compare();
})();
</script>

**Bonus — Price a cloud instance**

**Work with Claude** to find on-demand pricing for a cloud VM comparable to a Yen node — 256 cores and 1 TB of RAM, for example on AWS. Then use the calculator below — enter the VM's specs and the price per hour you found — to estimate what your Day 1 extraction job would cost to run there for an hour. Grant budgets aren't infinite; this is a real judgment call you'll make in your own research.

<details markdown="1">
<summary>💡 Hint — what to ask Claude</summary>

You don't need a fancy prompt. For example:

```
> Do you have on-demand VM pricing for a cloud VM (say AWS) with 256 cores and 1 TB of RAM?
```
{: .claude }

</details>

<div class="yen-widget">
  <label>VM CPU cores: <input id="cw-cores" type="number" min="1" step="1" value="256"></label>
  <label>VM RAM (GB): <input id="cw-ram" type="number" min="1" step="1" value="1024"></label>
  <label>Price per hour ($): <input id="cw-rate" type="number" min="0" step="0.01" value="3.00"></label>
  <label>Hours you'd run it: <input id="cw-hours" type="number" min="0" step="0.5" value="1"></label>
  <button id="cw-go">Estimate cost</button>
  <p id="cw-out"></p>
</div>

<script>
(function () {
  function estimate() {
    var cores = parseFloat(document.getElementById('cw-cores').value);
    var ram = parseFloat(document.getElementById('cw-ram').value);
    var rate = parseFloat(document.getElementById('cw-rate').value);
    var hours = parseFloat(document.getElementById('cw-hours').value);
    var out = document.getElementById('cw-out');
    if (!(rate >= 0) || !(hours >= 0)) { out.textContent = 'Enter a price per hour and how many hours.'; return; }
    var total = rate * hours;
    out.innerHTML =
      'A VM with <strong>' + (cores > 0 ? cores : '?') + '</strong> cores and <strong>'
      + (ram > 0 ? ram : '?') + ' GB</strong> at <strong>$' + rate.toFixed(2) + '/hr</strong>'
      + ' would cost <strong>$' + total.toFixed(2) + '</strong> to run for '
      + hours + ' hour' + (hours === 1 ? '' : 's') + '.';
  }
  document.getElementById('cw-go').addEventListener('click', estimate);
  estimate();
})();
</script>

</details>
