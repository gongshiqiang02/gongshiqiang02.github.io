# Shiqiang Gong · Academic Homepage

A responsive academic homepage for Shiqiang Gong at Northwestern Polytechnical University (NWPU), focused on 3D vision. Built with HTML, CSS, and vanilla JavaScript; no installation or build step is required.

## Local preview

From the repository directory, run:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Personalize

- **Profile, email, GitHub, and publications:** edit `content.js`.
- **Portrait:** add your photo under `assets/` and set `portrait` in `content.js`. The monogram is used until a photo is provided.
- **Biography and bilingual page copy:** edit the `translations` object in `script.js`. The English HTML in `index.html` also provides readable initial content without JavaScript.
- **Colors, fonts, and layout:** edit `styles.css`.

The email address is preserved exactly as supplied: `gongshiqiang@mali.nwpu.edu.cn`.

## Publications

The publication list is intentionally empty. Add real entries to `publications` in `content.js` using the documented schema. Search, year filters, optional abstract disclosures, paper/code links, and BibTeX copying appear when entries are added. Entries are sorted newest first. Omit any unavailable fields.

## GitHub Pages

The repository is ready for GitHub Pages. Push the files, then in **Settings → Pages**, select **Deploy from a branch**, choose the branch containing these files, and select **/(root)**. No deployment has been performed by this implementation.

## Features

- Responsive desktop and mobile layouts
- English by default, with a Chinese toggle and optional local language preference
- Accessible navigation, visible keyboard focus, and reduced-motion support
- Email link and clipboard copying with failure feedback
- Configurable publications with BibTeX dialogs
- Print stylesheet and SVG favicon

Google Fonts are optional: system serif and sans-serif fallbacks work if the font service is unavailable. All scripts, illustrations, and other assets are served locally.
