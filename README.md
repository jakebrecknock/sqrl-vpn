# SQrL site

A static site about building the SQrL VPN, made with [Hugo](https://gohugo.io)
and the [Docsy](https://www.docsy.dev) theme. It deploys to GitHub Pages.

## Preview it on your computer

You need Node.js (which includes npm). From this folder:

```sh
npm install        # one time: installs Hugo, Docsy and Dart Sass into node_modules/
npm run serve      # then open http://localhost:1313
```

The page reloads by itself whenever you save a file. Press Ctrl+C to stop.

> Running plain `hugo server` with your own Hugo also works, but only if it is
> Hugo **extended** 0.160.1 or newer **and** Dart Sass is installed
> (`brew install sass/sass/sass`). `npm run serve` sidesteps both.

## Where to write

| Tab / section        | File                            |
| -------------------- | ------------------------------- |
| Home: About Us       | `content/_index.md`             |
| Tech                 | `content/tech/_index.md`        |
| Competencies (intro) | `content/competencies/_index.md` |
| Required competencies | `content/competencies/required/<category>/<name>.md` |
| Advanced competencies | `content/competencies/advanced/<category>/<name>.md` |

Each competency page lists its questions as headings. Write your answer on the
blank lines under each question (where the `<!-- Your answer ... -->` comment
is). The Home and Tech pages have `WRITE ... HERE` comments and placeholder
text to replace. Everything is Markdown.

To add an image, put it in `assets/images/` and write
`![alt text](/images/name.png)`. To link to another page on the site, link to its
file, e.g. `[Security](/competencies/advanced/development/security)`. Both then work on GitHub Pages too.

The homepage title area (the "SQrL" hero), the cards and the fonts are styled
in `assets/scss/_styles_project.scss`. The small "The build log" label and the
line under the title are plain text in `content/_index.md`, so edit them there.


## Publish to GitHub Pages

1. Move the deploy workflow into place (it has to live in a hidden
   `.github/workflows/` folder), then create a new repository on GitHub and push
   this folder to its `main` branch:

   ```sh
   mkdir -p .github/workflows && mv deploy.yml .github/workflows/deploy.yml
   git init -b main
   git add .
   git commit -m "SQrL site"
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. On GitHub, open the repo's **Settings → Pages** and set **Source** to
   **GitHub Actions**.

3. Every push to `main` now rebuilds and publishes the site (see the
   **Actions** tab). The site lives at `https://USERNAME.github.io/REPO/`.
   Share that link (or the repo link) with your professor.

## Files you probably won't need to touch

- `hugo.yaml` – site title, top-nav tabs, theme settings
- `assets/scss/_variables_project.scss` – theme colors and fonts
- `assets/scss/_styles_project.scss` – custom styles (hero, cards, navbar)
- `layouts/_partials/hooks/head-end.html` – loads the fonts (Space Grotesk for
  headings, Inter for text) from Google Fonts
- To add your own logo next to "SQrL" in the navbar, save it as
  `assets/icons/logo.svg` and set `navbar_logo: true` in `hugo.yaml`
- `assets/js/sqrl.js` – the interactive bits: scroll animations, the map demo,
  reading progress bar, back-to-top button, and ← / → page navigation
- `layouts/_shortcodes/server-map.html` – the clickable server map on the homepage
  (city latencies are sample data); the map image is `static/images/world-dots.svg`
- `layouts/_shortcodes/architecture.html` – the diagram on the Tech page
- `layouts/_partials/footer.html`, `section-index.html`, `page-meta-lastmod.html`
  and `sqrl/` – footer, card-style section lists and the previous/next bar
- `layouts/_shortcodes/competency-cards.html` – builds the competency cards on
  the homepage and Competencies page from the files in `content/competencies/`,
  so a new competency page shows up there automatically
- `layouts/_partials/navbar.html` – Docsy's navbar with a fix so the Home tab
  is only highlighted on the home page
- `scripts/bin/sass` – points Hugo at the Dart Sass compiler from npm
- `.github/workflows/deploy.yml` (starts as `deploy.yml`, see above) – the GitHub Pages build
