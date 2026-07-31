# Mapping the Cancer Research Attention Gap — Project Site

A single-page analytics site presenting the Composite Attention Gap Score framework:
a screening tool comparing cancer research attention (publications + clinical trials)
against disease burden (incidence, mortality, survival) across 16 cancer types, 2019–2023.

## File structure

```
index.html              — full site (hero, snapshot, methodology, findings,
                           recommendations, charts, supporting analyses, footer)
assets/css/styles.css   — design tokens + all component/layout styles
assets/js/main.js       — hero cell-network canvas animation + scroll reveals
outputs/                — chart PNGs referenced by the Visual Analytics section
                           (already present in this repo; filenames must match
                           what index.html expects — see below)
```

## Chart images expected in `outputs/`

- `component_level_attention_gap_comparison.png`
- `02_component_level_attention_gaps.png`
- `03_burden_vs_attention_scatter.png`
- `04_burden_rank_vs_attention_rank_dumbbell.png`
- `05_correlation_heatmap.png`
- `07_tfidf_terms_under_attended.png`
- `08_silhouette_scores_by_k.png`
- `13_advanced_dumbbell_rank_chart.png`

If a filename doesn't match exactly, that chart card will show broken-image
alt text but the rest of the page is unaffected.

## Running locally

No build step — it's static HTML/CSS/JS.

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying to GitHub Pages

1. Push this repo to GitHub (or push to your existing
   `cancer-research-attention-gap` repo).
2. In **Settings → Pages**, set the source to the `main` branch, root folder.
3. The site will publish at `https://<username>.github.io/cancer-research-attention-gap/`.

## Notes on tone

The copy throughout intentionally avoids stating that any cancer type is
"definitely underfunded" or that lower-gap cancers (e.g. Lung, Pancreatic) are
"low priority" — the framework is presented as a screening tool for directing
expert review, not a funding directive. See the caution banner in the
Recommendations section and the footnote under Key Findings.
