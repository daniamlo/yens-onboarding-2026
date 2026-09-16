---
layout: default
title: "5. Bonus — GPUs & Local LLMs"
parent: "Part 2 — Submit a Job Array"
grand_parent: "Day 2 — The Yen-Slurm Cluster"
nav_order: 5
permalink: /day2/gpus/
---

# Bonus — GPUs & Local LLMs

{: .note }
> 🔴 **Red sticky** = I need help. Put it up the moment you are stuck — an instructor will
> come to you.
>
> 🟢 **Green sticky** = I have done 1–4 and am moving on to the bonus work, and I am ready
> to help my table.

Everything on this page runs from your clone, with the environment active:

```bash
cd ~/yens-onboarding-2026
source .venv/bin/activate
```
{: .yens }

## Why run a model yourself?

### What an API call actually does

When you call an LLM API, three things happen outside your control:

- **Your data leaves.** The filing text — and whatever else is in your prompt — is sent over the network to the model provider.
- **The compute is theirs.** The model runs on the *model provider's* machines, not yours.
- **The model can change.** You get the weights the model provider is serving that day.

<svg viewBox="0 0 600 164" role="img" aria-labelledby="api-title api-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:600px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="api-title">Calling an LLM API sends your data to a remote server and back</title>
  <desc id="api-desc">Your code on the left, labeled "on your or Stanford's machines", and the model provider's server on the right, labeled "in the cloud", separated by a dashed vertical boundary line. Your code sends a packet labeled "prompt plus data" across the boundary to the provider, which runs the model and sends a "response" packet back.</desc>
  <!-- side labels, above the boxes — same wording as the "Why Run It Yourself?" figure -->
  <text x="117" y="26" font-size="11" font-weight="700" fill="#2c3e50" text-anchor="middle">On your or Stanford's machines</text>
  <text x="505" y="26" font-size="11" font-weight="700" fill="#2c3e50" text-anchor="middle">In the cloud</text>
  <!-- trust boundary: the point where your data leaves your machine -->
  <line x1="300" y1="44" x2="300" y2="140" stroke="#b3bccb" stroke-width="1.5" stroke-dasharray="5 4"/>
  <!-- left node: your code -->
  <rect x="14" y="74" width="206" height="48" rx="10" fill="#eef1f8" stroke="#cdd4e6" stroke-width="1.5"/>
  <text x="117" y="103" font-size="13" font-weight="700" fill="#2c3e50" text-anchor="middle">Your code</text>
  <!-- right node: model provider -->
  <rect x="430" y="74" width="150" height="48" rx="10" fill="#eef1f8" stroke="#cdd4e6" stroke-width="1.5"/>
  <text x="505" y="103" font-size="13" font-weight="700" fill="#2c3e50" text-anchor="middle">Model provider</text>
  <!-- outbound packet: prompt + data (starts just right of the wider box) -->
  <g>
    <rect x="226" y="85" width="120" height="26" rx="8" fill="#E69F00"/>
    <text x="286" y="102" font-size="11" font-weight="600" fill="#ffffff" text-anchor="middle">prompt + data ▶</text>
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.44;0.5;1" dur="5s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;0,0;82,0;82,0" keyTimes="0;0.06;0.44;1" dur="5s" repeatCount="indefinite" calcMode="linear"/>
  </g>
  <!-- inbound packet: response -->
  <g>
    <rect x="304" y="85" width="120" height="26" rx="8" fill="#0072B2"/>
    <text x="364" y="102" font-size="11" font-weight="600" fill="#ffffff" text-anchor="middle">◀ response</text>
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.56;0.94;1" dur="5s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;0,0;-82,0;-82,0" keyTimes="0;0.56;0.94;1" dur="5s" repeatCount="indefinite" calcMode="linear"/>
  </g>
  <!-- caption -->
  <text x="300" y="150" font-size="12.5" fill="#6a7280" text-anchor="middle">Your prompt and data go to the model provider's servers, and the response comes back.</text>
</svg>

### Why run it yourself?

<svg viewBox="0 0 600 232" role="img" aria-labelledby="local-title local-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:600px;height:auto;margin:1.5rem auto" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <title id="local-title">Running the model yourself keeps your prompt and data on your side</title>
  <desc id="local-desc">Your code sits above a local model, both on the left of a dashed vertical boundary — the edge of your, or Stanford's, machines. A labeled bar carries the prompt and data down to the local model and the response back up; neither crosses the boundary. On the right, in the cloud, the model provider's server is grayed out and not contacted.</desc>
  <!-- boundary: the edge of your machines -->
  <line x1="300" y1="36" x2="300" y2="196" stroke="#b3bccb" stroke-width="1.5" stroke-dasharray="5 4"/>
  <!-- territory labels -->
  <text x="150" y="26" font-size="11" font-weight="700" fill="#2c3e50" text-anchor="middle">On your or Stanford's machines</text>
  <text x="450" y="26" font-size="11" font-weight="700" fill="#9aa3b0" text-anchor="middle">In the cloud</text>
  <!-- your code (top) -->
  <rect x="70" y="44" width="160" height="48" rx="10" fill="#eef1f8" stroke="#cdd4e6" stroke-width="1.5"/>
  <text x="150" y="72" font-size="13" font-weight="700" fill="#2c3e50" text-anchor="middle">Your code</text>
  <!-- local model (below) -->
  <rect x="70" y="150" width="160" height="48" rx="10" fill="#eef1f8" stroke="#cdd4e6" stroke-width="1.5"/>
  <text x="150" y="178" font-size="13" font-weight="700" fill="#2c3e50" text-anchor="middle">Local model</text>
  <!-- outbound bar: prompt + data, travels down to the local model -->
  <g>
    <rect x="90" y="98" width="120" height="24" rx="8" fill="#E69F00"/>
    <text x="150" y="114" font-size="11" font-weight="600" fill="#ffffff" text-anchor="middle">prompt + data ▼</text>
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.44;0.5;1" dur="5s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;0,0;0,26;0,26" keyTimes="0;0.06;0.44;1" dur="5s" repeatCount="indefinite" calcMode="linear"/>
  </g>
  <!-- inbound bar: response, travels back up -->
  <g>
    <rect x="90" y="124" width="120" height="24" rx="8" fill="#0072B2"/>
    <text x="150" y="140" font-size="11" font-weight="600" fill="#ffffff" text-anchor="middle">▲ response</text>
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.56;0.94;1" dur="5s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;0,0;0,-26;0,-26" keyTimes="0;0.56;0.94;1" dur="5s" repeatCount="indefinite" calcMode="linear"/>
  </g>
  <!-- model provider: present but not contacted -->
  <rect x="370" y="97" width="160" height="48" rx="10" fill="#eef1f8" stroke="#cdd4e6" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.5"/>
  <text x="450" y="118" font-size="13" font-weight="700" fill="#9aa3b0" text-anchor="middle">Model provider</text>
  <text x="450" y="134" font-size="10" fill="#9aa3b0" text-anchor="middle">(not contacted)</text>
  <!-- caption -->
  <text x="300" y="222" font-size="12.5" fill="#6a7280" text-anchor="middle">Run the model yourself and your prompt and data never cross into the cloud.</text>
</svg>

**1. Privacy & data requirements — often a hard rule, not a preference.** Restricted, confidential, or IRB-governed data may not leave Stanford's perimeter. Run the model locally and your prompts and documents never leave the cluster — nothing goes to an outside model provider. (Which bucket your data falls in was covered in [the data classification section]({{ '/day1/stanford-ai-services/#check-the-data-and-service' | relative_url }}) on Day 1.)

**2. Cost at scale.** No per-token bill. You already have cluster access, so local "inference" (querying an LLM) is effectively free at the margin. A run over 100,000 filings that would rack up a real bill on a metered API costs nothing extra on the Yens.

**3. Reproducibility.** Versioning proprietary models is complicated — the provider can change the model behind a given name, and old versions eventually get retired. An open model is always reproducible: you control the weights, so the exact model is fixed and a reviewer (or future you) can rerun the identical pipeline years later.

**4. No API rate limits.** Model providers cap requests and tokens per minute, and a queue of your own jobs all calling the API competes for that one allowance. A server you run has no such cap — it is bounded by the **VRAM** on the card, so you send requests in parallel and batch them against the one server for as much throughput as the card allows.

{: .note }
> There's a catch to "run it yourself": you can only run models whose **weights you can download**. The frontier models from OpenAI (GPT-5.6) and Anthropic (Claude Fable 5) are **proprietary** — the companies never release the weights, so those models exist *only* behind their cloud APIs. There is no way to run them on the Yens.
>
> Running locally therefore means using **open-weight** models — ones whose parameters are published for anyone to download and serve, such as Llama (Meta), Mistral, Qwen, or DeepSeek. These are the kind of models you'll run on the Yens later today.
>
> Open weights are **not** local-only. Plenty of third-party APIs host Llama and Qwen for you, and Stanford's AI API Gateway routes to whatever models it currently carries — so "open-weight" is about who published the parameters, not about whose hardware runs them.
>
> So the real choice isn't "any model, local or cloud." It's: a **proprietary model someone else runs**, or an **open-weight model**, which you can either run yourself on the Yens or reach through an API somebody else runs — Stanford's AI API Gateway, or one of the third-party hosts above.

### When the API is still the right call

Running locally isn't always the answer. The honest tradeoffs:

- **Capability** — the proprietary models (GPT-5.6, Claude Fable 5) generally score higher on public benchmarks than the open-weight ones you can run yourself. Whether that gap matters is task-dependent, and cheap to settle: run both over the same sample of your own data and compare the answers.
- **Convenience** — an API key and a few lines of code: no cluster job to submit, no model server to start, no queue wait.
- **Elastic scale** — a hosted API scales on demand; the capacity you can run on the Yens is finite, so very large models or very high volume can exceed it.

## GPUs on the Yens

### What you can ask for

The Yens have several GPU types. For our purposes they differ mainly in one thing: **VRAM** (video random-access memory — the GPU's own memory), which sets a ceiling on how big a model you can load.

| GPU type | VRAM | Roughly good for |
|-----|------|------------------|
| NVIDIA A30 | 24 GB | small models, embeddings |
| NVIDIA A40 | 48 GB | mid-size models |
| NVIDIA H200 | 141 GB | large models |

You request a GPU the same way you set any other resource — a directive at the top of the
script. Three flags do the GPU-specific work:

| Directive | What it does |
|---|---|
| `--partition` | Set it to `gpu` to send the job to the GPU nodes. |
| `--gres` | `gpu:1` allocates one GPU to you. You have to ask explicitly: leave it out and the job will not run. |
| `--constraint` | Optional. Restricts the job to nodes carrying a named feature, which is how you pick a GPU type. |

On a command line: `-p` for the partition, `-C` for the constraint, and `-G` (`--gpus`) in
place of `--gres`.

Put them in the script, on the `sbatch` line, or on `srun` — they behave the same way
wherever you write them.

{: .tip }
> **For interactive work** — exploring, quick tests — you don't need a batch script. Grab a GPU node directly with `srun --pty`, plus the GPU flags:
>
> ```bash
> srun --partition=gpu --gres=gpu:1 --cpus-per-task=4 --mem=16G \
>      --time=01:00:00 --reservation=class_gpu --pty bash
> ```
> {: .yens }
>
> This drops you into a shell *on a GPU node* with one GPU reserved — run `nvidia-smi` to confirm. Reach for an interactive session when you're exploring or testing; use a batch job for long or production runs that should queue unattended.

{: .warning }
> **Release it when you're done.** Type `exit` the moment your experimentation is complete. An interactive allocation holds the GPU for the *full* `--time` you requested — even while it sits idle at your shell prompt — so no one else can use that GPU until you exit or the time limit runs out. GPUs are scarce shared resources; don't sit on one you've finished with.

### Choosing a GPU type

Without a constraint you get whichever GPU node frees up first, which is fine when any card
will do and wrong when the model needs more VRAM than the card you landed on has. The
constraint's value is written `GPU_MODEL:` followed by the card's name from the table above
— `A30`, `A40` or `H200`. Add it as a third directive:

```bash
#SBATCH --constraint="GPU_MODEL:A30"     # 24 GB, enough for a small model
```
{: .file }

To try it without writing a script at all, `--wrap` runs a single command as the whole
job — this asks specifically for an H200:

```bash
sbatch -C "GPU_MODEL:H200" -G 1 -p gpu --wrap "nvidia-smi"
```
{: .yens }

With no `--output` directive, the log lands where Slurm puts it by default:
`slurm-<jobid>.out`, in the directory you submitted from. Read it and you will see an H200
rather than whatever happened to be free:

```bash
cat slurm-<jobid>.out
```
{: .yens }

**Asking for "at least this much VRAM."** A constraint is matched as an exact string, so there is no way to say *48 GB or more*. Write the alternatives out instead — `|` means *or*:

```bash
#SBATCH --constraint="GPU_MODEL:A40|GPU_MODEL:H200"
```
{: .file }

That accepts either card, so the job starts on whichever is free instead of queueing behind the one node you named. Reach for it whenever more than one card would do: every constraint you add shrinks the set of nodes that can run your job, and on a partition this small that shows up directly as queue time.

**Two cards instead of a bigger one.** `--gres=gpu:2` asks for two GPUs on the same node, which is the other route to more VRAM. It only helps if the software you are serving with can split a model across cards, so check that before asking for two.

### Ask for a GPU, and see what you got

{: .important }
> **Task:** Submit a two-minute job that asks Slurm for one GPU, and read back which GPU
> you landed on.

`slurm/gpu_check.slurm` is already in your repo. Open it, then submit it:

```bash
mkdir -p logs
sbatch --reservation=class_gpu slurm/gpu_check.slurm
squeue --me
```
{: .yens }

{: .note }
> **The GPU nodes have their own reservation today, `class_gpu`**, so this should start
> quickly rather than queueing behind the rest of the cluster.

Once it finishes:

```bash
cat logs/gpu_check_*.out
```
{: .yens }

The `nvidia-smi` output tells you which card you landed on and how much VRAM it has.

## Run a model on a GPU

1. **Download the weights.** Pull the model onto scratch once. Later runs read it from there.
2. **Start a model server.** `ollama serve`, or vLLM if you are using that, loads the model into the card's memory and then waits on a port for questions. Loading takes a minute or two, so you start it once and leave it running instead of paying that cost on every question.
3. **Send it requests.** Your code posts questions to that host and port over the cluster's internal network and reads the answers back. Nothing leaves the Yens.

**[Ollama](https://rcpedia.stanford.edu/blog/2025/05/12/running-ollama-on-stanford-computing-clusters/)** downloads open-weight models and serves one behind a simple HTTP API in a couple of commands. **[vLLM](https://rcpedia.stanford.edu/blog/2025/11/07/fine-tuning-open-source-models/#open-source-vs-gpt-fine-tuning)** is a serving engine built for throughput, batching many concurrent requests against one loaded model. You can use either one.

### One server per table, everyone connects

{: .warning }
> **Sort this out at your table before anyone starts typing.** Work out who is done with
> the exercises, then agree which **one** of you will run the model server. Everybody else
> queries it, so nobody else needs a GPU.
>
> Whoever is running the server puts a **🟢 green sticky on their laptop**, so we can see at
> a glance who is running what.

There are not enough GPUs for everyone to hold one, and starting a server takes a few
minutes.

**If you are running the server, grab a GPU and start it.** Everybody else skips to the
next step and waits for a URL.

```bash
srun --partition=gpu --gres=gpu:1 --cpus-per-task=8 --mem=16G \
     --time=01:00:00 --reservation=class_gpu --pty bash
```
{: .yens }

That drops you into a shell **on a GPU node**. Confirm with `nvidia-smi`, then start Ollama.
DARC keeps a helper repo that wraps the container and picks a free port for you:

```bash
git clone https://github.com/gsbdarc/ollama_helper.git ~/ollama_helper
cd ~/ollama_helper
ml apptainer
export SCRATCH_BASE=/scratch/users/SUNetID
apptainer pull ollama.sif docker://ollama/ollama      # slow, the first time only
source ollama.sh
ollama serve
```
{: .yens }

`SCRATCH_BASE` keeps everything bulky out of your home directory: the model weights,
Apptainer's cache, and the host and port the helper writes down. Home is small and not meant
for any of it — scratch is. The helper refuses to start without `SCRATCH_BASE` set, and every
new terminal needs it set again.

Wait for the server to come up before you do anything else. It prints the address it is
advertising once it is ready:

```
Advertising server to clients at http://<node>:<port>
```
{: .output }

{: .warning }
> **Leave that terminal open.** The server runs in the foreground, so closing the terminal
> or pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> kills it — and everyone at your table loses the
> server with it. Do not pull the model until you have seen the line above.

In a **second terminal**, pull the model and read off the address the server picked. That
terminal can be anywhere on the Yens — the GPU node itself, or an interactive Yen — because the helper reads
back the host and port it wrote down and forwards your request to the server:

```bash
cd ~/ollama_helper
ml apptainer
export SCRATCH_BASE=/scratch/users/SUNetID
source ollama.sh

ollama pull llama3.2:1b
echo "http://$(cat $SCRATCH_BASE/ollama/host.txt):$(cat $SCRATCH_BASE/ollama/port.txt)"
```
{: .yens }

The pull confirms where it is going, which is how you know the second terminal found your
server rather than starting one of its own:

```
Forwarding 'ollama pull llama3.2:1b' to http://<node>:<port>
```
{: .output }

**Give that URL to your table.**

**Everyone — check you can reach it.** A URL is a host and a *port*: one node runs many
services at once, and the port says which door you are knocking on. Substitute your table's
own address — angle brackets mark a placeholder everywhere on this page, so type the value,
not the brackets:

```bash
curl http://<node>:<port>/api/tags
```
{: .yens }

The server answers with what it is holding:

```
{"models":[{"name":"llama3.2:1b","model":"llama3.2:1b","modified_at":"2026-09-16T11:14:59.519153874-07:00","size":1321098329,"digest":"baf6a787fdffd633537aa2eb51cfd54cb93ff08e28040095462bb63daf552878","details":{"parent_model":"","format":"gguf","family":"llama","families":["llama"],"parameter_size":"1.2B","quantization_level":"Q8_0","context_length":131072,"embedding_length":2048},"capabilities":["completion","tools"]}]}
```
{: .output }

`parameter_size` is 1.2B and `size` is about 1.3 GB, which is why this model fits on any card
the Yens have.

{: .note }
> That request left your node, crossed to another machine on the Yens, and came back —
> without leaving the cluster. The model runs there too, so your prompts and your data never
> leave the Yens.

**Everyone — now query it from Python.** From your clone, with the environment active. The
OpenAI client is not in the repo's `requirements.txt`, so install it here:

```bash
cd ~/yens-onboarding-2026
source .venv/bin/activate
pip install openai
```
{: .yens }

```python
from openai import OpenAI

client = OpenAI(
    base_url="<server-url>/v1",        # the model server at your table
    api_key="ollama",                  # ignored, but the client requires a value
)

response = client.chat.completions.create(
    model="llama3.2:1b",
    messages=[{"role": "user", "content": "<your query>"}],
)
print(response.choices[0].message.content)
```

{: .important }
> **Look at the shape of that code.** A different library from the `anthropic` client you
> used yesterday, but the same pattern: build a client, send it a model name and a list of
> messages, read the text off the response. The only thing making it local is `base_url`
> pointing at your table's server. Ollama speaks the OpenAI API, so any client, library or
> tool that can talk to a hosted model can talk to the one you are running.

{: .note }
> **The querying side needs no GPU.** Talking to the server is just HTTP requests, so the
> code above runs anywhere on the Yens that can reach that host and port: an interactive
> Yen, a notebook or terminal on [JupyterHub](https://yen1.stanford.edu/jupyter/hub/home),
> or another Slurm job on a plain CPU node. Only the machine *serving* the model needs a card.

{: .warning }
> Your `base_url` answers only while that one person is still holding the `srun` allocation
> *with `ollama serve` running inside it*. The weights live in **their** scratch too, so if
> somebody else has to take over, they start a server and pull the model again into their
> own.

{: .note }
> **A CPU can serve a model too.** Ollama runs without a GPU, and for a small model and a
> short prompt it will answer. It is just much slower, and the gap widens with a longer
> prompt, a longer answer, or a bigger model. So a CPU is fine for *testing* that your code
> works end to end — the GPU nodes are there for the real LLM work.

## Beyond Ollama

Ollama is the easy on-ramp: one model, one process, an OpenAI-shaped API, minutes to get
going. It is the right tool for exploring, for development, and for the scale most research
projects actually need. It is not the only option, and the differences matter once you are
running seriously.

| | What it is for | Reach for it when |
|---|---|---|
| **[Ollama](https://ollama.com/)** | One model held in memory behind a simple API | Exploring, development, moderate query volume — today's exercise |
| **[vLLM](https://docs.vllm.ai/en/latest/)** | A serving engine built for throughput: continuous batching, paged attention | Many concurrent requests, or a large batch job where tokens-per-second is the constraint |
| **[NVIDIA NIM](https://rcpedia.stanford.edu/blog/2026/04/23/self-hosting-llms-with-nvidia-nim-on-the-yens/)** | Vendor-packaged inference containers, tuned per model | You want NVIDIA's own optimized container rather than assembling the stack — DARC has written this up for the Yens |
| **[Transformers](https://huggingface.co/docs/transformers/en/index)** | The library underneath much of the above | You need to touch the model itself — custom generation, embeddings, training |

**Going further.** Fine-tuning an open model to your own data, choosing between models, and
serving at volume each have DARC write-ups — see [everything tagged
LLM](https://rcpedia.stanford.edu/blog/category/llm/) on RCpedia.

## Where to read more

**DARC and RCpedia** — Stanford GSB's own documentation, and the first place to look:

| | |
|---|---|
| [GPU Slurm Jobs](https://rcpedia.stanford.edu/_user_guide/using_gpu/) | Requesting GPUs properly, with current partition and constraint syntax |
| [Running Ollama on Stanford Computing Clusters](https://rcpedia.stanford.edu/blog/2025/05/12/running-ollama-on-stanford-computing-clusters/) | Every step of what your table did, written out |
| [Self-Hosting LLMs with NVIDIA NIM on the Yens](https://rcpedia.stanford.edu/blog/2026/04/23/self-hosting-llms-with-nvidia-nim-on-the-yens/) | The vendor-container route to serving |
| [Stanford's LLM API Tools](https://rcpedia.stanford.edu/blog/2026/03/06/stanfords-llm-api-tools/) | What Stanford offers centrally, and when to use it instead |
| [Fine-Tuning Open Source Models](https://rcpedia.stanford.edu/blog/2025/11/07/fine-tuning-open-source-models/) | Adapting an open model to your data |
| [LLM Benchmarks for Researchers](https://rcpedia.stanford.edu/blog/2026/07/14/llm-benchmarks-for-researchers/) | Reading model comparisons |
| [Everything tagged LLM](https://rcpedia.stanford.edu/blog/category/llm/) · [tagged GPU](https://rcpedia.stanford.edu/blog/category/gpu/) | The living indexes |
| [Current per-user limits](https://rcpedia.stanford.edu/_policies/user_limits/) | What you are actually allowed to hold |

**Tools:** [Ollama](https://ollama.com/) · [`gsbdarc/ollama_helper`](https://github.com/gsbdarc/ollama_helper) · [vLLM](https://docs.vllm.ai/en/latest/) ([repo](https://github.com/vllm-project/vllm)) · [Hugging Face Transformers](https://huggingface.co/docs/transformers/en/index)

{: .note }
> **Still the fastest route to an answer:** [**#gsb-yen-users**](https://circlerss.slack.com/archives/C01JXJ6U4E5)
> for anything cluster-shaped, or [**gsb_darcresearch@stanford.edu**](mailto:gsb_darcresearch@stanford.edu).

## What you learned

- An API call runs the model on the provider's machines; running it yourself keeps your data on the Yens
- Why you might run locally — data residency, cost at scale, reproducibility, no rate limits — and the counterweights of capability, convenience and scale
- Restricted data forces a local model; everywhere else, compare an open-weight model against an API on your own task
- Ask for a GPU with `--partition=gpu` and `--gres=gpu:1`, and pin the card with `--constraint` — VRAM is what caps model size
- Your table served an open-weight model on a GPU node and queried it, and the prompts never left the Yens
- Pointing a client at your own server instead of a hosted one is a change of `base_url`
- Anything that can reach the server's host and port can query it — an interactive Yen, JupyterHub, or a CPU-only Slurm job; only the serving node needs a GPU
