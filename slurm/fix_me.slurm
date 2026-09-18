#!/bin/bash
#SBATCH --job-name=fix-me
#SBATCH --partition=normal
#SBATCH --output=logs/fix_me_%j.out
#SBATCH --error=logs/fix_me_%j.err
#SBATCH --time=00:05:00
#SBATCH --mem=2G
#SBATCH --cpus-per-task=1
#SBATCH --mail-type=ALL
#SBATCH --mail-user=daniamlo@stanford.edu

cd $HOME/yens-onboarding-2026
source .venv/bin/activate
python scripts/extract_form_3_batch.py
