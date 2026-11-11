# LeonSong1995.github.io

Personal academic homepage of Liyang Song — plain HTML/CSS/JS, no build step.

Layout borrows the academic structure of [heqin-zhu.github.io](https://heqin-zhu.github.io)
(sidebar profile, About / News / badge-tagged publications) and the terminal look of
[wjwei.vercel.app](https://wjwei.vercel.app/) (cream & coral palette, `./nav` pills,
typed `--help` intro, dark-mode toggle).

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All content: bio, news, publications, software, education, honors, talks |
| `assets/style.css` | Theme tokens (light / dark), layout, responsive rules |
| `assets/main.js` | Dark-mode toggle, typed terminal intro, live GitHub star counts, scroll-spy |
| `assets/avatar.jpg` | Profile photo (480 × 480) |
| `files/` | (empty for now) drop a public CV here as `LiyangSong_CV.pdf`, then uncomment the two CV links in `index.html` |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Editing

- **Bio / news / papers** — edit the matching `<section>` in `index.html`.
- **Terminal intro text** — edit the `lines` array at the top of `assets/main.js`.
- **Colours** — the `:root` and `:root[data-theme="dark"]` blocks at the top of `assets/style.css`.
- **Venue badge colours** — the `.badge .v-*` rules; add a class per journal.
- **Star counts** — any element with `data-stars="owner/repo"` is updated live from the GitHub API; the number in the HTML is the offline fallback.

## Preview locally

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765>.

## Deploy to GitHub Pages

1. Create a **public** repository named exactly `LeonSong1995.github.io`.
2. Push this folder to its `main` branch.
3. On GitHub: *Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `/ (root)`*.
4. The site appears at <https://LeonSong1995.github.io> within a minute or two.
