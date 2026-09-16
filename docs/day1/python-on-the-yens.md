---
layout: default
title: "Running Python on the Yens"
parent: "Part 2 — Python & AI"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 1
permalink: /day1/python-on-the-yens/
---

# Running Python on the Yens

In this section, you'll check which Python version you're using and run Python three ways: in the interactive interpreter, in a JupyterHub notebook, and as a script. You'll also learn how `$PATH` and modules control which Python runs on the Yens.

---

## Exercise: Find Your Python

{: .important }
> **In this section:** Find Python with `$PATH`, run code in JupyterHub, and use Claude Code to edit a plot.

---

## Review

Before opening any notebooks, confirm you're on the Yens.

```bash
ssh SUNetID@yen.stanford.edu
```
{: .laptop }

Once connected:

```bash
hostname          # which Yen did you land on?
ls                # do you see the repo you cloned?
module avail      # Remember these?
```
{: .yens }

You should see your home directory and the `yens-onboarding-2026` folder you cloned earlier this morning.

---

## Step 1: Who and Where Are You?

Get your bearings first:

```bash
whoami                     # who am I logged in as?
pwd                        # where am I?
echo $PATH | tr ':' '\n'   # what is on your $PATH? (one entry per line)
```
{: .yens }

`pwd` should show your home directory, `/home/users/SUNetID`. If you're somewhere else, run `cd` on its own to return home before continuing.

### Step Into the Repo First

Your current directory determines where relative file paths point and where files are saved. Move into the repo you cloned earlier so the commands below use the right folder:

```bash
cd ~/yens-onboarding-2026
pwd    # confirm: /home/users/SUNetID/yens-onboarding-2026
```
{: .yens }

{: .important }
> **Relative paths are relative to where you are standing.** Nearly every command
> in this course is written relative to the repo root, such as `python scripts/…` and
> `sbatch slurm/…`. Run one from somewhere else and the shell looks in the wrong
> folder and reports `No such file or directory`. Check that you are
> in the repo root before trying again.
>
> When a file or command "doesn't exist," `pwd` is the first thing to check.

`$PATH` lists the directories the shell searches for commands. It looks something like this:

```text
/home/users/SUNetID/.local/bin      # your SUNetID goes here
/usr/local/sbin
/usr/local/bin
/usr/bin
...
/zfs/tools/darc/bin
```
{: .output }

When you type a command, the shell walks these directories top to bottom and runs the **first** matching executable it finds.

{: .exercise }
> **Bonus:** Using what you just learned, find `python3`.

<details> <summary>💡 Hint: find Python</summary>

Run <code>which python3</code> and look at the front of your `$PATH`.
</details>

So typing `python3` checks `.local/bin/python3`, then `/usr/local/sbin/python3`, and so on, stopping at the first hit.

### Loading a Module Changes Your `$PATH`

```bash
module load python
echo $PATH | tr ':' '\n'
```
{: .yens }

The module adds a directory to the **front** of the list:

```text
/software/free/python/3.10.5/bin
```
{: .output }

Run `which python3` again. It should now point to Python in the module's directory.


### Unload a Module

Unload the module to remove its directory from `$PATH`:

```bash
module unload python        # or: module purge  (unloads everything at once)
echo $PATH | tr ':' '\n'    # the python module's bin/ is gone from the front
which python3               # back to the system python3 again
```
{: .yens }

{: .note }
> 💡 This load / unload of `$PATH` is the exact same mechanism you'll meet in [Python Environments]({{ '/day1/python-environments/' | relative_url }}): **activating** an environment prepends a directory to the front of your PATH, and **deactivating** removes it.

---

## Step 2: Running Standalone Python Code

You do not need a file to run Python. The **interactive interpreter** lets you type code straight into the terminal and run it immediately, one line at a time.

Still in your repo folder from Step 1 (check with `pwd` if you're unsure), start Python:

```bash
python3
```
{: .yens }

The prompt changes to `>>>`. You are now *inside* Python. Type (or paste) this code:

```python
import matplotlib.pyplot as plt   # plotting library
import numpy as np                # scientific computing library

fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
ax.set_title("My First Plot")
ax.set_xlabel("x")
ax.set_ylabel("y")
plt.show()
fig.savefig("my_plot.png", dpi=300, bbox_inches="tight")
plt.close(fig)
```

When you are done, leave the interpreter and return to the shell:

```python
exit()
```

{: .note }
> 💡 `plt.show()` would normally pop open a window, but a terminal has no screen to draw on, so nothing appears. That is why we also call `fig.savefig(...)`: it writes the plot to `my_plot.png` in your current directory.

<details> <summary>💡 Help with ModuleNotFoundError</summary>

Leave Python with <code>exit()</code>, run <code>pip install matplotlib numpy</code> in the same environment, then start <code>python3</code> again.
</details>

### Look at What You Made

Back at the normal shell prompt:

```bash
pwd               # where am I? this is where the file was written
ls                # you should now see my_plot.png
cat my_plot.png   # try to "read" the image
```
{: .yens }

`savefig` wrote `my_plot.png` into your current directory. Since you started Python from the repo, the image should be there too. If you started from your home directory, look there instead.

`cat` prints something like:

```text
�PNG
IHDR....IDATx...��KѐP....
```
{: .output }
A PNG is a binary image file, so `cat` cannot display it as readable text. Open it in JupyterHub to see the plot.

{: .note }
> 🟢 **Green sticky** = the plotting code ran in the interpreter and `ls` shows `my_plot.png` in my repo folder &nbsp;&nbsp; 🔴 **Red sticky** = I got a `ModuleNotFoundError`, or no `my_plot.png` appeared
>
> Put a sticky note on your laptop lid so instructors can see where you are.

## Step 3: Open JupyterHub

JupyterHub is the development environment we offer on the Yens. It runs in your browser, but your code executes on the cluster's hardware, not your laptop. Instead of the bare command line from Step 2, you get an interactive workspace: write and run code in notebooks, edit files, open a terminal, and see plots and tables right on the screen.

Choose any node to log in:

| Node | URL |
|------|-----|
| Yen1 | [yen1.stanford.edu/jupyter/hub/home](https://yen1.stanford.edu/jupyter/hub/home) |
| Yen2 | [yen2.stanford.edu/jupyter/hub/home](https://yen2.stanford.edu/jupyter/hub/home) |
| Yen3 | [yen3.stanford.edu/jupyter/hub/home](https://yen3.stanford.edu/jupyter/hub/home) |
| Yen4 | [yen4.stanford.edu/jupyter/hub/home](https://yen4.stanford.edu/jupyter/hub/home) |
| Yen5 | [yen5.stanford.edu/jupyter/hub/home](https://yen5.stanford.edu/jupyter/hub/home) |

Log in with your SUNetID credentials. The file browser on the left starts in your home directory on the Yens, showing the same files you'd see from `ls` in a terminal. Double-click into **`yens-onboarding-2026`** and you'll find the `my_plot.png` you just made. JupyterHub and your SSH session access the same files.

{: .note }
> 🟢 **Green sticky** = I'm logged in to JupyterHub and I can see `my_plot.png` in my repo folder &nbsp;&nbsp; 🔴 **Red sticky** = I need help
>
> Put a sticky note on your laptop lid so instructors can see where you are.

---

## Step 4: Start a Notebook and a Terminal

- Click the **blue "+"** to open the Launcher
- Start a **Python 3** notebook
- Open a **Terminal** tab as well

A **notebook** runs code in *cells* you execute one at a time, with the results (text, tables, even images) appearing right below each cell. The **Terminal** is a shell similar to the one you used in Step 2, though not identical. You will explore that difference in [Python Environments]({{ '/day1/python-environments/' | relative_url }}). You'll switch between the two throughout today.

---

## Step 5: Run a Cell

Blocks labeled **Jupyter Notebook Cell** go in a notebook code cell. Blocks labeled
**Yen Terminal** go at the shell prompt, including when you use JupyterHub's Terminal tab.

Type this into the first cell and run it with **Shift+Enter**:

```python
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))
```
{: .notebook }

Expected output: `15`

Now run the plotting code from Step 2 in a new cell:

```python
import matplotlib.pyplot as plt   # plotting library
import numpy as np                # scientific computing library

fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
ax.set_title("My First Plot")
ax.set_xlabel("x")
ax.set_ylabel("y")
plt.show()
```
{: .notebook }

The graph appears **right below the cell**. In a notebook, `plt.show()` displays the plot inline.

{: .note }
> 💡 In a notebook you don't even need `fig.savefig(...)` just to *see* a plot. You still save it when you want a file to keep, share, or hand to the cluster.

---

## Step 6: Run the Same Code as a Script

You have now run Python two ways: the interactive interpreter (Step 2) and a notebook (Step 5). The third way is a **script**, a `.py` file that runs start to finish on its own. This is what you submit to the cluster.

1. In the Launcher, open a **Text File** (or run `nano plotting_code.py` in the Terminal) and name it `plotting_code.py`.
2. Paste in the plotting code from Step 2, keeping the `fig.savefig("my_plot.png", ...)` and `plt.close(fig)` lines so it writes the image to a file.
3. Run it from the Terminal:

```bash
python3 plotting_code.py
```
{: .yens }

The script creates the same plot. Notebooks are useful for exploration; scripts let you run the full sequence as a cluster job. For the rest of the course, you will write scripts.

---

## Bonus
{: .note }
> Finished early? Try any of these.

**Bonus 1: Open the Saved Plot**

In JupyterHub's **file browser**, find `my_plot.png` and **double-click** it to open the image viewer.


**Bonus 2: Edit the Plot**

Edit the plotting cell in your notebook, then run it again with **Shift+Enter**:

- Plot a second line, e.g. `ax.plot([1, 2, 3, 4], [2, 3, 1, 4], label="second run")`
- Give each line a `label=...` and add `ax.legend()` to name them
- Change a line's color with `color="crimson"` (or `"teal"`, `"goldenrod"`)

**Try editing the plot with Claude Code.** First save your notebook into your repo folder with a name you'll recognize (**File → Save Notebook As…**, e.g. `yens-onboarding-2026/plotting.ipynb`). Then open a **Terminal** in JupyterHub and start Claude Code as you did in [Working with Claude Code]({{ '/day1/claude-code/' | relative_url }}):

```bash
cd ~/yens-onboarding-2026   # the folder holding your notebook
ml claude-code
claude
```
{: .yens }

Start Claude Code from the repo folder so it has the notebook in its working directory.

Describe the changes you want to make to the plot.

<details markdown="1">
<summary>💡 Example prompt for Claude</summary>

For example:

> Edit the plot in plotting.ipynb to use bold colors, several lines, a title, annotations, and gridlines. Save the notebook so I can run it again.

</details>

{: .tip }
> **Check the permission mode and model** covered in [Working with Claude Code]({{ '/day1/claude-code/' | relative_url }}).
>
> **Permission mode** (`Shift+Tab` cycles it; the current one shows at the bottom of the screen). For this practice plot, **accept edits** lets Claude change the file without asking about each edit. Use **plan mode** to review its proposed changes first, or **manual** to approve individual actions.
>
> **Model** (`/model`). Use **Sonnet** or **Haiku** for a small plotting edit. Save **Opus** for more complex tasks. Stanford's managed plan has a usage limit; if you reach it, you'll need to wait for it to reset.

Claude edits the `.ipynb` **file on disk**. Switch back to the notebook tab and click **Reload** when JupyterHub reports that the file changed. Then choose **Kernel → Restart Kernel and Run All Cells** to see the updated plot.

---

## Quiz

Answer each one in your head, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">You load a Python module, then run <code>python3</code> again. Why might a different Python start?</span></summary>

**The module changes the search order in `$PATH`.** It adds its Python directory near
the front, so the shell finds that executable before the one it used previously.
Run `which python3` before and after loading the module to compare the paths.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">Your plotting code saved <code>my_plot.png</code>, but you cannot find it in the repo. Where should you look?</span></summary>

**Check the directory where you started Python.** A relative filename such as
`my_plot.png` is saved in the current working directory. If you started Python from
your home directory, look there. After leaving Python, run `pwd` and `ls` to check.

Starting Python from `~/yens-onboarding-2026` keeps the exercise's output in the repo.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">You run <code>python3 plotting_code.py</code> from the shell in your Yen SSH terminal. The script finishes, but no plot window opens. Does that mean the script failed?</span></summary>

**Not necessarily.** In this terminal session, there is no graphical display for
`plt.show()` to open a window. Check whether `fig.savefig(...)` created `my_plot.png`,
then open that file in JupyterHub's image viewer. In a notebook, the plot can appear
below the cell instead.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">4</span><span class="qtext">You run a cell in the Yens JupyterHub from your laptop's browser. Which computer runs the Python code?</span></summary>

**The Yen hosting your notebook kernel.** Your laptop displays the interface and results.
The notebook uses the cluster's computing resources and files, which is why you can see
the same `my_plot.png` through both JupyterHub and your SSH session.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">5</span><span class="qtext">Your prompt shows <code>&gt;&gt;&gt;</code>. Can you type <code>ls</code> or <code>cd</code> there to navigate?</span></summary>

**You are inside Python, so shell commands do not work there.** Run `exit()` to return
to the terminal's shell, then use `ls` or `cd`. The prompt helps you check which program
is waiting for your input.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">6</span><span class="qtext">You want to run the full plotting sequence again without entering each line or clicking notebook cells. What should you save?</span></summary>

**A Python script**, such as `plotting_code.py`. Save the code in that file, then run it
from the shell in the folder containing it:

```bash
python3 plotting_code.py
```
{: .yens }

Python executes the script from top to bottom. Keep the `fig.savefig(...)` line so the
run produces an image file you can open afterward.

</details>

---

## 🧠 Skills Learned

- You can open JupyterHub on the Yens and run Python from any browser
- You know the difference between a notebook cell and a script, and you know when each is useful
- You can run a `.py` script from the terminal, which is how cluster jobs work
