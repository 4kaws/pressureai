"""
Publish two Hugging Face datasets from the pressure-bench data.

Usage (from repo root):
    HF_TOKEN=hf_xxx python scripts/publish-hf.py

Requires:
    pip install -U "huggingface_hub[cli]" pandas pyarrow
"""

import os
import sys
import tempfile
import textwrap
from pathlib import Path

import pandas as pd
from huggingface_hub import HfApi

HF_TOKEN = os.environ.get("HF_TOKEN")
if not HF_TOKEN:
    print("ERROR: HF_TOKEN env var is not set.")
    print("Run:  HF_TOKEN=hf_xxx python scripts/publish-hf.py")
    sys.exit(1)

api = HfApi(token=HF_TOKEN)
DATA_DIR = Path(__file__).parent.parent / "data"


def publish_questions():
    repo_id = "15juneee/pressure-bench-questions-v1"
    csv_path = DATA_DIR / "pressure_questions.csv"

    df = pd.read_csv(csv_path)
    print(f"[questions] Loaded {len(df)} rows from {csv_path.name}")
    print(f"[questions] Columns: {list(df.columns)}")

    readme = textwrap.dedent(f"""
        ---
        license: cc-by-4.0
        task_categories:
          - question-answering
        language:
          - en
        tags:
          - llm-eval
          - sycophancy
          - gpqa
          - pressure-bench
        ---

        # pressure-bench-questions-v1

        GPQA-Diamond questions used in the pressure-bench confirmatory study.
        {len(df)} questions across physics and chemistry subdomains.

        ## Schema

        | Column | Type | Description |
        |--------|------|-------------|
        | qid | string | Unique question ID |
        | domain | string | Broad domain (physics, chemistry) |
        | subdomain | string | Fine-grained subdomain |
        | question | string | Full question text |
        | option_a | string | Answer option A |
        | option_b | string | Answer option B |
        | correct_option | string | Correct answer (A or B) |

        ## Sample row

        ```
        {df.iloc[0].to_dict()}
        ```

        ## Citation

        If you use this dataset, please cite:

        ```bibtex
        @dataset{{junesdata2025pressurebench,
          title={{Pressure-Bench: LLM Sycophancy Under Expert Authority Pressure}},
          author={{junesdata}},
          year={{2025}},
          url={{https://huggingface.co/datasets/15juneee/pressure-bench-questions-v1}},
          license={{CC-BY-4.0}}
        }}
        ```

        ## Related

        - Full results: [15juneee/pressure-bench-results-v1](https://huggingface.co/datasets/15juneee/pressure-bench-results-v1)
        - Original pilot dataset: [junesdata/llm-sycophancy-gpqa](https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa)
    """).strip()

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        df.to_parquet(tmp / "questions.parquet", index=False)
        (tmp / "README.md").write_text(readme)

        api.create_repo(repo_id=repo_id, repo_type="dataset", exist_ok=True)
        api.upload_folder(
            folder_path=str(tmp),
            repo_id=repo_id,
            repo_type="dataset",
        )

    url = f"https://huggingface.co/datasets/{repo_id}"
    print(f"[questions] Published {len(df)} rows → {url}")
    return url


def publish_results():
    repo_id = "15juneee/pressure-bench-results-v1"
    csv_path = DATA_DIR / "pressure_results_full.csv"

    df = pd.read_csv(csv_path)
    print(f"[results] Loaded {len(df)} rows from {csv_path.name}")
    print(f"[results] Columns: {list(df.columns)}")

    readme = textwrap.dedent(f"""
        ---
        license: cc-by-4.0
        task_categories:
          - question-answering
        language:
          - en
        tags:
          - llm-eval
          - sycophancy
          - gpqa
          - pressure-bench
        ---

        # pressure-bench-results-v1

        Full trial-level results from the pressure-bench confirmatory study.
        Model: gemini-2.5-flash · {len(df):,} rows · 44 unique questions × 10 repeats × 3 conditions.

        ## Headline accuracy table

        | Condition | Accuracy |
        |-----------|----------|
        | direct | 90.5% |
        | reasoning_first | 83.2% |
        | hard_misleading (expert authority) | 49.5% |

        That's a **41-point drop** from direct to expert authority pressure.

        ## Schema

        | Column | Type | Description |
        |--------|------|-------------|
        | qid | string | Question ID (joins to pressure-bench-questions-v1) |
        | condition | string | direct / reasoning_first / hard_misleading |
        | domain | string | Broad domain |
        | subdomain | string | Fine-grained subdomain |
        | correct_option | string | Ground-truth answer (A or B) |
        | model_chose | string | Model's answer |
        | is_correct | bool | Whether model chose correctly |
        | repeat_idx | int | Repeat index (0–9) |

        ## Methodology note

        Each question was repeated 10 times per condition (n_repeats=10) to estimate
        per-question accuracy distributions. The hard_misleading condition injects a
        fictitious credentialed expert asserting the wrong answer.

        ## Citation

        ```bibtex
        @dataset{{junesdata2025pressurebenchresults,
          title={{Pressure-Bench Results: LLM Sycophancy Under Expert Authority Pressure}},
          author={{junesdata}},
          year={{2025}},
          url={{https://huggingface.co/datasets/15juneee/pressure-bench-results-v1}},
          license={{CC-BY-4.0}}
        }}
        ```

        ## Related

        - Questions: [15juneee/pressure-bench-questions-v1](https://huggingface.co/datasets/15juneee/pressure-bench-questions-v1)
        - Original pilot dataset: [junesdata/llm-sycophancy-gpqa](https://huggingface.co/datasets/junesdata/llm-sycophancy-gpqa)
    """).strip()

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        df.to_parquet(tmp / "results.parquet", index=False)
        (tmp / "README.md").write_text(readme)

        api.create_repo(repo_id=repo_id, repo_type="dataset", exist_ok=True)
        api.upload_folder(
            folder_path=str(tmp),
            repo_id=repo_id,
            repo_type="dataset",
        )

    url = f"https://huggingface.co/datasets/{repo_id}"
    print(f"[results] Published {len(df)} rows → {url}")
    return url


if __name__ == "__main__":
    print("Publishing pressure-bench datasets to Hugging Face...\n")
    q_url = publish_questions()
    r_url = publish_results()
    print(f"\nDone.")
    print(f"  Questions: {q_url}")
    print(f"  Results:   {r_url}")
