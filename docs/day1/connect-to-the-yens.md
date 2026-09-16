---
layout: default
title: "Connecting to the Yens"
parent: "Part 1 — Setup"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 1
permalink: /day1/connect-to-the-yens/
---

# Connecting to the Yens

In this section you will log in to the Yens for the first time.

{: .important }
> All you need is a terminal: the built-in **Terminal** app on macOS, or
> <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">Git Bash</a> on Windows.
>
> If your login does not work, put up a red sticky rather than reading ahead. An account
> that was never provisioned is the one problem on this page you cannot solve on your own —
> flag it and an instructor will come to you.

{: .tip }
> **New to the terminal, or lost partway through?** Work through
> <a href="https://gsbdarc.github.io/gsb-research-computing-ai-skills/day1/command-spire/" target="_blank" rel="noopener noreferrer">the command line walkthrough</a>
> from our research computing course, at your own pace — `pwd`, `ls`, `cd`, and the
> difference between an absolute and a relative path. Nothing here depends on finishing it
> first.

---

## Why Use a Server at All?

Your laptop is fine for writing code and running small tests. But research computing regularly runs into limits that a laptop cannot handle:

| Situation | What happens on a laptop | What happens on the Yens |
|-----------|--------------------------|--------------------------|
| Dataset is 80 GB | Out of memory, script crashes | Loads fine — 250 GB–3 TB RAM per node |
| Analysis takes 12 hours | Laptop sleeps, WiFi drops, run dies | Job keeps running — always on, always connected |
| Need to run 100 jobs in parallel | One at a time, ties up your machine | Submit all 100 at once via the scheduler |
| Data is restricted (IRB, NDA) | Must stay on Stanford systems | Yens are Stanford-managed infrastructure |
| Collaborating with your PI | "Can you send me the data?" | PI already has access to `/yen/projects/` |

The Yens are available to all researchers at GSB — faculty, PhD students, pre-docs, post-docs, and research staff alike. This section is where you start using them.

{: .note }
> *"My regression on the full sample took 14 hours. My laptop died at hour 6. I lost everything. Two days later I reran it on the Yens and went to sleep. It finished while I was gone."* — PhD Student

---

## What Is a SUNet ID?

Your SUNet ID is your Stanford username — the part before `@stanford.edu`, not your full
email address. It is how every Stanford system knows who you are, and on the Yens it is
where your files live: your home directory is `/home/users/SUNetID/` and your scratch
space is `/scratch/users/SUNetID/`. It is also the username in every `ssh` command you are
about to run. (It is not your GitHub username — that one comes up in the next section.)

{: .tip }
> **Type your SUNet ID** and every command on these pages fills itself in, so you can copy
> and paste them without editing. It stays in this browser.
>
> <span class="personalize-field"><input id="sunet-id" data-personalize="sunet" type="text" placeholder="jdoe" spellcheck="false" autocapitalize="none" autocorrect="off" autocomplete="off"><label class="personalize-affix personalize-affix-end" for="sunet-id">@stanford.edu</label></span> <span class="personalize-field-status" data-personalize-status></span>

---

## What Are the Yens?

The Yens are a 17-node shared research computing cluster: 5 interactive nodes you connect to directly, and 12 nodes accessible only through the SLURM scheduler (Day 2). All 17 nodes share the same file system — a file you write on yen1 is instantly visible on every other node.

You'll connect using the `ssh` command. `ssh` opens an encrypted tunnel: you type locally, commands execute remotely, output streams back to your screen.

<svg viewBox="0 0 700 516" role="img" aria-labelledby="ssh-title" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:700px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="ssh-title">Your laptop connects over SSH to the remote Yens cluster. You land on a shared interactive Yen for light work; the powerful SLURM compute nodes are reached later, on Day 2, through a scheduler. Every node shares the same storage.</title>
  <defs>
    <marker id="ssh-ah" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e67e22"/></marker>
  </defs>

  <!-- Laptop -->
  <rect x="210" y="12" width="280" height="62" rx="12" fill="#fff8ef" stroke="#e6cfa8" stroke-width="1.5"/>
  <text x="232" y="40" font-size="15" font-weight="700" fill="#2c3e50">💻  Your laptop</text>
  <text x="232" y="59" font-size="12.5" fill="#6a7280">where you type your commands</text>

  <!-- SSH arrow -->
  <line x1="350" y1="76" x2="350" y2="115" stroke="#e67e22" stroke-width="2.5" marker-end="url(#ssh-ah)"/>
  <text x="366" y="93" font-size="13" font-weight="700" fill="#b3611a">connect with SSH</text>
  <text x="366" y="109" font-size="11.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">ssh SUNetID@yen.stanford.edu</text>

  <!-- Cluster band -->
  <rect x="16" y="118" width="668" height="384" rx="16" fill="#f7f9fc" stroke="#bcd4f2" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="38" y="142" font-size="12" font-weight="700" letter-spacing="0.6" fill="#8a94a6">☁️  THE YENS CLUSTER · REMOTE, ALWAYS ON</text>

  <!-- Interactive Yens -->
  <rect x="40" y="156" width="620" height="106" rx="12" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="60" y="184" font-size="15" font-weight="700" fill="#2c3e50">Interactive Yens — where you land today</text>
  <rect x="60" y="200" width="104" height="26" rx="6" fill="#f3f4f7" stroke="#d5d8e2" stroke-width="1"/>
  <text x="112" y="217" text-anchor="middle" font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">yen1</text>
  <rect x="176" y="200" width="104" height="26" rx="6" fill="#f3f4f7" stroke="#d5d8e2" stroke-width="1"/>
  <text x="228" y="217" text-anchor="middle" font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">yen2</text>
  <rect x="292" y="200" width="104" height="26" rx="6" fill="#f3f4f7" stroke="#d5d8e2" stroke-width="1"/>
  <text x="344" y="217" text-anchor="middle" font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">yen3</text>
  <rect x="408" y="200" width="104" height="26" rx="6" fill="#f3f4f7" stroke="#d5d8e2" stroke-width="1"/>
  <text x="460" y="217" text-anchor="middle" font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">yen4</text>
  <rect x="524" y="200" width="104" height="26" rx="6" fill="#f3f4f7" stroke="#d5d8e2" stroke-width="1"/>
  <text x="576" y="217" text-anchor="middle" font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">yen5</text>
  <text x="60" y="250" font-size="12.5" fill="#6a7280">Shared compute for light work — per-user CPU &amp; RAM limits enforced</text>

  <!-- Scheduler arrow -->
  <line x1="350" y1="262" x2="350" y2="299" stroke="#e67e22" stroke-width="2.5" marker-end="url(#ssh-ah)"/>
  <text x="366" y="286" font-size="13" font-weight="700" fill="#b3611a">via the SLURM scheduler — Day 2</text>

  <!-- SLURM compute nodes -->
  <rect x="40" y="302" width="620" height="72" rx="12" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="60" y="330" font-size="15" font-weight="700" fill="#2c3e50">SLURM compute nodes — reached on Day 2</text>
  <text x="60" y="356" font-size="11.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">8 CPU + 4 GPU nodes (12 total) · only via sbatch / srun</text>

  <!-- Shared storage -->
  <rect x="40" y="390" width="620" height="100" rx="12" fill="#f3f4f7" stroke="#d5d8e2" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="60" y="414" font-size="12" font-weight="700" letter-spacing="0.6" fill="#8a94a6">SHARED STORAGE · EVERY NODE SEES THE SAME FILES</text>
  <text x="60" y="438" font-size="11.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">/home/users/SUNetID/<tspan font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#6a7280">   personal · backed up · limited</tspan></text>
  <text x="60" y="460" font-size="11.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">/yen/projects/<tspan font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#6a7280">   project files &amp; results · backed up · large</tspan></text>
  <text x="60" y="482" font-size="11.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5b6472">/scratch/users/SUNetID/<tspan font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#6a7280">   large &amp; fast · NOT backed up</tspan></text>
</svg>

The interactive Yens are shared — per-user CPU and RAM limits are enforced automatically. See the <a href="https://rcpedia.stanford.edu/_policies/user_limits/" target="_blank" rel="noopener noreferrer">current limits</a> for details. For heavier jobs, the SLURM scheduler (Day 2) gives you dedicated compute nodes.

**What's inside a Yen server:**

![Server hardware diagram showing CPU, cores, and RAM — Yen1 has 256 cores]({{ "/assets/images/server-hardware-cpu-ram.png" | relative_url }})

The **CPU** is the processor chip. **Cores** are the individual workers inside it — each core runs instructions independently, which is what makes parallel work possible. **RAM** holds the data the CPU is actively using. The Yen servers vary in size — see the <a href="https://rcpedia.stanford.edu/_getting_started/yen-servers/#overview-of-the-yen-computing-infrastructure" target="_blank" rel="noopener noreferrer">current specs on RCPedia</a> for details.

---

## Exercise — Log In

Log in to the Yens for the first time and get your bearings.

{: .exercise }
> Connect to the Yens cluster over SSH, identify which interactive Yen you landed on, and read the login banner.

**Connect:**
```bash
ssh SUNetID@yen.stanford.edu
```
{: .laptop }

The username is your Stanford one — set your SUNet ID in the sidebar and every command on the site fills it in for you. When prompted for your password, type your Stanford password (nothing will appear — that's normal). You will be prompted for Duo two-factor authentication.

**Identify your node:**
```bash
hostname      # e.g. yen1, yen2, yen3, yen4, or yen5
whoami        # confirm you are logged in as yourself
```
{: .yens }

{: .note }
> The Yens (yen1–yen5) are shared interactive compute servers. You land on whichever one the load balancer picks. They're powerful, but shared — read the login banner when you connect, it describes current usage policies.

**Read the banner, then look around:**
```bash
ls ~                              # your home directory on the Yens
pwd                               # /home/users/SUNetID
ls /scratch/users/SUNetID         # your personal scratch — created for you automatically
ls /yen/projects/                 # shared project storage
```
{: .yens }

{: .tip }
> **Two keys that will save you the most typing.**
>
> - <kbd>↑</kbd> — the up-arrow key walks back through commands you have already run, newest first. Recall one, edit it, and press <kbd>Enter</kbd>. Retyping a long path by hand is how typos get made.
> - <kbd>Tab</kbd> — start a file or directory name and press it; the shell finishes the name for you. Press it twice to list every match when more than one fits.
>
> <kbd>Tab</kbd> is also the fastest way to check a path *before* you run something. If it refuses to complete, what you have typed so far doesn't exist — a wrong directory caught in a keystroke instead of in an error message. Try it now: type `ls /yen/pro` and press <kbd>Tab</kbd>.
>
> Both are features of the **shell**, not of the Yens, so they work the same in a terminal on your laptop.

{: .note }
> 🔴 **Red sticky** = I need help
>
> Put one on your laptop lid if you are stuck and an instructor will come to you.

---

## Bonus

**Skip the repeated logins with SSH multiplexing**

Every time you `ssh` to the Yens you re-enter your password and approve Duo again — tedious once you're opening several sessions. **SSH multiplexing** keeps one authenticated connection open and reuses it for every later session to the same host, so you authenticate just **once**.

Set it up on your **laptop** (not the Yens) by adding this to `~/.ssh/config` — create the file if it doesn't exist:

```
Host yen yen? yen??
  HostName %h.stanford.edu

Host yen yen.stanford.edu yen? yen?? yen?.stanford.edu yen??.stanford.edu
  ControlMaster auto
  ControlPersist yes
  GSSAPIDelegateCredentials yes

Host *
  ControlPath ~/.ssh/%r@%h:%p
```
{: .file }

Then try it:

1. Open your first connection as usual — `ssh SUNetID@yen.stanford.edu` — and authenticate with your password and Duo. This becomes the shared "master" connection.
2. Leave it open, and in a **second** terminal run `ssh SUNetID@yen.stanford.edu` again. It connects **instantly** — no password, no Duo — because it's reusing the first connection.

Full write-up: <a href="https://rcpedia.stanford.edu/blog/2026/03/17/ssh-setup-for-the-yen-servers/" target="_blank" rel="noopener noreferrer">SSH Setup for the Yen Servers</a> on RCpedia.
