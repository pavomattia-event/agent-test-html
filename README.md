# agent-test-html

Simple HTML + JavaScript todo list page.

## Run locally

Open `/home/runner/work/agent-test-html/agent-test-html/index.html` in a browser, or serve the folder with:

```bash
python -m http.server 8000
```

Then visit `http://127.0.0.1:8000/index.html`.

## Publish on GitHub Pages

This repository now includes a workflow at `/home/runner/work/agent-test-html/agent-test-html/.github/workflows/pages.yml` that deploys the site to GitHub Pages on every push to `main`.

To enable publishing:

1. Open the repository settings on GitHub.
2. Go to **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).