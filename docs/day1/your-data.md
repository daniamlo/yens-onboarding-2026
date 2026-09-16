---
layout: default
title: "Your Data on the Yens"
parent: "Part 1 — Setup"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 2
permalink: /day1/your-data/
---

# Your Data on the Yens

You are logged in. Before you put anything on this machine, learn where it goes
depending on who you need to share it with and how big it is.

---

## Where Your Files Live

<svg viewBox="0 0 660 200" role="img" aria-labelledby="fs-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:660px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="fs-title">The Yens have three main places to keep files. Your home directory is small and backed up. Project storage is shared with your team and backed up. Scratch is huge and fast but NOT backed up, so files there can be deleted — copy out anything you want to keep.</title>
  <text x="14" y="26" font-size="12.5" font-weight="700" letter-spacing="0.4" fill="#8a94a6">📁  WHERE YOUR FILES LIVE ON THE YENS</text>

  <!-- Home: backed up -->
  <rect x="14" y="40" width="200" height="150" rx="14" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="30" y="74" font-size="14.5" font-weight="700" fill="#2c3e50">🏠  Your home</text>
  <text x="30" y="98" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">/home/users/SUNetID/</text>
  <rect x="28" y="112" width="172" height="28" rx="8" fill="#e3f2e6" stroke="#b7ddba" stroke-width="1.5"/>
  <text x="114" y="131" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d46">✓  backed up</text>
  <text x="30" y="162" font-size="11" fill="#6a7280">personal workspace</text>
  <text x="30" y="180" font-size="11" fill="#6a7280">small quota</text>

  <!-- Projects: backed up -->
  <rect x="230" y="40" width="200" height="150" rx="14" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="246" y="74" font-size="14.5" font-weight="700" fill="#2c3e50">👥  Project storage</text>
  <text x="246" y="98" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">/yen/projects/</text>
  <rect x="244" y="112" width="172" height="28" rx="8" fill="#e3f2e6" stroke="#b7ddba" stroke-width="1.5"/>
  <text x="330" y="131" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d46">✓  backed up</text>
  <text x="246" y="162" font-size="11" fill="#6a7280">shared with your team</text>
  <text x="246" y="180" font-size="11" fill="#6a7280">space is limited</text>

  <!-- Scratch: NOT backed up -->
  <rect x="446" y="40" width="200" height="150" rx="14" fill="#fff8ef" stroke="#e6cfa8" stroke-width="1.5"/>
  <text x="462" y="74" font-size="14.5" font-weight="700" fill="#2c3e50">⚡  Scratch space</text>
  <text x="462" y="98" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">/scratch/users/SUNetID/</text>
  <rect x="460" y="112" width="172" height="28" rx="8" fill="#fdeceb" stroke="#f0c3bd" stroke-width="1.5"/>
  <text x="546" y="131" text-anchor="middle" font-size="12" font-weight="700" fill="#c0392b">✕  NOT backed up</text>
  <text x="462" y="162" font-size="11" fill="#6a7280">huge &amp; fast</text>
  <text x="462" y="180" font-size="11" fill="#6a7280">copy out what you keep</text>
</svg>

Rule of thumb: the project itself — scripts, data, and outputs — lives in **projects**; your personal files live in **home** (both are backed up); **scratch** is for big temporary files you don't need to keep.

{: .note }
> **How to organize your work on the Yens:**
> - **A project — its scripts, data, and outputs → `/yen/projects/faculty/your_project/`.** This is the shared, backed-up home for the project itself; keep raw data and outputs in **separate subfolders** (e.g. `data/` and `output/`) so they never get mixed up. Access is controlled by the project's **workgroup**: everyone in it can read and write, which is how you, your PI, and collaborators share the same files. You may belong to **several** project workgroups at once, each with its own folder under `/yen/projects/faculty/` (or `/yen/projects/students/`). See <a href="https://rcpedia.stanford.edu/_policies/workgroups/" target="_blank" rel="noopener noreferrer">Workgroups</a> on RCpedia for who gets access and how it's managed.
> - **Personal files → your home, `/home/users/SUNetID/`.** Things that are yours, not any one project's: authentication tokens, R or shell preferences, quick one-off experiments. Backed up, and only you can see it.
> - **Large, temporary things → `/scratch/users/SUNetID/`.** Created for you automatically. Fast and roomy, but **not backed up**, and anything older than **90 days is deleted**. Use it for things you don't need to keep or that won't fit in your quota — a big public dataset you're exploring, or an LLM you're testing out. Copy anything worth keeping back to `/yen/projects/`.

**Local disk: `/tmp`**

Those three locations — home, projects, and scratch — are all on the **shared file system**: every node sees the same files. Each node *also* has its own **local disk** that is **not** shared with other nodes, and `/tmp` lives there — it's where programs often write temporary files while they run.

Two things to know about `/tmp`: it's **private to that node** (a file at `/tmp` on `yen1` isn't visible on `yen2`), and it's **temporary and not backed up** (cleared automatically). Keep anything you care about — data, results — on the shared file system.


---

## Understanding Storage Limits

Quotas on the Yens are enforced, and a job that hits one does not politely pause — it
fails partway through, often after hours of work, sometimes leaving a half-written file
that looks complete. Two commands keep you ahead of that.

{: .warning }
> **A full home directory locks you out.** Your home directory holds **80 GB**. Go over it
> and basic system tasks stop working — the first symptom is usually not a failed job but
> **JupyterHub refusing to start**, because it needs to write to your home directory, along
> with much else that quietly assumes it can. See
> <a href="https://rcpedia.stanford.edu/_user_guide/storage/" target="_blank" rel="noopener noreferrer">Storage</a> on RCpedia.

**How much space am I using?**

```bash
gsbquota                             # shows your home directory usage
gsbquota /yen/projects/faculty/your_project  # append a path to check usage for a project folder
```
{: .yens }

Run it with no arguments for your own home directory. Give it a path to ask about a
project folder instead — quotas there belong to the project, not to you, so a collaborator
filling it up is your problem too.

**What is actually taking up the space?**

`gsbquota` reports *how full* you are — say 94% of your 80 GB. It cannot tell you *what
filled it*. `gsbbrowser` can:

```bash
gsbbrowser                # opens an interactive file size browser in the terminal
# navigate with arrow keys, q to quit
```
{: .yens }

It opens a browser in the terminal, biggest directories first, and you walk down into them
with the arrow keys. Common culprits are saved R sessions, large Python modules, and work
that probably belongs in a project folder.

---

## Exercise — Check Your Space

{: .exercise }
> Find out where you are, how much room you have, and what is using it.

```bash
gsbquota                     # how full is your home directory?
ls /yen/projects/faculty/    # which faculty project spaces exist?
ls ~                         # what's in your home directory already?
gsbbrowser                   # what's actually taking up the space? (q to quit)
```
{: .yens }

---

## Quiz

Answer each one in your head, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">You want to share your data and code with a collaborator. Where should it go?</span></summary>

**A project folder** — `/yen/projects/faculty/your_project/`. Access is controlled by the
project's **workgroup**, so everyone in it reads and writes *the same files*. Home is
yours alone: nobody else can see it, and emailing a copy into your collaborator's home
just creates a second version that immediately starts to drift from yours.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">The replication package for a paper you are reading is 40 GB and you want to poke around in it. Where does it go?</span></summary>

**Scratch** — `/scratch/users/SUNetID/`. It would take up fully half of your 80 GB home,
and you do not need it backed up: it is somebody else's published archive, so you can always download it
again. That makes the 90-day purge harmless. Copy out only the pieces you end up keeping.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">You start RStudio and it dies with a mysterious error. What do you check first?</span></summary>

**Your quota** — `gsbquota`. RStudio, JupyterHub, and even a plain login all need to write
to your home directory, and when there is no room they fail in ways that rarely mention
disk space. A one-second check rules out the most common cause before you start debugging
anything harder.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">4</span><span class="qtext">You log in to yen1 and put your data on scratch. Is it visible on yen4?</span></summary>

**Yes.** Home, projects, and scratch are one shared file system, and every Yen node mounts
it — a file you write on yen1 is there on yen4 a moment later. The one exception is
**`/tmp`**, which is local to the node you are on: a file in `/tmp` on yen1 does not exist
on yen4.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">5</span><span class="qtext">Your very clever AI agent deleted your project folder. Can you recover it?</span></summary>

**Maybe.** Home and projects are snapshotted — hourly for a day, daily for a week,
weekly for two months, monthly for a year — and you can reach them through a hidden
`.snapshot` directory at the top level of the folder.

If the work was committed and pushed, your repository on GitHub is still safe.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">6</span><span class="qtext">You did important project work in scratch a year ago, and now it is gone. Can you get it back?</span></summary>

**No.** Scratch is not backed up — no snapshots, no trash, nothing DARC can restore — and
anything older than **90 days is deleted** at each scheduled downtime. A year on, it was
cleared out long ago, and there is nowhere to recover it from.

This is the one loss on this page that is entirely preventable, and it comes from treating
scratch as ordinary disk space because it is roomy and fast. Use it for what you can make
again — a download, an intermediate file — and copy anything that turns out to matter into
`/yen/projects/` while you still can.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">7</span><span class="qtext">Benevolent aliens accidentally land their UFO on the data center. Can you get your data back?</span></summary>

**Probably most of it, in time.** Snapshots would be no help; they live on the same file
system as your files, so they protect you from *yourself*, not from the loss of the
building. DARC does make an effort to keep a **disaster recovery copy** off the Yens, so
your work is not simply gone.

But do not plan around it. Restoring from that copy is slow, and it may not be completely
up to date — what you changed most recently is the least likely to have made it across. So
keep your own copy of anything you cannot afford to lose or wait for, **especially code**:
it is small, it changes constantly, and it is the thing that gets you working again. Pushed
to GitHub, it is already somewhere else.

</details>

{: .note }
> 🔴 **Red sticky** = I need help
>
> Put one on your laptop lid if you are stuck and an instructor will come to you.

---

## Getting Data In and Out

Which tool you use depends on where the data is coming from. You will practice the first
one below:

- **From your laptop** — `scp`. Run it *from the laptop*, in its own terminal, not from inside your SSH session.
- **From GitHub** — `git clone`, which is how the course repo gets here in Git & GitHub.

{: .tip }
> If you're unfamiliar with the command line, check out our
> [reference guide]({{ '/reference/command-line/' | relative_url }}). We include links to our
> longer self-paced course, with more detailed exercises on using command line tools.

---

## Exercise — Copy a File with scp

{: .exercise }
> Get the logo below onto your laptop, then copy it to your scratch space on the Yens with
> `scp`.

<img src="{{ '/assets/images/gsb-logo.png' | relative_url }}"
     alt="Stanford Graduate School of Business logo" width="220">

**1. Save it to your laptop.** Right-click the logo above and choose **Save Image As…** —
`~/Downloads/gsb-logo.png` is a fine place for it.

**2. Copy it to the Yens.** Run this from your **laptop**, in a terminal that is *not*
SSHed into the cluster:

```bash
scp ~/Downloads/gsb-logo.png SUNetID@yen.stanford.edu:/scratch/users/SUNetID/
```
{: .laptop }

- The form is always `scp SOURCE DESTINATION`. Here the source is local and the
  destination is `remote_host:remote_path` — an upload.
- The **trailing slash** on the destination means *"put it inside that folder."* Your
  scratch directory already exists, so that is what you want.

**3. Verify it arrived.** Back in your SSH session on the Yens:

```bash
ls -lh /scratch/users/SUNetID/gsb-logo.png
```
{: .yens }

You should see the file and its size — about 89K.

{: .note }
> 🔴 **Red sticky** = I need help

---

## Quiz — scp

Answer each one in your head, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">Can you transfer a file from the Yens to your local machine using scp?</span></summary>

**Yes** — reverse the arguments and run it from your **laptop**, naming the Yens as the
source:

```bash
scp SUNetID@yen.stanford.edu:/scratch/users/SUNetID/gsb-logo.png ~/Downloads/
```
{: .laptop }

Which direction the file moves is decided by argument order — `scp SOURCE DESTINATION` —
not by which machine you are sitting on. What the machine you run it from decides is
something else: every host you name has to be reachable *from there*.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">If you are on the Yens, will <code>scp laptop:gsb_logo.png ~/gsb_logo.png</code> work?</span></summary>

**No.**

`laptop` is not a name the Yens can look up, but substituting your machine's real name
would not save it either: your laptop has no public address and no SSH server listening,
so the Yens cannot open a connection *to* it. The reachability runs one way — your laptop
can reach `yen.stanford.edu`, and nothing out there can reach back.

So a laptop ⇄ Yens transfer is always run **from the laptop**, whichever direction you
want the file to move.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">If you have to transfer 3 TB of data to the Yens, should you use scp?</span></summary>

**No.** `scp` is a single stream with no way to resume: one dropped connection hours in and
you start the whole thing over. At terabyte scale that is a losing bet.

Use **<a href="https://rcpedia.stanford.edu/_user_guide/data_transfer/" target="_blank" rel="noopener noreferrer">Globus</a>** instead — the
Yens collection is **`GSB/DARC yen`**. RCpedia recommends it for large transfers because it
parallelizes and checkpoints, so an interrupted transfer picks up where it left off rather
than starting again.

</details>
