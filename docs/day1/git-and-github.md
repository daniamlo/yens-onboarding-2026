---
layout: default
title: "Git & GitHub for Research"
parent: "Part 1 — Setup"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 3
permalink: /day1/git-and-github/
---

# Git & GitHub for Research


Version control tracks every change you make to a project — who changed what, when, and why — so nothing is ever lost and you can roll back to any earlier state. In this course, your version history is also how you submit your work. This section sets up Git and GitHub and walks through the core workflow.

---

## Git and GitHub

**Git** is version control software that runs on your machine (or the Yens). It tracks every change you make to a project — who, what, and when — and lets you roll back to any previous state.

**GitHub** is a website that hosts git repositories in the cloud. It's where you share, back up, and submit your work.

{: .tip }
> **Type your GitHub username** and every command on these pages fills itself in, so you can
> copy and paste them without editing. It stays in this browser.
>
> <span class="personalize-field"><label class="personalize-affix" for="gh-username">github.com/</label><input id="gh-username" data-personalize="github" type="text" placeholder="username" spellcheck="false" autocapitalize="none" autocorrect="off" autocomplete="off"></span> <span class="personalize-field-status" data-personalize-status></span>

<svg viewBox="0 0 760 176" role="img" aria-labelledby="gd1-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:680px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="gd1-title">Git saves snapshots on your machine; GitHub stores them in the cloud. You push commits up to your fork and pull updates back down.</title>
  <defs>
    <marker id="gd1-ah" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e67e22"/></marker>
  </defs>
  <rect x="14" y="30" width="330" height="116" rx="14" fill="#fff8ef" stroke="#e6cfa8" stroke-width="1.5"/>
  <text x="34" y="63" font-size="15" font-weight="700" fill="#2c3e50">💻  Your machine · the Yens</text>
  <text x="34" y="92" font-size="12.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#c0561a">git add · git commit</text>
  <text x="34" y="117" font-size="12.5" fill="#6a7280">saves snapshots locally</text>
  <rect x="416" y="30" width="330" height="116" rx="14" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <g transform="translate(436,50) scale(1.05)"><path fill="#2c3e50" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></g>
  <text x="460" y="63" font-size="15" font-weight="700" fill="#2c3e50">GitHub · the cloud</text>
  <text x="436" y="92" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#33415c">YOUR_USERNAME/yens-onboarding-2026</text>
  <text x="436" y="117" font-size="12.5" fill="#6a7280">your fork — backup &amp; submission</text>
  <line x1="348" y1="76" x2="412" y2="76" stroke="#e67e22" stroke-width="2.5" marker-end="url(#gd1-ah)"/>
  <text x="380" y="66" text-anchor="middle" font-size="12.5" font-weight="600" fill="#b3611a">push</text>
  <line x1="414" y1="100" x2="350" y2="100" stroke="#e67e22" stroke-width="2.5" marker-end="url(#gd1-ah)"/>
  <text x="380" y="118" text-anchor="middle" font-size="12.5" font-weight="600" fill="#b3611a">pull</text>
</svg>

Git saves your work as **commits** — snapshots of your whole project at a moment in time, each with a short message describing what changed. Your history is a chain of these snapshots, and you can return to any earlier one at any time.

<svg viewBox="0 0 660 130" role="img" aria-labelledby="gc-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:660px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="gc-title">A commit is a snapshot of your project. Your history is a chain of commits, oldest on the left, newest on the right.</title>
  <defs>
    <marker id="gc-ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b0b8c4"/></marker>
  </defs>
  <text x="20" y="62" font-size="13" font-weight="700" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">main</text>
  <line x1="110" y1="58" x2="530" y2="58" stroke="#e0c9a6" stroke-width="3"/>
  <line x1="552" y1="58" x2="614" y2="58" stroke="#c2cad4" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#gc-ah)"/>
  <text x="612" y="44" text-anchor="end" font-size="10.5" fill="#9aa4b0">time →</text>
  <circle cx="110" cy="58" r="13" fill="#fff" stroke="#e67e22" stroke-width="3"/>
  <text x="110" y="94" text-anchor="middle" font-size="11" fill="#5b6472">init project</text>
  <circle cx="250" cy="58" r="13" fill="#fff" stroke="#e67e22" stroke-width="3"/>
  <text x="250" y="94" text-anchor="middle" font-size="11" fill="#5b6472">add cleaning scripts</text>
  <circle cx="390" cy="58" r="13" fill="#fff" stroke="#e67e22" stroke-width="3"/>
  <text x="390" y="94" text-anchor="middle" font-size="11" fill="#5b6472">add plotting scripts</text>
  <circle cx="530" cy="58" r="13" fill="#e67e22" stroke="#e67e22" stroke-width="3"/>
  <text x="530" y="94" text-anchor="middle" font-size="11" fill="#5b6472">generate paper.pdf</text>
  <text x="530" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#b3611a">latest</text>
</svg>

*Each dot is one commit — a saved snapshot. The chain runs oldest (left) to newest (right).*

A **branch** is a **git** feature that lets you build a *separate* line of commits without disturbing your main work. You branch off, commit there, and merge back when the work is ready — so a risky experiment never touches your working version.

<svg viewBox="0 0 660 200" role="img" aria-labelledby="gb-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:660px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="gb-title">A branch is a separate line of commits. You branch off main, make commits on the branch, then merge them back — main stays intact until you do.</title>
  <text x="20" y="64" font-size="13" font-weight="700" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">main</text>
  <line x1="110" y1="60" x2="580" y2="60" stroke="#c2cad4" stroke-width="3"/>
  <path d="M230,60 C275,60 288,140 330,140" fill="none" stroke="#e67e22" stroke-width="3"/>
  <line x1="330" y1="140" x2="450" y2="140" stroke="#e67e22" stroke-width="3"/>
  <path d="M450,140 C505,140 518,60 560,60" fill="none" stroke="#e67e22" stroke-width="3"/>
  <circle cx="120" cy="60" r="12" fill="#fff" stroke="#5b6472" stroke-width="3"/>
  <circle cx="230" cy="60" r="12" fill="#fff" stroke="#5b6472" stroke-width="3"/>
  <circle cx="560" cy="60" r="12" fill="#5b6472" stroke="#5b6472" stroke-width="3"/>
  <circle cx="330" cy="140" r="12" fill="#fff" stroke="#e67e22" stroke-width="3"/>
  <circle cx="450" cy="140" r="12" fill="#fff" stroke="#e67e22" stroke-width="3"/>
  <text x="230" y="38" text-anchor="middle" font-size="10.5" fill="#9aa4b0">branch off</text>
  <text x="560" y="38" text-anchor="middle" font-size="10.5" fill="#9aa4b0">merge back</text>
  <text x="390" y="172" text-anchor="middle" font-size="13" font-weight="700" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#b3611a">experiment</text>
</svg>

*You branch off `main`, make commits on `experiment`, then merge them back. `main` stays intact until you do.*

The workflow for this course:

<svg viewBox="0 0 786 392" role="img" aria-labelledby="gd2-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:680px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="gd2-title">Three steps. Step 1, fork the shared course repo to your own GitHub account. Step 2, clone your fork down to the Yens, where you work. Step 3, push your finished work back up to your fork.</title>
  <defs>
    <marker id="gd2-ah" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e67e22"/></marker>
  </defs>
  <!-- GitHub band -->
  <rect x="8" y="40" width="770" height="138" rx="16" fill="#f7f9fc" stroke="#d3ddec" stroke-width="1.5" stroke-dasharray="5 4"/>
  <g transform="translate(28,56) scale(0.82)"><path fill="#8a94a6" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></g>
  <text x="46" y="66" font-size="12" font-weight="700" letter-spacing="0.6" fill="#8a94a6">ON GITHUB · THE CLOUD</text>
  <rect x="24" y="82" width="332" height="80" rx="12" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="44" y="116" font-size="15" font-weight="700" fill="#2c3e50">Course repo</text>
  <text x="44" y="142" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">gsbdarc/yens-onboarding-2026</text>
  <rect x="430" y="82" width="332" height="80" rx="12" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="450" y="116" font-size="15" font-weight="700" fill="#2c3e50">Your fork</text>
  <text x="450" y="142" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">YOUR_USERNAME/yens-onboarding-2026</text>
  <line x1="364" y1="122" x2="424" y2="122" stroke="#e67e22" stroke-width="2.5" marker-end="url(#gd2-ah)"/>
  <text x="393" y="111" text-anchor="middle" font-size="13" font-weight="700" fill="#b3611a">① fork</text>
  <!-- Yens band -->
  <rect x="360" y="250" width="418" height="126" rx="16" fill="#fffaf2" stroke="#ecdcc0" stroke-width="1.5" stroke-dasharray="5 4"/>
  <rect x="430" y="262" width="332" height="76" rx="12" fill="#fff8ef" stroke="#e6cfa8" stroke-width="1.5"/>
  <text x="450" y="294" font-size="15" font-weight="700" fill="#2c3e50">Your working copy</text>
  <text x="450" y="320" font-size="11.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#b5561f">edit → git add → git commit</text>
  <text x="382" y="362" font-size="12" font-weight="700" letter-spacing="0.6" fill="#b09668">💻  ON THE YENS · WHERE YOU WORK</text>
  <line x1="662" y1="164" x2="662" y2="260" stroke="#e67e22" stroke-width="2.5" marker-end="url(#gd2-ah)"/>
  <text x="699" y="219" text-anchor="middle" font-size="13" font-weight="700" fill="#b3611a">② clone</text>
  <line x1="530" y1="260" x2="530" y2="164" stroke="#e67e22" stroke-width="2.5" marker-end="url(#gd2-ah)"/>
  <text x="493" y="219" text-anchor="middle" font-size="13" font-weight="700" fill="#b3611a">③ push</text>
</svg>

*Three numbered steps: **① fork** — make your own copy of the course repo on GitHub · **② clone** — download that copy to the Yens, where you actually work · **③ push** — send your finished work back up to your fork.*

Each day's challenge is submitted with a `git push` to your fork as proof of work. No push, no submission.

You've now met the two core **git** ideas — commits and branches. Two more features come from **GitHub** (the hosting side) and show up later in the course:

- **Issue** — a written note attached to the repo: a task to do, a bug you hit, a question to revisit. Issues are timestamped and searchable, so they can serve as a running log if you choose to use them that way.
- **Pull request (PR)** — a proposal to merge one branch into another. It shows exactly what changed and lets you (or a collaborator) review the changes before they become part of the main version.

Version control isn't just bookkeeping — it offers a few concrete advantages for research:

{: .tip }
> **Why version control helps research:**
> - **A readable history of what changed and why.** Every commit carries a short message. Instead of guessing what a file used to hold, you scroll its history and read *"add cleaning scripts: drop 3 duplicate rows"* right next to the exact lines that changed.
> - **No more filename soup.** You don't need `analysis_final_v2_USETHIS_edited.R` to keep track of versions. There's one `analysis.R`, and its history holds every past version with an explanation of each change. The filename says *what the file is*; the history says *how it got there*.
> - **Experiment safely on a branch.** Try a risky reanalysis without touching your working results. If it doesn't pan out, the branch is a record of what you tried rather than a mess to clean up.
> - **Project management, even if you barely write code.** GitHub's issues and pull requests aren't only for software teams — you can use issues to track to-dos, data questions, or bugs, and pull requests to review a change before it's merged into your main version.
> - **Backed up and shareable.** Every version is recoverable, and pushing to GitHub backs your work up and lets a collaborator — or your future self — pick it up.

{: .warning }
> **Caveats:**
> - **Git has a steep learning curve.** It's genuinely confusing for newcomers — expect to lean on notes, cheatsheets, and AI tools at first.
> - **GitHub is a commercial product.** It's owned by Microsoft, not a community-run open project. Convenient and widely used, but not neutral infrastructure.
> - **Neither is built for data.** Git tracks line-by-line changes in text and code, so large or binary files leave the repository slow and bloated — and GitHub enforces file-size limits on top of that. Keep data on the cluster (`/yen/projects`, `/scratch`) or in a data repository, not in your repo.

---

## Exercise — Fork, Clone and Push

Set up your copy of the course repo and make your first commit now.

{: .exercise }
> Fork the course repo, clone it to the Yens, authenticate with GitHub, create a branch, commit a file, and push it back to your fork.

**Step 1 — Fork the course repo**
{: #fork-and-clone }

A **fork** is your own copy of the course repo, living under your GitHub account. Everything you write over the next two days goes here.

1. **Fork the repo.** Go to the <a href="https://github.com/gsbdarc/yens-onboarding-2026" target="_blank" rel="noopener noreferrer">course repo on GitHub</a> and click **Fork** in the top-right corner.
2. **Turn on Issues.** Open your fork's <a href="https://github.com/YOUR_GITHUB_USERNAME/yens-onboarding-2026/settings" target="_blank" rel="noopener noreferrer">repository settings</a> and, under **Features**, tick ***Issues***. A fork starts with its issue tracker switched off, and you'll be logging issues later today.

**Step 2 — Clone to the Yens**

**Cloning** downloads your fork onto the machine you're working on — here, the Yens.

{: .note }
> **Run this on the Yens, not on your laptop.** If you are not still connected from
> [Connecting to the Yens]({{ '/day1/connect-to-the-yens/' | relative_url }}), log back in
> first — `ssh SUNetID@yen.stanford.edu` — and confirm with `hostname`, which should answer
> something like `yen1`.

```bash
cd ~
git clone https://github.com/YOUR_GITHUB_USERNAME/yens-onboarding-2026.git
cd yens-onboarding-2026
```
{: .yens }

**Step 3 — Authenticate with GitHub (one time)**

Pushing to your fork has to prove it's really you. You do that with a **Personal Access Token (PAT)** — a single-purpose password for the command line — handed to the **GitHub CLI** (`gh`) once. After that, git just works. There's no browser on the Yens, so a token is the simplest way in.

**Make one now — it takes two minutes.** If you already have a token from previous work,
have it to hand instead and skip to `gh auth login` below.

Do this in your browser, on your laptop:

1. Open this pre-filled link: **<a href="https://github.com/settings/tokens/new?scopes=repo,workflow,read:org&amp;description=yen-repo-workflow" target="_blank" rel="noopener noreferrer">Create your token</a>**. It's a **classic** token with the three scopes you need already checked — **`repo`** (push to your fork), **`workflow`** (lets you push changes to the GitHub Actions files), and **`read:org`** (lets the GitHub CLI sign you in) — and named `yen-repo-workflow`.
2. Set the **expiration** to **1 year** — long enough to reuse this token for your research work well beyond this course, with an automatic backstop if it's ever forgotten or leaked.
3. Click **Generate token**, then **copy it right away** — GitHub shows it only once.

{: .warning }
> Treat the token like a password: don't commit it, don't paste it into a file, don't share it. If it ever leaks, delete it on GitHub and make a new one.

*Give the token to `gh` — on the Yens:*

```bash
ml gh-cli           # make gh available on the Yens
gh auth login       # answer: GitHub.com → HTTPS → Authenticate Git → Yes → Paste an authentication token
gh auth setup-git   # let gh remember the token so git never asks you again
```
{: .yens }

Paste the token when `gh auth login` asks. The `gh auth setup-git` step then wires `gh` in as git's credential helper, so it hands over your token automatically on every `git push`. In the future, you can use git without needing to authenticate again.

**Check it worked — file an issue from the command line.**

```bash
gh issue create --repo YOUR_GITHUB_USERNAME/yens-onboarding-2026 \
  --title "Checkpoint: gh is authenticated" \
  --body "Filed from the Yens with the GitHub CLI."
```
{: .yens }

It prints a URL — open it and your issue is there on your fork. Two things that go wrong:

- **`Issues are disabled for this repository`** — you skipped Step 1's second item. Now that
  `gh` is authenticated you can fix it without leaving the terminal:
  `gh repo edit YOUR_GITHUB_USERNAME/yens-onboarding-2026 --enable-issues`
- **The issue lands on `gsbdarc/yens-onboarding-2026`** instead of yours — that happens if
  you drop the `--repo` flag inside a clone of a fork, because `gh` offers the parent repo
  as a target. Keep the flag and it always goes to your own copy.

<details markdown="1">
<summary>Setting up <code>gh</code> on your own laptop</summary>

You'll want `gh` on your laptop too (for the Claude Code work later). Install it, then run the same `gh auth login` and paste the **same token**:

- **macOS** (Homebrew): `brew install gh`
- **Windows** (in PowerShell — then it's usable from Git Bash too): `winget install --id GitHub.cli`
- **Linux** / other: see the <a href="https://github.com/cli/cli#installation" target="_blank" rel="noopener noreferrer">official instructions</a>

Answer **GitHub.com**, then **HTTPS**, then **Paste an authentication token**:

```bash
gh auth login
```
{: .laptop }

(On a laptop you *can* instead choose "Login with a web browser" — but the token works everywhere, so reusing it is one less thing to think about.)

</details>

**Step 4 — Create a branch**

A **branch** is a safe, separate workspace, so your experiments never disturb the main version of your work.

```bash
git checkout -b experiment
```
{: .yens }

**Step 5 — Make a change and commit**

`add` chooses which changes go into your next snapshot; `commit` saves that snapshot with a message describing what changed and why.

```bash
echo "Hello from Day 1" > my_first_commit.txt
git add my_first_commit.txt
git commit -m "Add my first commit from Day 1"
```
{: .yens }

**Step 6 — Push to your fork**

**Pushing** sends your saved snapshots up to your fork on GitHub — where they're backed up and, later, where your submitted work can be checked.

```bash
git push -u origin experiment
```
{: .yens }

{: .note }
> This pushes your **branch**, not `main`. Your work is safely on GitHub, but `main` is untouched — which is exactly the point of branching. To fold the branch into `main`, open a pull request on your fork and merge it.

{: .important }
> Save your checkpoint work with a `git push` to your fork. Come back to these steps whenever you need to save work.

{: .note }
> 🔴 **Red sticky** = I need help
>
> Put one on your laptop lid if you are stuck and an instructor will come to you.

---

## Never Commit a Password

Git's whole purpose is that nothing is ever lost. That is exactly what makes it the wrong
place for a secret: a password, API key, or token that lands in a commit stays in the
history, and if that history has been pushed it is on GitHub, in anyone's fork, and in
GitHub's caches. Deleting the file afterwards does not help — the old commit still holds it.

{: .warning }
> **A committed secret is a leaked secret.** Do not try to tidy it up first. **Revoke the
> key** — on GitHub, in the AI Playground, wherever it came from — and issue a new one. Only
> then worry about scrubbing the history, and assume someone already has the old value.

So keep secrets out of the repository from the start. The mechanism is a **`.gitignore`**: a
list of paths git should refuse to track. Write it *before* the file exists, because a
`.gitignore` added afterwards does nothing about a secret you already committed.

### Exercise — Write a `.gitignore`

{: .exercise }
> Create a `.gitignore` in your clone and commit it, so the files that hold secrets can
> never be staged by accident.

```bash
cd ~/yens-onboarding-2026
cat > .gitignore <<'EOF'
# Secrets — never tracked
.env
*.pem
*.key
EOF
git add .gitignore
git commit -m "Ignore secrets"
```
{: .yens }

Then prove it works. Make a file that looks like a leaked credential, and try to commit it
the way you would by mistake:

```bash
echo "ANTHROPIC_API_KEY=not-a-real-key" > .env
git add .env
git check-ignore -v .env
```
{: .yens }

Git should refuse the `git add`, and say so:

```
The following paths are ignored by one of your .gitignore files:
.env
hint: Use -f if you really want to add them.
```
{: .output }

Then `check-ignore` names the rule that stopped it — here, line 2 of `.gitignore`:

```
.gitignore:2:.env	.env
```
{: .output }

**Both of those are things you can see.** That matters more than it sounds: the obvious
test is to run `git status` and check that `.env` is *missing* from the list, but an empty
list looks the same whether the rule worked, you are in the wrong directory, or you never
created the file at all. With a secret, "no warning" is not the same as "safe". Here,
working is loud and broken is silent — `check-ignore` prints nothing if no rule matches,
and `git add` quietly stages the file.

(If `git add` *succeeds*, the file was already tracked before you ignored it.
`git rm --cached .env` fixes that.)

{: .note }
> The `.env` file itself comes back in [Managing API Keys]({{ '/day1/api-keys/' | relative_url }}),
> where you put a real Stanford API key in it. Ignoring it now means the key has nowhere
> dangerous to land later.

---

## Quiz

Answer each one in your head, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">You commit a file. Is it on GitHub?</span></summary>

**No.** `git commit` saves a snapshot **on the machine you are sitting at** — here, the
Yens. Nothing reaches GitHub until you `git push`. That is why the two are separate steps:
you can commit on a plane, or make ten commits and push once.

The practical consequence: work that is committed but never pushed exists in exactly one
place, and a cluster home directory is not a backup.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">You and a collaborator are working on a project and they find a bug. What should they do?</span></summary>

**Open an issue.** It puts the problem on the record where both of you can see it, rather
than in a message you will lose:

```bash
gh issue create --title "Row count drops after the 2019 merge" \
  --body "Expected 4,812 rows, got 4,796. Reproduced on a fresh clone."
```
{: .yens }

Then the fix goes on a branch, and its pull request says `Closes #12` — so the problem, the
reasoning, and the change that resolved it stay linked. Six months on, that trail is how
either of you reconstructs what happened.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">You make improvements to this course and want us to incorporate them. How?</span></summary>

**Open a pull request from your fork back to ours.** That is what a fork is for: you commit
on a branch in your own copy, push it, and then open a PR whose base is
`gsbdarc/yens-onboarding-2026` and whose head is your branch.

```bash
gh pr create --repo gsbdarc/yens-onboarding-2026 \
  --title "Fix the quota figure on Your Data on the Yens" \
  --body "RCpedia now says 80 GB, not 50 GB."
```
{: .yens }

You never need write access to our repo, but you can still propose changes using pull
requests from your own fork.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">4</span><span class="qtext">Should you write your password in analysis.py?</span></summary>

**No.** A script is code, code gets committed, and a committed secret is a leaked secret.
It is also the version that gets shared with a collaborator, pasted into a notebook, and
emailed to a co-author.

Put it in a `.env` file that `.gitignore` covers, and have the script read it from the
environment — the pattern you set up above and use for real in
[Managing API Keys]({{ '/day1/api-keys/' | relative_url }}).

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">5</span><span class="qtext">If analysis.py is in your repo and you delete it, can I still find it on GitHub?</span></summary>

**Yes.** Deleting a file is just another commit; every earlier commit still contains it, and
`git log -- analysis.py` or the file's history on GitHub brings it straight back. That is
the point of version control — and the reason a secret cannot be un-leaked by deleting the
file that held it.

Removing something from the history means **rewriting** the history, force-pushing it, and
still not reaching forks or caches other people already have. Which is why the answer to a
committed key is always: revoke it first.

</details>

---

## What You Learned

- Fork, clone, branch, commit, and push with git — version-control every project from day one
- Commit and push are different steps: a commit is local, and only `git push` puts it on GitHub
- Secrets never go in a repository — a `.gitignore` keeps them out, and a key that was committed has to be revoked, not deleted
- Issues record problems and pull requests propose changes, including back to a repo you do not own

---

*Next: set up Claude Code and learn what data it can and can't be given — see **[Working with Claude Code]({{ '/day1/claude-code/' | relative_url }})**.*
