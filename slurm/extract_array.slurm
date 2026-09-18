#!/bin/bash
#SBATCH --job-name=form3-extract-array
#SBATCH --partition=normal
#SBATCH --output=logs/extract_%A_%a.out
#SBATCH --error=logs/extract_%A_%a.err
#SBATCH --time=00:06:00
#SBATCH --mem=1G
#SBATCH --cpus-per-task=1
#SBATCH --array=0-495
#SBATCH --mail-type=ALL
#SBATCH --mail-user=daniamlo@stanford.edu

# Navigate to your project
cd $HOME/yens-onboarding-2026

# Activate your virtual environment
source .venv/bin/activate

python scripts/extract_array.py "$SLURM_ARRAY_TASK_ID"
