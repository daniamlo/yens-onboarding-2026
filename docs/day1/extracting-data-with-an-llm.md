---
layout: default
title: "Part 2 Checkpoint: Extracting Data with an LLM"
parent: "Part 2 — Python & AI"
grand_parent: "Day 1 — Foundations & AI"
nav_order: 5
permalink: /day1/extracting-data-with-an-llm/
---

# Part 2 Checkpoint: Extracting Data with an LLM

This checkpoint brings together your Python environment, API key, notebook, and scripts.
You'll make a live API call, then turn a public SEC Form 3 filing into a validated Python
object. The code grows in three stages: a minimal call, a logged and saved result, and
structured output checked against a schema. The final challenge uses the extracted name
to find and summarize a web page. Day 2 uses the same extraction script.

{: .important }
> **Data boundary:** These exercises use public, Low Risk SEC filings. The course's direct
> Anthropic credential is not approved for sensitive research data. Revisit
> [AI Services & Data Privacy]({{ '/day1/stanford-ai-services/' | relative_url }}) before
> substituting another dataset.

---

## The Checkpoint

{: .important }
> **Complete these checks:** Make an API call, read a Form 3 filing, use Haiku
> while iterating, switch to Sonnet 5 for the final extraction, and validate the response
> against a Pydantic model.

## 1. Make the Smallest Live Call

Continue in `day1/anthropic_test.ipynb`, which you created in Managing API Keys,
and confirm that it uses the **GSB AI 2026** kernel.
The kernel contains `anthropic`, `python-dotenv`, and `pydantic` from your project
environment.

Load the key from the repository root and create the client:

```python
from dotenv import load_dotenv
import anthropic

load_dotenv("../.env")
client = anthropic.Anthropic()
```
{: .notebook }

Now send one request:

```python
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    system="Answer accurately and concisely.",
    messages=[
        {"role": "user", "content": "What does SEC Form 3 disclose?"}
    ],
)

answer = "".join(
    block.text for block in response.content if block.type == "text"
).strip()
print(answer)
```
{: .notebook }

Anthropic's native Messages API puts the system instruction in the top-level `system`
argument. The conversation in `messages` contains user and assistant turns; there is no
`{"role": "system"}` message.

The response content is a list of typed blocks because Claude can return more than plain
text. Filtering for `block.type == "text"` makes the assumption explicit.

### Read Token Usage

Models process **tokens**, chunks of text that can be smaller than a word. The
**context window** limits how much material a model can work with in a request,
including instructions, messages, and the response. Your prompt and filing contribute
input tokens; the generated answer contributes output tokens.

After the call above, inspect its usage:

```python
print("input:", response.usage.input_tokens)
print("output:", response.usage.output_tokens)
```
{: .notebook }

Use these counts with the current model price to estimate cost. Measure several
representative filings before estimating a full run.

**Cost and rate limits are separate.** A project may have budget remaining and still
send requests too quickly. Request and input/output token rate limits constrain how
much traffic the account can send in a period. Exceeding them can return HTTP `429`.
See [Anthropic's rate-limit documentation](https://platform.claude.com/docs/en/api/rate-limits)
for the current limits and retry guidance.

### Common Errors

| Symptom | Likely cause |
|---|---|
| `ModuleNotFoundError: anthropic` | Notebook is using the wrong kernel |
| Missing API key | `.env` was not copied, or the notebook needs `load_dotenv("../.env")` |
| HTTP `401` | Credential is missing, invalid, or revoked |
| HTTP `429` | The organization/workspace hit a request or token rate limit |
| Empty text | The response stopped or returned a non-text content block |

If you receive `429`, read the error and its `retry-after` guidance. Do not have the room
hammer the service by repeatedly rerunning the cell. The teaching scripts expose the
failure instead of silently retrying it.

## 2. Read a Real Filing

From a terminal at the repository root, preview the public filing used by the staged
scripts:

```bash
cd ~/yens-onboarding-2026
head -40 data/sec_filings/Cheniere_Energy_Inc.txt
```
{: .yens }

Form 3 is an ownership filing. The useful facts are spread through SEC headers and XML,
which makes it a good example of turning unstructured text into a record.

## 3. Stage 1: A Minimal Extraction

Open `scripts/extract_form_3_step1_basic.py`. Its essential call is:

```python
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=256,
    system="You extract data from SEC filings. Be precise and concise.",
    messages=[
        {
            "role": "user",
            "content": (
                "Extract the insider's name and role.\n"
                "Reply with only: NAME | ROLE\n\n"
                + filing_text[:4000]
            ),
        }
    ],
)
```
{: .file }

Run the complete script from the repository root:

```bash
source .venv/bin/activate
python3 scripts/extract_form_3_step1_basic.py
```
{: .yens }

The `[:4000]` slice is a simple input guard for the first experiment. It limits cost and
makes the amount sent easy to reason about. It is not a general document-chunking strategy.

At this stage the prompt asks for `NAME | ROLE`, but nothing enforces that shape. A fluent
but differently formatted response would still print successfully.

## 4. Stage 2: Log and Save the Result

See exactly what the second stage adds:

```bash
diff scripts/extract_form_3_step1_basic.py scripts/extract_form_3_step2_logged.py
```
{: .yens }

{: .tip }
> **Pro tip: Reading `diff` output**
>
> `diff first_file second_file` shows what changed from the first file to the second.
> Here, the first file is Stage 1 and the second is Stage 2. It only compares the files;
> it does not edit them.
>
> - `<` marks a line from the **first file** (Stage 1).
> - `>` marks a line from the **second file** (Stage 2).
> - `---` separates the old and new lines in a changed block.
> - A label such as `11c12` means line **11** in the first file changed to line **12**
>   in the second. The letters mean **c**hange, **a**dd, or **d**elete. A comma marks a
>   line range, so `3,4` means lines 3 through 4.
>
> For example, this block shows the script name changing:
>
> ```text
> 11c12
> <     python3 scripts/extract_form_3_step1_basic.py
> ---
> >     python3 scripts/extract_form_3_step2_logged.py
> ```
> {: .output }
>
> Read `<` as “from Stage 1” and `>` as “from Stage 2.” These are output markers,
> not commands to type. Unchanged lines are omitted; identical files produce no output.

Then run it:

```bash
python3 scripts/extract_form_3_step2_logged.py
```
{: .yens }

New behavior:

- progress goes to the terminal and `form3_extract.log`
- the input filing is one named setting near the top
- the response is saved under `results/`
- an empty text response raises an error instead of writing a misleading blank result

The output is still only text. Logging proves what ran; it does not prove that the answer
has the fields or types your analysis expects.

## 5. Stage 3: Generate and Validate a Typed Record

Compare the final stage with Stage 2:

```bash
diff scripts/extract_form_3_step2_logged.py scripts/extract_form_3_one_file.py
```
{: .yens }

The schema is ordinary Pydantic:

```python
from typing import List
from pydantic import BaseModel


class Form3Filing(BaseModel):
    insider_name: str
    insider_role: List[str]
    company_name: str
    company_cik: str
    filing_date: str
```
{: .file }

The final call passes that class directly to Anthropic's structured-output helper:

```python
response = client.messages.parse(
    model="claude-sonnet-5",
    max_tokens=4096,
    thinking={"type": "disabled"},
    system=system_prompt,
    messages=[{"role": "user", "content": filing_text}],
    output_format=Form3Filing,
)

result = response.parsed_output
if result is None:
    raise RuntimeError(
        f"No structured output returned (stop reason: {response.stop_reason})"
    )
```
{: .file }

`output_format=Form3Filing` does two connected jobs: the SDK turns the model into a JSON
schema for constrained generation, then parses and validates the returned JSON as a
`Form3Filing`. When `messages.parse` returns successfully, `parsed_output` is already a
typed, validated object. See Anthropic's current
<a href="https://platform.claude.com/docs/en/build-with-claude/structured-outputs" target="_blank" rel="noopener noreferrer">structured outputs documentation</a>.

This is different from the old course code, which requested generic JSON and later ran
`Form3Filing.model_validate_json(raw)`. The native helper keeps the requested schema and
the local parser tied to the same Pydantic class.

{: .note }
> The script retains the raw JSON text and writes a normalized JSON result. Validation
> happens **inside `messages.parse` before it returns**, so the raw file is an audit
> artifact, not a pre-validation rescue file.

Run the final stage:

```bash
python3 scripts/extract_form_3_one_file.py
```
{: .yens }

Read both result files with `cat`:

```bash
cat results/form3_Cheniere_Energy_Inc.txt
cat results/form3_result.json
```
{: .yens }

### Why Haiku First and Sonnet 5 Last?

Stages 1 and 2 use `claude-haiku-4-5`: the request is simple and you may rerun it while
changing the prompt. Stage 3 uses `claude-sonnet-5` after the prompt and schema settle,
giving the final extraction the stronger model. `thinking={"type": "disabled"}` keeps
this deterministic extraction task focused on the schema instead of allocating tokens to
extended thinking.

This tiering is a project choice, not a rule that a larger model always wins. Evaluate
accuracy on a labeled sample before selecting a production model.

### Why `max_tokens` Is Required

Anthropic requires a maximum output-token budget on each Messages request. It is a ceiling,
not a promise to generate that much. The basic reply needs only 256; the structured stage
uses 4096 so the schema can complete without truncation. Input size is measured separately.

## 6. Know What Validation Does Not Prove

Pydantic catches structural problems such as a missing field or a string where a list is
required. It cannot prove that a plausible date, CIK, or name is factually correct.

Before scaling:

1. confirm that the dataset and service are approved for the project
2. measure latency and token usage on representative filings and estimate the run's cost
3. compare outputs with their source filings and decide how you will score accuracy
4. record model and prompt versions, failed record identifiers, and stop reasons without logging secrets or restricted content
5. add bounded retries that respect `retry-after` and avoid repeating successful work
6. require human review before using results for consequential decisions

## 7. Final Challenge: Research the Person You Extracted

{: .exercise }
> Use the person identified in `results/form3_Cheniere_Energy_Inc.txt` to search the
> web through the Anthropic API. Open the first returned result, summarize the page,
> and save the summary with its source.

Your pipeline now has another step:

**Filing → extracted person → web search → first result → page summary**

### Start from Your Saved Result

Return to `day1/anthropic_test.ipynb`, where your API client is already set up.
Run Stage 3 before starting: it writes JSON to `form3_Cheniere_Energy_Inc.txt`.
Stage 2 writes plain text to the same filename, which this cell cannot load as JSON.

```python
import json
from pathlib import Path

filing = json.loads(
    Path("../results/form3_Cheniere_Energy_Inc.txt").read_text()
)
person = filing["insider_name"]
company = filing["company_name"]
query = f"{person} {company} biography"
print(query)
```
{: .notebook }

Check the extracted name against the filing before searching. Including the company
helps distinguish people who share a name.

### Build Two API Calls

Use `client.messages.create()` with the same Sonnet model and `thinking={"type": "disabled"}`
as Stage 3. Give each call a `max_tokens` limit, such as `2048`.

1. **Search.** Ask the model to search for `query`. Add `tools=[search_tool]` to the
   request using the definition below and name the response `search_response`.
   Inspect the `web_search_tool_result` block and
   select the first item in its result list in Python. Save its title and URL.
2. **Read and summarize.** Make a second request with `tools=[fetch_tool]`. Put the
   selected URL in the user message and ask the model to fetch it, then write a
   three-sentence summary of what the page says about the person. Include the extracted
   name and company so it can flag a possible mismatch. Ask for citations and the source URL.
   Name this response `summary_response`.

These are server tools: Anthropic runs the search and fetch during the API requests.
[Web search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)
finds pages; [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)
reads a selected page.

```python
search_tool = {
    "type": "web_search_20250305",
    "name": "web_search",
    "max_uses": 1,
}
fetch_tool = {
    "type": "web_fetch_20250910",
    "name": "web_fetch",
    "max_uses": 1,
    "max_content_tokens": 10000,
    "citations": {"enabled": True},
}
```
{: .notebook }

<details markdown="1">
<summary>Hint: find the first search result</summary>

If your first API response is named `search_response`, inspect its tool output:

```python
search_results = []
for block in search_response.content:
    if block.type == "web_search_tool_result":
        if not isinstance(block.content, list):
            raise RuntimeError(f"Search failed: {block.content}")
        search_results.extend(block.content)

if not search_results:
    raise RuntimeError("No search results returned. Inspect the response.")

first_result = search_results[0]
print(first_result.title)
print(first_result.url)
```
{: .notebook }

The first result means the first item returned by this API search. Your browser may
show a different order. Use the tool's URL, rather than a URL generated in the model's prose.

</details>

### Display a Readable Response

`print(response)` shows the whole API object: text, tool calls, citations, and encrypted
metadata. Run this helper cell once to display the answer as Markdown with source links.
You can use it with either response.

```python
from IPython.display import display, Markdown

def show_response(response):
    text_parts = []
    sources = {}

    for block in response.content:
        if block.type == "text":
            text_parts.append(block.text)
            for citation in block.citations or []:
                url = getattr(citation, "url", None)
                if url:
                    sources[url] = citation.title or url

        # Fetch citations refer to a document; its URL is in the tool result.
        elif block.type == "web_fetch_tool_result":
            result = block.content
            if result.type == "web_fetch_result":
                sources[result.url] = result.content.title or result.url

    answer = "".join(text_parts)
    display(Markdown(answer or "No text returned. Inspect the full response."))

    if sources:
        links = "\n".join(
            f"- [{title}]({url})" for url, title in sources.items()
        )
        display(Markdown("### Source pages\n\n" + links))
```
{: .notebook }

After each API call, pass its response to the helper:

```python
show_response(search_response)
show_response(summary_response)
```
{: .notebook }

If you named your response `response`, use `show_response(response)` instead. This only
formats the display; it makes no new API calls and keeps the original object available
for checking tool results and saving citation metadata.

### Check and Save Your Summary

Open the selected URL in your browser. Does it describe the person in the filing?
Can you find support on the page for each statement in the summary? A current biography
may describe a different role from the one held on the filing date.

Save `../results/insider_web_summary.json` from your notebook with:

- the extracted name and company, search query, and search date
- the first result's title and URL
- the three-sentence summary and the response's citation metadata
- your identity check: `match`, `uncertain`, or `different_person`, with a brief reason

If there are no results, the page cannot be fetched, or it describes someone else,
record that outcome and leave the person summary empty. Do not silently substitute a
later result or fill gaps from the model's memory. Check for a successful
`web_fetch_tool_result` before treating the response as a page summary.

<details markdown="1">
<summary>Help with web tool responses</summary>

Tool errors can appear inside an otherwise successful API response. Inspect the result
blocks as well as the text. If `stop_reason` is `pause_turn`, follow the
[continuation instructions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools)
before treating the response as finished. Search access also depends on the course
account's tool settings; ask the instructor if the API reports that search is disabled.

Keep the citations attached to text blocks when saving the response. Calling
`block.model_dump()` preserves those fields. Web pages are source material, so your
prompt should ask the model to summarize their content and ignore instructions embedded
in the page.

</details>

## Completion Check

Before moving on, confirm that:

- Your notebook uses the **GSB AI 2026** kernel, loads the key, and receives an API response.
- You can find the input and output token counts from that notebook call.
- All three extraction stages ran, and `form3_extract.log` records the run.
- `results/form3_result.json` contains the five fields in `Form3Filing`.
- You compared the extracted values with `data/sec_filings/Cheniere_Energy_Inc.txt`
  and recorded any differences. Passing schema validation alone does not confirm accuracy.
- `results/insider_web_summary.json` records your first-result summary, source, and
  identity check, or explains why the lookup could not produce a summary.

Save `day1/anthropic_test.ipynb`. Add a short **Part 2 checkpoint** entry to `notes.md`
with the model used for the final extraction and what you found when checking the
extraction and web summary.
Then save your work on your current branch and push it to your fork:

```bash
cd ~/yens-onboarding-2026
git add day1/anthropic_test.ipynb results/form3_result.json results/insider_web_summary.json notes.md
git commit -m "Complete Part 2 extraction checkpoint"
git push
```
{: .yens }

Open your fork on GitHub and confirm that the notebook, results, and notes are on your
branch. Keep `.env` out of the commit.

{: .note }
> 🟢 **Green sticky** = the checks passed and my work is pushed &nbsp;&nbsp;
> 🔴 **Red sticky** = I need help with a check
>
> Put a sticky note on your laptop lid so instructors can see where you are.

Day 2 starts by measuring what this extraction script needs before running it with Slurm.

---

## Bonus

{: .note }
> Finished early? Try any of these.

Return to `day1/anthropic_test.ipynb` and run these in new cells after the client setup
from Step 1.

**Bonus 1: List Models Available to the Course Key**

```python
models = client.models.list(limit=20)
for model in models.data:
    print(model.id)
```
{: .notebook }

Model availability belongs to the Anthropic organization and may change. The core scripts
require both `claude-haiku-4-5` and `claude-sonnet-5`; do not silently substitute a model
if either is missing.

**Bonus 2: Count Input Tokens Before Generating**

Anthropic does not provide its own embedding model, so the old course's embeddings example
does not map to the native client. Use the native token-counting endpoint instead—directly
useful when sizing this pipeline:

```python
from pathlib import Path

filing_text = Path("../data/sec_filings/Cheniere_Energy_Inc.txt").read_text()
count = client.messages.count_tokens(
    model="claude-haiku-4-5",
    system="You extract data from SEC filings.",
    messages=[{"role": "user", "content": filing_text}],
)
print(count.input_tokens)
```
{: .notebook }

Read Anthropic's
<a href="https://platform.claude.com/docs/en/api/python/messages/count_tokens" target="_blank" rel="noopener noreferrer">token-counting API documentation</a>
and its
<a href="https://platform.claude.com/docs/en/build-with-claude/embeddings" target="_blank" rel="noopener noreferrer">embeddings guidance</a>
if a future project needs semantic search.

**Bonus 3: Compare the Two Course Models**

Ask both models the same small, public-data question and record live usage rather than
copying a fixed benchmark:

```python
question = "In two sentences, explain what SEC Form 3 discloses."

for model in ["claude-haiku-4-5", "claude-sonnet-5"]:
    kwargs = {
        "model": model,
        "max_tokens": 150,
        "messages": [{"role": "user", "content": question}],
    }
    if model == "claude-sonnet-5":
        kwargs["thinking"] = {"type": "disabled"}

    comparison = client.messages.create(**kwargs)
    text = "".join(
        block.text for block in comparison.content if block.type == "text"
    ).strip()
    print(model, comparison.usage, text, sep="\n")
```
{: .notebook }

Compare answer quality, input/output tokens, latency you observe, and current price. One
small run is an observation, not a universal performance claim.

---

## Quiz

Answer each one in your head, then open it to check.

<details class="quiz" markdown="1">
<summary><span class="qnum">1</span><span class="qtext">Your prompt asks for <code>NAME | ROLE</code>, and the call succeeds. Can your code assume the answer follows that format?</span></summary>

**No. A successful request does not guarantee the requested format.** The basic call
returns text that may differ from your instructions. For fields your code needs to use,
define a Pydantic schema and pass it through the structured-output helper, as in Stage 3.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">2</span><span class="qtext">Pydantic accepts the extracted company name and filing date. Does that prove they match the filing?</span></summary>

**No. Validation checks the schema, not the source facts.** A wrong company name can
still be a string. In this lesson, `filing_date` is also a string, so the schema does not
even require a particular date format.

Compare extracted values with the original filing. Valid structure makes the result
usable in code; checking the source tells you whether it is accurate.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">3</span><span class="qtext">After a structured-output call, <code>response.parsed_output</code> is <code>None</code>. Should you save an empty record and continue?</span></summary>

**No. Record the failure and inspect `response.stop_reason`.** An empty record would
hide the fact that extraction did not produce a usable result. The example raises an
error here so you can investigate before treating the filing as complete.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">4</span><span class="qtext">You set <code>max_tokens=4096</code>. Will every response contain 4,096 tokens?</span></summary>

**No. It is an output limit, not a requested response length.** The model may finish
with fewer tokens. A limit that is too small can cut off the response before it is
complete. Check the actual input and output counts in `response.usage` when measuring
your run.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">5</span><span class="qtext">The project still has budget, but a call returns HTTP <code>429</code>. What might be happening?</span></summary>

**The account may have hit a request or token rate limit.** Budget and traffic limits
are separate. Read the error and follow its `retry-after` guidance instead of immediately
rerunning the same request. More available money does not necessarily let you send more
requests at once.

</details>

<details class="quiz" markdown="1">
<summary><span class="qnum">6</span><span class="qtext">How would you use temperature and top-k to make an LLM's answers more consistent or more varied?</span></summary>

**Lower temperature and a smaller top-k generally make answers more consistent.
Higher values allow more variation.** On models that support these settings:

- **Temperature** controls randomness when choosing the next token. Lower values favor
  the most likely tokens; higher values give less likely tokens more chance.
- **Top-k** limits the choices to the k most likely next tokens. A smaller k narrows
  the choices; a larger k allows more options. With `top_k=1`, only the most likely
  token is eligible at each step.

For extraction, consistency is usually useful. For brainstorming, more variation may
help. Even `temperature=0` does not guarantee identical results across repeated calls.
Support varies by model, so check the
[API documentation](https://platform.claude.com/docs/en/api/http/messages/create)
before adding these settings.

</details>

---

## Skills Learned

- Use `anthropic.Anthropic()` and the native Messages API
- Put system instructions in `system=` and user turns in `messages`
- Use Haiku for lightweight iteration and Sonnet 5 for the final validated extraction
- Pass a Pydantic class to `messages.parse(output_format=...)`
- Treat `parsed_output` as validated structure while still checking for no output
- Read input/output token usage and distinguish it from rate-limit headroom
- Build from a notebook experiment to a logged, reproducible script in small stages
- Check an extraction against its source and save the result to your fork
- Use web search and page retrieval to produce a summary with a source and identity check
