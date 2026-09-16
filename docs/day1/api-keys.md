---
layout: default
title: "Managing API Keys"
parent: "Part 2 — Python & AI"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 4
permalink: /day1/api-keys/
---

# Managing API Keys

An API key lets your code use a service and charge requests to an account. You'll copy
the course API key into a `.env` file in your repo on the Yens, check that Git
ignores it, and load it in Python.

---

{: .important }
> **Start in your SSH terminal connected to the Yens.** A JupyterHub terminal works too.
> You'll switch to a notebook in Step 5.

## Step 1: Keep Configuration Out of Code

Avoid putting a key directly in code. This example uses a placeholder:

```python
import anthropic

client = anthropic.Anthropic(api_key="REPLACE_WITH_REAL_KEY")
```

If you replace the placeholder with a real key, anyone who receives the file receives
the key too. Deleting it later does not remove earlier copies or Git commits.

A `.env` file holds environment-variable assignments outside your program:

```text
ANTHROPIC_API_KEY=<secret value>
```
{: .file }

Your code reads the value by name when it runs. Share the code and keep the credential
file out of Git.

{: .note }
> **Three different meanings of “environment”**
>
> - **Virtual environment (`.venv/`):** A directory holding a project's Python interpreter
>   and packages. It controls which Python and libraries your code uses.
> - **Environment variable:** A named value available to a running program. For example,
>   `PATH` tells the shell where to look for commands, and `ANTHROPIC_API_KEY` holds a key
>   that the API client can read. Programs look up these values by name instead of
>   hard-coding them into their source.
> - **`.env` file:** A text file containing `NAME=value` lines. In this exercise,
>   `load_dotenv()` reads those lines and makes the values available as environment
>   variables in the running Python process.
>
> Activating `.venv` selects your Python environment. Loading `.env` supplies settings
> such as your API key. They are separate steps.

## Step 2: Check the Shared Credential File

The instructor provides the course key in a shared file on the Yens. View it in your
own terminal:

```bash
cat /scratch/shared/yens-onboarding-2026/.env
```
{: .yens }

You'll see `ANTHROPIC_API_KEY=` followed by the course key.

## Step 3: Copy It to the Repository Root

```bash
cd ~/yens-onboarding-2026
cp /scratch/shared/yens-onboarding-2026/.env .env
ls -a
```
{: .yens }

Look for `.env` in the listing. Keep this file at the repo root so the notebook below
can load it.

{: .note }
> **Files starting with a dot are hidden by default.** A plain `ls` won't show `.env`
> or `.gitignore`; use `ls -a` to include them. Hidden files still work normally, and
> being hidden does not protect their contents.

## Step 4: Check That Git Ignores It

The repo's `.gitignore` already includes `.env`. Check that the rule applies:

```bash
git check-ignore -v .env
```
{: .yens }

The command should print the matching `.gitignore` rule. You can also check how Git sees
the file:

```bash
git status --short --ignored .env
```
{: .yens }

`!! .env` means ignored.

If no ignore rule appears, add `.env` to `.gitignore` before committing your work.

## Step 5: Load It in Python

First, create the notebook folder from your Yen terminal:

```bash
cd ~/yens-onboarding-2026
mkdir -p day1
```
{: .yens }

Then open [JupyterHub](https://yen1.stanford.edu/jupyter/hub/home), or return to your
existing browser session:

1. Open **`yens-onboarding-2026/day1`** in the file browser.
2. Use the **blue "+"** Launcher button to create a **GSB AI 2026** notebook.
3. Name it **`anthropic_test.ipynb`**. You'll continue using it in the next section.
4. Run this cell with **Shift+Enter**:

```python
import os
from dotenv import load_dotenv

load_dotenv("../.env")
print("ANTHROPIC_API_KEY loaded:", bool(os.getenv("ANTHROPIC_API_KEY")))
```
{: .notebook }

Expected output: `ANTHROPIC_API_KEY loaded: True`.

This confirms that the variable has a value. It does not check whether the service
accepts the key; the next section tests that with an API call.

<details markdown="1">
<summary>Loading the key in a script</summary>

A script at the repository root can use:

```python
from dotenv import load_dotenv

load_dotenv()
```
{: .file }

`python-dotenv` reads the file and adds its settings to the current Python process's
environment. It does not change your source code or activate a virtual environment.
By default, it keeps any value already set in that process.

</details>

{: .note }
> Viewing the file in your own terminal is fine. Keep the key out of shared screenshots,
> chats, and notebook output, since notebook output is saved with the file.

## Step 6: Initialize the API Client

In the same notebook, run a new cell:

```python
import anthropic

client = anthropic.Anthropic()
```
{: .notebook }

The client reads `ANTHROPIC_API_KEY` from the environment, so you do not need to put
the key in the constructor.

Confirm that the object exists without making a paid request:

```python
print(type(client).__name__)
```
{: .notebook }

Expected output: `Anthropic`. Creating the client does not send a model request.

{: .note }
> 🟢 **Green sticky** = Git shows `!! .env`, the notebook reports `True`, and the client
> was created &nbsp;&nbsp; 🔴 **Red sticky** = I need help
>
> Put a sticky note on your laptop lid so instructors can see where you are.

Continue to the [Part 2 checkpoint: Extracting Data with an LLM]({{ '/day1/extracting-data-with-an-llm/' | relative_url }})
to make the first API call and check your setup.

### Common Errors

| Symptom | Likely cause | Check |
|---|---|---|
| `ANTHROPIC_API_KEY loaded: False` | Wrong `.env` path or missing value | In a notebook cell, run `import os; print(os.getcwd())`. This notebook belongs in the repo's `day1/` folder and loads `../.env` |
| HTTP `401` on the next section's API call | Invalid or revoked key | Ask the instructor to confirm the key. After replacing `.env`, restart the notebook kernel and rerun the setup cells |
| `.env` appears in `git status` | Ignore rule missing or file was already tracked | Stop and ask an instructor before committing |

---

## Quiz

Answer each one in your head, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">You copied <code>.env</code> into your repo, but <code>ls</code> does not show it. Did the copy fail?</span></summary>

**Not necessarily. Files starting with a dot are hidden by default.** Run `ls -a` to
include them in the listing. The leading dot does not encrypt the file or prevent other
programs from reading it.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">You activated <code>.venv</code>. Does that also load the API key from <code>.env</code>?</span></summary>

**No. They do different jobs.** `.venv/` contains your Python environment and packages.
`.env` is a text file holding settings such as `ANTHROPIC_API_KEY`. In this exercise,
`load_dotenv(...)` reads those settings into the Python process.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">Your notebook is running in <code>day1/</code>, and <code>.env</code> is at the repo root. Which path should you give <code>load_dotenv</code>?</span></summary>

**`"../.env"`.** The `..` means the parent directory, one level above `day1/`:

```python
load_dotenv("../.env")
```
{: .notebook }

You can keep one `.env` at the repo root instead of copying it into each notebook folder.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">4</span><span class="qtext">The notebook prints <code>ANTHROPIC_API_KEY loaded: True</code>. Have you confirmed that the API accepts the key?</span></summary>

**No. You have only confirmed that the variable has a value.** An invalid or revoked
key can still produce `True`. Creating the client also does not test the key with the
service. The API call in the next section checks whether the request is accepted.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">5</span><span class="qtext">How can you check that Git will normally leave your <code>.env</code> file out of commits?</span></summary>

**Check the ignore rule and the file's status:**

```bash
git check-ignore -v .env
git status --short --ignored .env
```
{: .yens }

You should see a matching `.gitignore` rule and `!! .env`. A hidden filename alone does
not make Git ignore a file. If it was already tracked, adding an ignore rule does not
remove it from tracking.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">6</span><span class="qtext">You accidentally commit a key, then delete it in the next commit. Is that enough?</span></summary>

**No. The earlier commit still contains it.** Tell the instructor or key owner so they
can replace the key. Removing it from the current file does not make the old credential
unavailable to someone who already has a copy.

</details>

---

## Skills Learned

- Keep API keys in `.env`, not in code or notebook output
- Load the key from `.env` and check that Python can find it
- Check that Git ignores `.env` before committing
- Initialize an API client using the loaded environment variable
- Ask the key owner to replace a key if it is shared accidentally
