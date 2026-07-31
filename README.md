# Mapping the Cancer Research Attention Gap Using Unsupervised Learning

## Project Overview

This project analyzes whether cancer research attention is aligned with disease burden across sixteen major cancer types from 2019 to 2023.

We built a data-driven screening framework that compares disease burden with research attention. Disease burden is measured using incidence, mortality, and five-year survival. Research attention is measured using PubMed publication counts and ClinicalTrials.gov clinical trial counts.

The goal is not to prove that any cancer type is underfunded. Instead, this project identifies where disease burden and measured research attention appear least aligned, helping research funding agencies and public health decision-makers focus expert review capacity more effectively.

## Research Question

Are cancer research resources aligned with the burden of disease?

## Data Sources

This project uses publicly available data from:

- SEER Cancer Stat Facts
- ClinicalTrials.gov
- PubMed / NCBI

## Dataset

The final dataset includes:

- 16 major cancer types
- 2019–2023 analysis period
- 80 cancer-year observations

Cancer type is used as the final unit of analysis. Rate-based variables such as incidence, mortality, and five-year survival were averaged across years. Count-based variables such as publications and clinical trials were summed across years.

## Methodology

The project uses a combination of unsupervised learning, ranking-based scoring, and text analysis methods:

- Percentile-rank normalization
- Composite Attention Gap Score
- Component-level sensitivity checks
- Correlation analysis
- K-means clustering
- TF-IDF theme exploration

The main metric is the Composite Attention Gap Score:

Attention Gap Score = Burden Score - Research Attention Score

Burden Score combines incidence, mortality, and lower five-year survival. Research Attention Score combines PubMed publications and ClinicalTrials.gov trials.

A positive score suggests that disease burden appears higher than measured research attention. A near-zero score suggests relative alignment. A negative score suggests that measured research attention meets or exceeds burden within this dataset.

## Key Findings

The analysis found that:

- Brain Cancer showed the largest positive Attention Gap Score.
- Non-Hodgkin Lymphoma showed the second-largest positive gap and remained positive across incidence, mortality, and survival components.
- Prostate Cancer and Kidney Cancer showed moderate positive gaps.
- Lung Cancer and Pancreatic Cancer remain clinically important, but appeared relatively balanced or higher-attention under this model.
- Thyroid Cancer, Bladder Cancer, and Leukemia showed the strongest inverse pattern, where measured attention met or exceeded measured burden.

## Decision-Maker Interpretation

This project is designed as a screening tool, not a funding directive.

The results can help research funding agencies identify cancer types that may warrant closer expert review. However, final funding decisions require additional evidence, including direct funding data, clinical expertise, trial pipeline information, subtype-level analysis, patient access data, and treatment outcome trends.

## Tools and Technologies

- Python
- pandas
- NumPy
- scikit-learn
- matplotlib
- seaborn
- TF-IDF vectorization
- K-means clustering
- Jupyter Notebook
- Microsoft Word
- Microsoft PowerPoint

## Repository Structure

```text
analysis_notebooks/   Working and final analysis notebooks
data/                 Cleaned and processed datasets
outputs/              Charts and tables generated from the analysis
report/               Final written report
presentation/         Final presentation deck and speech script
```

## Project Deliverables

- Final analysis notebook
- Working analysis notebook
- Cleaned dataset
- Processed analysis tables
- Final charts
- Final written report
- Final presentation deck
- Presentation speech script

## Limitations

This analysis uses publication counts and clinical trial counts as proxy indicators of research attention. These measures do not directly capture funding amount, research quality, patient access, clinical outcomes, industry investment, or trial enrollment size.

Cancer categories are broad and may hide important subtype-level differences. The Attention Gap Score is relative within this sixteen-cancer dataset and should be interpreted as a preliminary prioritization signal rather than definitive evidence of underinvestment.

## Authors

Group 2  
Columbia University  
APANPS5205 — Applied Analytics Frameworks and Methods II

- Claudia Orisakwe
- Farzana Khan Moutushi
- Simran Chawla
- Wen Jiang
