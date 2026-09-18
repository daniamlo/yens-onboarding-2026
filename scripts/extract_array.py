import os

# This job only makes API calls — it does no heavy math — so keep number-crunching
# libraries (numpy/OpenBLAS via pandas) from spinning up a thread per core on the
# shared node. Must be set before pandas is imported.
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import json
import sys
from pathlib import Path
from typing import List

import anthropic
import pandas as pd
import requests
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()
client = anthropic.Anthropic()

CSV_PATH = "data/aws_links.csv"
RESULTS_DIR = "results"
os.makedirs(RESULTS_DIR, exist_ok=True)

# How many filings this array covers. Task IDs run 0..NUM_FILINGS-1, one per array task.
NUM_FILINGS = 100


class Form3Filing(BaseModel):
    insider_name: str
    insider_role: List[str]
    company_name: str
    company_cik: str
    filing_date: str


system_prompt = """
You are a data extraction agent for SEC Form 3 filings.

Extract the following fields:
- insider_name: The name of the insider (from reportingOwner or anywhere in the document).
- insider_role: A list of roles the insider holds (Director, Officer, 10% Owner, Other).
- company_name: The issuer's company name.
- company_cik: The CIK number of the issuer (from issuerCik or COMPANY DATA).
- filing_date: The filing date (prefer signatureDate or FILED AS OF DATE).

Return a SINGLE JSON object, not a list. Do not wrap it in an array.
"""

task_id = int(sys.argv[1])

df = pd.read_csv(CSV_PATH)
urls = df["urls"].dropna().tolist()
urls = [u for u in urls if u.endswith(".txt")]
urls = urls[:NUM_FILINGS]

if task_id >= len(urls):
    print(f"task {task_id}: nothing to do (only {len(urls)} filings)")
    sys.exit(0)

filing_url = urls[task_id]
filename = filing_url.split("/")[-1]
output_path = Path(RESULTS_DIR) / filename.replace(".txt", ".json")

# already done? skip — makes the array safe to resubmit after a partial failure
if output_path.exists():
    print(f"[{task_id}] {output_path} already exists — skipping")
    sys.exit(0)

print(f"[{task_id}] Processing: {filename}")

response = requests.get(filing_url)
filing_text = response.text

# output_format hands Form3Filing to the API as a schema the reply must match, so
# .parsed_output comes back already validated against it.
api_response = client.messages.parse(
    model="claude-haiku-4-5",
    max_tokens=4096,
    system=system_prompt,
    messages=[{"role": "user", "content": filing_text}],
    output_format=Form3Filing,
)

result = api_response.parsed_output
if result is None:
    # No structured reply to save: the model declined, or the answer ran past
    # max_tokens before it was finished.
    raise RuntimeError(f"no output for {filename} ({api_response.stop_reason})")

with open(output_path, "w") as f:
    json.dump(result.model_dump(), f, indent=2)

print(f"[{task_id}] -> saved {output_path}")
