---
layout: default
title: "Working with Claude Code"
parent: "Part 1 — Setup"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 4
permalink: /day1/claude-code/
---

# Working with Claude Code


You've set up Git and made your first commit by hand. Claude Code is a tool that can do that kind of work for you — and much more. This section covers what it is, how it works, how to get it through Stanford, and what data you can and can't give it.

---

## Meet Claude Code

In **Git & GitHub for Research** you worked through fork, clone, branch, commit, and push by hand. That was the point: you now know what each step *means*. From here on, you don't have to type it yourself.

**Claude Code** is an AI assistant that lives in your terminal: you describe what you want in plain English, and it does the work — running commands, editing files, and handling git for you.

{: .note }
> **We teach Claude Code, but we have no preference.** OpenAI's **Codex** is the other
> widely used terminal assistant, and it is on the Yens too — `ml codex`. Almost
> everything in this section is about how tools of this kind work, what they can reach,
> and what you must not feed them; that carries over. We picked one so the exercises could
> give you exact commands to follow. Use whichever you prefer, or both.

You just saw *why* keeping your work in GitHub is worth the trouble (see [Git & GitHub for Research]({{ '/day1/git-and-github/' | relative_url }})) — and those are exactly the habits Claude Code can handle for you. You will **not** memorize the commands for any of it. You say *"log this as an issue"* or *"try this on a branch,"* and Claude Code does it. Git is one of the most heavily documented tools in existence — decades of commands, error messages, and public questions and answers — so its workflow is something Claude knows cold rather than something you have to spell out. It can also read the repository's actual state as it goes, so it checks where it is instead of guessing.

**Getting access.** You don't need a personal account. Stanford runs **Claude for Education** — a secure, university-managed environment — and it's **free for everyone at Stanford**.

- **Why go through Stanford?** Your work stays under Stanford's data-governance terms. Claude Code is approved for use with Stanford data when terms and conditions allow it. Stanford's <a href="https://uit.stanford.edu/ai/genai-tool-matrix" target="_blank" rel="noopener noreferrer">GenAI tool matrix</a> has the latest on data categories and approved tools. For research, it is always preferred to use your Stanford account.
- **How to get it.** The **Standard tier is free** for all active faculty, students, postdocs, and staff with a SUNet ID. (A **Premium tier** is available if you have a PTA — a Stanford billing account your lab may hold.) Free still means you request it once, through **ServiceNow** (Stanford's IT request website) — it's a quick approval, not a purchase.

{: .note }
> Full details and the request links live at <a href="https://uit.stanford.edu/service/claude" target="_blank" rel="noopener noreferrer">uit.stanford.edu/service/claude</a> — request it there yourself; approval is quick but not instant, so start it before you need it.

---

## How Claude Code Works

A few basics worth knowing before you start.

<svg viewBox="0 0 1000 560" role="img" aria-label="How Claude Code works: on your machine you give the harness instructions and point it at your data — check before sharing. The harness acts as you (editing files, running commands, driving git, calling tools) and loops those results back to itself. It exchanges context with Claude's model on Anthropic's server, across the campus perimeter, reached via Stanford's governed route." xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:1000px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <defs>
    <marker id="ah-green" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2e8b57"/></marker>
    <marker id="ah-slate" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#556a95"/></marker>
    <marker id="ah-brown" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#b5761f"/></marker>
  </defs>

  <!-- perimeter -->
  <line x1="700" y1="40" x2="700" y2="536" stroke="#b09668" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="700" y="30" text-anchor="middle" font-size="15" font-weight="700" letter-spacing="0.5" fill="#b09668">CAMPUS PERIMETER</text>

  <!-- your machine -->
  <rect x="16" y="56" width="628" height="488" rx="18" fill="#fdf6ea" stroke="#e6cfa8" stroke-width="1.5"/>
  <text x="40" y="94" font-size="24" font-weight="700" fill="#2c3e50">💻  Your machine · the Yens</text>
  <text x="40" y="122" font-size="16" fill="#9a8a68">You direct Claude — it reads what you allow, and acts as you.</text>

  <!-- your data panel (what it reads) -->
  <rect x="32" y="142" width="300" height="262" rx="12" fill="#ffffff" stroke="#e6cfa8" stroke-width="1.25"/>
  <text x="50" y="174" font-size="19" font-weight="700" fill="#2c3e50">Your data</text>
  <text x="50" y="202" font-size="16" font-weight="700" fill="#b5761f">⚠️  Check before sharing</text>
  <circle cx="56" cy="232" r="5" fill="#37a06a"/><text x="72" y="238" font-size="16" fill="#2c3e50">Public data (e.g. SEC filings)</text>
  <circle cx="56" cy="264" r="5" fill="#37a06a"/><text x="72" y="270" font-size="16" fill="#2c3e50">Your own code &amp; scripts</text>
  <line x1="50" y1="290" x2="314" y2="290" stroke="#eee2cf" stroke-width="1"/>
  <circle cx="56" cy="318" r="5" fill="#c0392b"/><text x="72" y="324" font-size="16" fill="#7a2018">Personal info (PII)</text>
  <circle cx="56" cy="350" r="5" fill="#c0392b"/><text x="72" y="356" font-size="16" fill="#7a2018">Data under an NDA / license</text>
  <circle cx="56" cy="382" r="5" fill="#c0392b"/><text x="72" y="388" font-size="16" fill="#7a2018">Health data (PHI)</text>

  <!-- your instructions -->
  <rect x="360" y="142" width="280" height="88" rx="12" fill="#ffffff" stroke="#e6cfa8" stroke-width="1.25"/>
  <text x="500" y="180" text-anchor="middle" font-size="20" font-weight="700" fill="#2c3e50">🗨️  Your instructions</text>
  <text x="500" y="210" text-anchor="middle" font-size="15.5" fill="#7a6a48">what you ask it · your CLAUDE.md</text>

  <!-- harness -->
  <rect x="402" y="270" width="196" height="112" rx="14" fill="#fbe9cf" stroke="#dcae6a" stroke-width="1.75"/>
  <text x="500" y="318" text-anchor="middle" font-size="22" font-weight="700" fill="#2c3e50">⚙️  Claude Code</text>
  <text x="500" y="350" text-anchor="middle" font-size="16" fill="#8a6d3b">the model harness</text>

  <!-- your inputs (green): you direct it, and it reads what you allow -->
  <line x1="500" y1="230" x2="500" y2="266" stroke="#2e8b57" stroke-width="2.5" marker-end="url(#ah-green)"/>
  <text x="512" y="254" text-anchor="start" font-size="15" font-weight="700" fill="#1f6b45">you direct it</text>

  <line x1="332" y1="326" x2="398" y2="326" stroke="#2e8b57" stroke-width="2.5" marker-end="url(#ah-green)"/>
  <text x="365" y="316" text-anchor="middle" font-size="15" font-weight="700" fill="#1f6b45">reads</text>

  <!-- local acting loop (brown): acts on your machine, results return -->
  <line x1="478" y1="382" x2="478" y2="416" stroke="#b5761f" stroke-width="2.5" marker-end="url(#ah-brown)"/>
  <text x="468" y="404" text-anchor="end" font-size="15" font-weight="700" fill="#95611a">acts as you</text>
  <line x1="522" y1="416" x2="522" y2="384" stroke="#b5761f" stroke-width="2.5" marker-end="url(#ah-brown)"/>
  <text x="532" y="404" text-anchor="start" font-size="15" font-weight="700" fill="#95611a">results</text>

  <rect x="360" y="418" width="280" height="110" rx="12" fill="#fdf0d8" stroke="#e0c48a" stroke-width="1.25"/>
  <text x="500" y="450" text-anchor="middle" font-size="16.5" font-weight="700" fill="#8a5a12">On your machine, as you:</text>
  <text x="500" y="480" text-anchor="middle" font-size="15.5" fill="#6a5326">edit files · run commands</text>
  <text x="500" y="504" text-anchor="middle" font-size="15.5" fill="#6a5326">drive git · call tools</text>

  <!-- model -->
  <rect x="772" y="250" width="212" height="150" rx="16" fill="#eef5ff" stroke="#bcd4f2" stroke-width="1.5"/>
  <text x="878" y="298" text-anchor="middle" font-size="21" font-weight="700" fill="#2c3e50">🧠  Claude's model</text>
  <text x="878" y="330" text-anchor="middle" font-size="17" fill="#6a7280">Anthropic's server</text>
  <text x="878" y="362" text-anchor="middle" font-size="15" fill="#8a94a6">reached via Stanford's</text>
  <text x="878" y="382" text-anchor="middle" font-size="15" fill="#8a94a6">governed route</text>

  <!-- remote model loop (slate): harness sends context; model replies -->
  <line x1="600" y1="308" x2="768" y2="308" stroke="#556a95" stroke-width="2.5" marker-end="url(#ah-slate)"/>
  <text x="684" y="298" text-anchor="middle" font-size="15.5" font-weight="700" fill="#3f4f74" stroke="#ffffff" stroke-width="5" paint-order="stroke" stroke-linejoin="round">① sends context</text>
  <line x1="768" y1="342" x2="602" y2="342" stroke="#556a95" stroke-width="2.5" marker-end="url(#ah-slate)"/>
  <text x="684" y="362" text-anchor="middle" font-size="15.5" font-weight="700" fill="#3f4f74" stroke="#ffffff" stroke-width="5" paint-order="stroke" stroke-linejoin="round">② its next step</text>
  <text x="684" y="382" text-anchor="middle" font-size="14" fill="#8a94a6" stroke="#ffffff" stroke-width="5" paint-order="stroke" stroke-linejoin="round">loops until done</text>
</svg>

**The model and the harness — the brain and the hands.** *Claude* is the **LLM** (large language model — the AI "brain" itself): it reads, reasons, and writes. On its own, it can only talk. **Claude Code** is the *harness* around that brain — it hands Claude real tools: read your files, run commands, edit code, use git. The model is the expert; the harness is the desk, the tools, and permission to act.

### The models — and how to switch them

Claude comes as a family, trading speed for power:

| Model | Best for |
|-------|----------|
| **Opus** | The most capable — deep reasoning, hard problems |
| **Sonnet** | Balanced — great for everyday work |
| **Haiku** | Fastest and lightest — quick, simple tasks |

Switch anytime with the `/model` command. Default to a capable model; drop to a faster one when the task is small.

{: .note }
> **Fable is blocked, and that is expected.** Stanford restricts Claude Code to the three
> models above, so asking for a fourth — **Fable** — returns `Model 'fable' is restricted by
> your organization's settings` instead of switching. Fable falls outside the data-retention
> terms Stanford has agreed with Anthropic, so it is not approved for university work.
> There is nothing to configure here: the approved models are the ones already listed.

### Permission modes — how much Claude does before asking

How much Claude checks in before acting is up to you. The **permission mode** sets that — from asking before every single edit to running on its own — so it is worth knowing which one you are in. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> to cycle through the modes (the current one shows at the bottom of the screen, e.g. `⏸ plan mode on`, `⏵⏵ accept edits on`):

- **Manual** (the default): Claude reads freely, but asks before it edits a file or runs a command. Safest, and a good place to start — with two exceptions worth knowing: commands it classes as read-only run without asking, and once you answer **"Yes, and don't ask again,"** that approval is remembered. For an edit that lasts the rest of the session; for a command it is saved to the repository and applies in future sessions too.
- **Accept edits:** Claude applies its file edits (and common file commands like creating folders) without asking each time, but still stops before running other commands. Good once you trust the direction and don't want to approve every edit.
- **Plan:** Claude investigates and writes up a plan but changes *nothing* — no edits, no commands that alter anything — until you approve. Perfect when you want to see the approach first.
- **Auto:** Claude does everything on its own — editing files and running commands as it goes — with background safety checks that block the riskiest actions. Fastest, but least oversight: it reduces prompts, it doesn't guarantee safety, so use it only when you trust the task.

{: .note }
> **This is why manual mode sometimes acts without asking you.** Saved approvals accumulate,
> so a command you allowed last week runs silently this week. Type `/permissions` to see
> every rule currently in force and remove any you did not mean to keep.

*Start in manual to stay in control; use plan mode when you want a proposal first; move to accept-edits or auto once you trust where it's headed.*

### Tokens — how Claude reads, and what it costs

Claude doesn't read letter by letter or word by word — it reads in **tokens**. A token is a chunk of text: very roughly **¾ of a word**, or about **4 characters**. "Repository" is a couple of tokens; a full page of prose is around 500.

Everything is counted this way — the text you send *and* the text Claude sends back. Tokens matter for two reasons: they are **how much Claude can hold at once** (see *Context*, next), and they are **how paid AI services charge** — a fixed price per token.

*Type `/cost` any time to see how many tokens the current session has used.*

{: .important }
> **Run out of usage and you wait — you can't pay for more.** Stanford gives you Claude on a **managed plan with a usage limit**, not the pay-per-token billing a personal account would have. When you use up your allowance, Claude Code **pauses until your limit resets after a set time** — there is no "just charge me for more tokens" button. To make your usage last: switch to a lighter model with `/model` (Haiku and Sonnet cost far less than Opus), keep each session to one focused task, and use `/clear` or `/compact` so you're not re-sending a large context every turn.

### Context — Claude's working memory, and when to clear it

The **context** (or *context window*) is everything Claude can see right now: your conversation, any files it has read, and its own replies so far. It's measured in tokens — large, but not infinite.

A long session slowly fills the window. When it's full, or when the conversation has drifted far from the task at hand, the fix is to **start fresh**: `/clear` wipes the slate so the next question gets Claude's full attention. `/context` shows how full the window currently is.

If you're filling up but *don't* want to lose the thread, **`/compact`** is the middle ground: it replaces the long back-and-forth with a short summary, freeing room while keeping what matters. Use `/compact` to keep going on the same task; use `/clear` when you're moving on to a new one.

*Rule of thumb: one focused task per conversation. A clean context beats a cluttered one every time.*

### Memory — the notebook Claude keeps

Context is erased the moment you `/clear` or close the terminal. **Memory** is what survives — and it comes in two forms:

- **A `CLAUDE.md` file in your project.** A plain-text note you commit alongside your code, telling Claude how *this* project works — where the data lives, how to run things, conventions to follow. Every future session (yours or a collaborator's) reads the same file, which makes your project easier to pick back up and to reproduce.
- **Personal memory across sessions** — facts about you and how you like to work, remembered from one sitting to the next.

*To save something to memory, just ask — tell Claude "remember that…" and it stores the note. Use the `/memory` command to review or edit what's saved, or open `CLAUDE.md` directly. Because `CLAUDE.md` is just a file in your repo, it's version-controlled like everything else you commit.*

### Skills — standing instructions for how your group works

A **skill** is a reusable set of instructions that Claude Code pulls in whenever it's relevant — so it follows your group's way of doing things without being told each time. If *memory* is a set of facts, a *skill* is a way of working.

Skills can come from Stanford, from your lab, or ones you write yourself. This course ships one — **github-for-research** — which you'll install just below, and you'll see exactly where it lands on disk.

### MCP servers — new tools, not new instructions

A skill changes *how* Claude works. An **MCP server** changes *what it can reach*.

Out of the box the harness hands Claude a fixed set of tools: read a file, run a command, edit code, drive git. An MCP server adds tools beyond that set — a database it can query, an internal API, a service like GitHub or Zotero. **MCP** is the *Model Context Protocol*, an open standard for describing a tool once so that any assistant speaking the protocol can use it; it is not Anthropic-only, which is why the same server works in other editors and agents too. Type `/mcp` to see what a session has connected.

This is the piece worth filing away for later. If your group has a data source everyone reaches with their own half-remembered script — an admin database, a licensed feed, a lab instrument's API — wrapping it in an MCP server *once* lets Claude query it the same way for everyone, instead of each person re-explaining it every time. Writing one is a normal programming job: you describe each tool, its inputs, and what it returns.

{: .warning }
> An MCP server is a route your data travels along, and the tools it exposes run with your access — same as everything else on this page. A server that can reach restricted data can hand it to the model as easily as a file you opened yourself, so connecting one is a decision about data governance, not just convenience.

### Plugins — how a skill or a tool gets shared

A skill is a folder of instructions. An MCP server is a set of tools. A **plugin** is the box you ship either one in: a single directory that can hold skills, MCP servers, [hooks]({{ '/reference/llm-failure-modes/' | relative_url }}), and purpose-built subagents, versioned together so people get a known-good set rather than a pile of files to copy.

Type `/plugin` to browse what's available and install one; the browser shows you what a plugin would add and what it costs you in context before you commit to it.

{: .note }
> **Trust a plugin the way you'd trust a script.** A plugin can run code on your machine with your access, so installing one from an unknown source is the same bet as running a stranger's shell script. Stick to plugins from Anthropic, from Stanford, or from your own group.

---

## Data Governance and Security

Before you point Claude Code at real work, keep two things straight: **what data leaves your machine**, and the fact that **it acts with your full access**.

### What leaves your machine — and what must not

As the diagram above shows, the harness stays on your machine, but the model runs on Anthropic's server — so **everything the harness sends the model leaves your machine and travels to that server.**

Claude Code does **not** sort safe data from sensitive. It sends whatever you let it read — if you point it at a file full of names, those names go to the server. Nothing keeps personal, restricted, or health data local on its own. **Holding that data back is *your* job** — by not letting Claude read it in the first place.

**Deciding what Claude Code may read is your responsibility.** Public data and your own code are fine; personal (PII), NDA/licensed, or health (PHI) data must not be sent — and the tool won't hold them back for you. What's approved depends on the data and the tool: see <a href="https://uit.stanford.edu/security/responsibleai" target="_blank" rel="noopener noreferrer">Responsible AI at Stanford</a> for which AI tools are cleared for which data-risk levels, and the <a href="https://www.gsb.stanford.edu/library/research-resources/usage-policy" target="_blank" rel="noopener noreferrer">GSB Library's eResources usage policy</a> for whether a licensed dataset may be used this way. We map out these data categories in full later this morning, in [AI Services & Data Privacy]({{ '/day1/stanford-ai-services/' | relative_url }}).

### Claude Code acts as you

When Claude Code runs a command, edits a file, or pushes to GitHub, it does so with **your** credentials and **your** permissions. To the Yens, to GitHub, to anything it touches, the action looks exactly like *you* did it — there is no way for those systems to tell you apart from Claude acting on your behalf.

That has a blunt consequence: **Claude Code can do anything you can do.** It can read, change, or delete any file you can, run any command you could run, and reach any system your account can reach. You can *ask* it to steer clear of something — "don't touch the `data/` folder," "never force-push" — and it will try, but that's a request, not a boundary the system enforces.

{: .warning }
> Treat it like handing your keyboard to a fast, capable assistant. Use **plan mode** when you want to see the plan before anything happens, review actions that are hard to undo (deleting files, force-pushing, sending data off your machine), and don't point it at anything you wouldn't do yourself.

---

# Hands-On

Everything above is reading; everything below is on the keyboard. Budget about **20
minutes**, and work through it in order — each step assumes the one before it. If you are
running short, [Take Claude Code for a Spin](#exercise--take-claude-code-for-a-spin) and
[The github-for-research Skill](#the-github-for-research-skill) are the two that Part 2
and the checkpoint actually need.

## Exercise — Take Claude Code for a Spin

{: .exercise }
> **Do this now.** On the Yens, load Claude Code, sign in through Stanford, and give it a first real task. This is the one Claude Code step everyone should complete.

You've been working on the Yens all along — Claude Code runs there too. Connect the way you did in [Connecting to the Yens]({{ '/day1/connect-to-the-yens/' | relative_url }}) if you're not already on:

```bash
ssh SUNetID@yen.stanford.edu
```
{: .laptop }

**1 — Load Claude Code.** It's available as a module on the Yens, just like `gh` and `python`:

```bash
ml claude-code
```
{: .yens }

**2 — Make a working folder and launch it from there.** Create a `cctest` directory in your home directory, move into it, and start Claude Code:

```bash
mkdir -p ~/cctest
cd ~/cctest
claude
```
{: .yens }

**3 — Sign in.** The first launch asks you to log in, and there is no browser on the Yens —
so the flow runs across both machines:

1. Claude Code asks you to **select a login method**. Choose **1 — Claude account with
   subscription**. The other two are for paying by API usage or through Bedrock, Foundry or
   Vertex; neither is how Stanford's plan works.

   ```
   Select login method:

   ❯ 1. Claude account with subscription · Pro, Max, Team, or Enterprise
     2. Anthropic Console account · API usage billing
     3. 3rd-party platform · Amazon Bedrock, Microsoft Foundry, or Vertex AI
   ```
   {: .output }

2. It tries to open a browser, cannot — there isn't one — and prints a long URL instead:
   `Browser didn't open? Use the url below to sign in (c to copy)`. Press <kbd>c</kbd> to
   copy it, or select it by hand, then open it in the browser **on your laptop**.
3. The Claude login page offers **Continue with Google**, **Continue with email**, and
   **Continue with SSO**. Use **Continue with SSO** with your Stanford address, so you land
   on Stanford's own login — SUNet ID and Duo. Do not sign in with a personal Claude
   account: it is not covered by Stanford's terms, and the usage would not come out of
   Stanford's allowance.
4. Claude Code then asks to connect to your account, listing what it will be allowed to do —
   read your profile, count usage against your subscription, see your Claude Code sessions,
   manage connectors, upload files. Click **Authorize**.
5. The browser hands back a **code** rather than returning you to the terminal, because
   nothing on your laptop can reach a callback server running on the Yens. Copy it and paste
   it at the terminal's `Paste code here if prompted` prompt. The characters come out as
   `*`, which is normal — the paste did land.

{: .note }
> **Once per account, not once per node.** The credential is written to
> `~/.claude/.credentials.json` in your home directory, which every Yen shares — so logging
> in on yen1 also logs you in on yen4. Type `/status` to see which account a session is
> using, and `/logout` to sign out.

**4 — Learn two controls.** Try each once:

- Type `/cost` — see how many tokens this session has used (the *Tokens* box explains why this matters).
- Press <kbd>Shift</kbd>+<kbd>Tab</kbd> — cycle through the permission modes: manual, accept edits, plan, and auto (see *Permission modes* above).

**5 — Give it a real task.** No need to download anything yourself — just point Claude at a file on GitHub and say what you want:

```
> Download https://raw.githubusercontent.com/gsbdarc/yens-onboarding-2026/main/data/aws_links.csv and tell me how many SEC filings it lists, then show me the five accession numbers that sort last.
```
{: .claude }

Claude fetches the file, works out its shape, counts the rows, and answers. Notice what you *didn't* do: no `curl`, no `wc -l`, no `sort` or `tail`, no worrying about the header row — you said what you wanted, and it worked out how. That's the shift Claude Code represents.

**6 — Quit, and move to your project.** Leave Claude Code by typing `/exit` (or pressing <kbd>Ctrl</kbd>+<kbd>D</kbd>). The next section sets things up inside your course repo, so move there now:

```bash
cd ~/yens-onboarding-2026
```
{: .yens }

{: .note }
> 🔴 **Red sticky** = I need help
>
> Put one on your laptop lid if you are stuck and an instructor will come to you.

---

## The github-for-research Skill

You just met skills in the abstract; here's the one this course ships. **github-for-research** teaches Claude Code some opinionated, but informed, best practices about how to use GitHub as part of a research project at the GSB:

- Do new work on a **branch**, never straight on `main`.
- **Log problems as issues** — even ones you fix immediately.
- **Never quietly change raw data**; always validate processed data.
- **Credit Claude** on every commit, and keep the environment **reproducible**.

Install it like this:

```bash
bash scripts/install_github_for_research_skill.sh
```
{: .yens }

{: .note }
> This is a one-time setup. Not sure if it's already installed? Just ask Claude Code — `> do you have the github-for-research skill?` — or run the command again; it's safe to re-run. The skill's home is `gsbdarc/claude-skill-github-for-research`.

<details markdown="1">
<summary>See it for yourself — Claude lives in hidden files</summary>

Look at the last thing the installer printed:

```
Skill installed at: /home/users/SUNetID/.claude/skills/github-for-research
```
{: .output }

That `.claude` is a **dotfile** — a name starting with a dot, which a plain `ls` won't show you. It's where Claude Code keeps its settings, skills, and memory. Go and look:

```bash
ls -a ~
ls ~/.claude
ls ~/.claude/skills
```
{: .yens }

The first reveals the hidden `.claude` folder among the other dotfiles; the second shows settings, skills, and memory; the third shows the skill you just installed, sitting there as an ordinary folder. Open one up — `cat ~/.claude/skills/github-for-research/SKILL.md` is the very text Claude will follow. Nothing here is magic: it's plain text in hidden files, readable and editable like anything else you've touched today.

</details>

{: .note }
> 🔴 **Red sticky** = I need help
>
> Put one on your laptop lid if you are stuck and an instructor will come to you.


### Bonus — investigate a well-kept repo

A repository that follows these practices is one you can actually *understand* — by hand or with Claude Code. Try both on a real Stanford project: an analysis of whether San Francisco's graffiti 311 reports fell during COVID.

<details markdown="1">
<summary>Show steps</summary>

**By hand.** Open <a href="https://github.com/gsbdarc/sf311" target="_blank" rel="noopener noreferrer">gsbdarc/sf311</a> on GitHub and try to answer, just by clicking around:

- What research question does this project answer? (Start with the README.)
- How was the raw data cleaned, and where is that checked?
- What's left to do? (Check the **Issues** tab and the commit history.)

Notice how much you can piece together *because* the repo is organized and documented — and how long it takes.

**With Claude Code.** Now let Claude do the reading. This is someone else's project, not your coursework, so clone it into the scratch folder you made earlier rather than dropping it into your course repo:

```bash
cd ~/cctest
git clone https://github.com/gsbdarc/sf311.git
cd sf311
claude
```
{: .yens }

Now ask the same things in plain English — and notice the first sentence:

```
> Use the github-for-research skill. What research question does this project answer? How was the raw 311 data cleaned and where is that checked? Walk me through reproducing the main finding, and list anything left to do.
```
{: .claude }

{: .important }
> **Name the skill.** A skill isn't guaranteed to kick in on its own — Claude decides whether it looks relevant, and often it just answers the question without it. Saying *"Use the github-for-research skill"* removes the guesswork. Get in the habit: when you want the research practices applied, ask for them by name. You'll do it again in the next exercise.

{: .tip }
> Claude reads the README, the scripts, and the issue history and answers in seconds — but only *because* someone kept the repo the way this skill describes. Good practice is what makes a project answerable, by a person or by Claude.

**Quit Claude Code** with `/exit` when you're done reading.


</details>

---

## Bonus — Put Claude Code to Work

{: .important }
> **Bonus:** Publish your own copy of this site from your fork, then have Claude Code make a real change to it and open a pull request. Both walk the same loop a pro uses: plan, approve, act, review.

This is extra practice. Publishing a site is not required for the Day 1 checkpoints.

<details markdown="1">
<summary>Publish your own copy of the site</summary>

Your fork already contains everything needed to publish this site, including the GitHub Actions workflow at `.github/workflows/pages.yml` that builds it. What it doesn't have is the switch turned on: GitHub leaves Actions and Pages off on a new fork until someone asks for them.

You could click through the settings pages yourself. Instead let Claude do it — in **plan mode**, so you see what it intends before anything gets switched on. You have no particular reason to trust its first guess about how this site is wired together, and plan mode is how you find out cheaply.

Go back to your course repo and launch Claude:

```bash
cd ~/yens-onboarding-2026
claude
```
{: .yens }

Press <kbd>Shift</kbd>+<kbd>Tab</kbd> until the mode line reads **plan mode**, then ask:

```
> Publish this site publicly from my fork with GitHub Pages. The workflow that builds it is already in this repo. Work out what has to be enabled and how to trigger the first deploy using the gh CLI, and show me the plan before changing anything.
```
{: .claude }

Claude reads `pages.yml`, works out that the site builds from `docs/` and deploys through Actions, and comes back with a plan — having run nothing. Read it. You should recognize the shape of what it proposes, even if you would not have written the commands yourself:

```bash
gh api -X PUT repos/YOUR_GITHUB_USERNAME/yens-onboarding-2026/actions/permissions -F enabled=true
gh api -X POST repos/YOUR_GITHUB_USERNAME/yens-onboarding-2026/pages -f build_type=workflow -f 'source[branch]=main'
gh workflow run pages.yml
gh run list --workflow pages.yml --limit 1
```
{: .yens }

That is `gh` doing something you have not used it for yet. Until now it has been a git convenience — cloning a repo, opening a pull request. Here it is a client for GitHub's whole REST API: `gh api` will call any endpoint GitHub exposes, authenticated as you. That is why Claude can change a repository's settings from the Yens with no browser anywhere in the loop.

Approve the plan and let it run. When the workflow finishes, your copy is live:

**`https://YOUR_GITHUB_USERNAME.github.io/yens-onboarding-2026/`**

{: .note }
> **If the workflow never starts**, GitHub is waiting on a human. Open the **Actions** tab on your fork in a browser, click **I understand my workflows, go ahead and enable them**, and run `gh workflow run pages.yml` again. GitHub keeps a hand on this one deliberately: a fork arrives carrying workflow code its new owner has never read.

**Quit Claude Code** with `/exit` — the next bonus starts fresh.

</details>

<details markdown="1">
<summary>Add a dark-mode toggle — plan, review, merge</summary>

Your fork is live now, and that raises the stakes in a useful way: anything that lands on `main` rebuilds and redeploys a public site. So here is a real change, handled the way a pro would — add a **dark-mode toggle**, a control readers can click to switch between light and dark that remembers their choice.

1. **Plan before acting.** From your repo, start `claude` again and press <kbd>Shift</kbd>+<kbd>Tab</kbd> to enter **plan mode**, then ask:
   ```
   > Use the github-for-research skill. Propose a plan to add a dark-mode toggle to the site — a control readers can click to switch between light and dark that remembers their choice. You don't have to be thorough, it's a proof of concept.
   ```
   {: .claude }

   Claude investigates and shows a plan **without changing anything**. Read it; refine it if you want. Two things in that prompt are doing real work:

   - **"Use the github-for-research skill"** — name it, the same habit as the last exercise. Without it Claude will happily commit straight to `main` and skip the branch and the pull request entirely. On a site that now deploys, straight to `main` means straight to published.
   - **"You don't have to be thorough, it's a proof of concept"** — left to itself, Claude will go hunting for every color on the site and spend five minutes doing it. Scoping a task like this is one of the most useful things you can say to an AI assistant.
2. **Approve, implement, and open a PR.** Approve the plan, let Claude make the changes, and have it open a pull request.
3. **Read the diff, then merge.** When Claude opens the PR it prints a link — follow it and open the **Files changed** tab. Reviewing that diff *is* the review, and it is how you confirm Claude did what you asked and nothing more. Then merge it, whichever way you like:

   - **In the browser** — open the PR and click **Merge pull request**, then **Confirm merge**.
   - **In the terminal** — from your repo, `gh pr merge --merge`.
   - **Ask Claude** — `> merge that pull request`.

   Merging runs the Pages workflow again, and a minute later the toggle is live on your public copy.

{: .note }
> Look at what it did: the work went on a **branch**, opened as a **pull request**, and the commit **credits Claude** — the good habits happened automatically, because you asked for the github-for-research skill.

{: .tip }
> This is the everyday Claude Code loop for anything non-trivial: **plan → approve → act → review.** Plan mode is your safety net — Claude does its looking around *inside* the plan, and you see exactly what it intends before a single file changes. And reading the diff before you merge is the habit worth taking away: an agent that edits ten files when you expected one is no disaster if you looked first.

</details>

---

## What You Learned

- How Claude Code works — model vs. harness, models, modes, tokens, context, memory, skills
- What an MCP server and a plugin each add — new tools, and the box a group ships them in
- What a token is, and why context and cost are both measured in tokens
- What leaves your machine on an AI call — and why sensitive data can't go to an external LLM
- How to get Claude through Stanford's managed service
- Install Claude Code and run your first task on real data — in plain English, no commands to memorize
- Publish your own copy of the site from your fork — planned in plan mode first, with `gh api` doing the settings changes
- Have Claude Code make a real change and open a pull request — reviewing the diff, and using plan mode before it acts
- Interrogate a real research repo with Claude Code
