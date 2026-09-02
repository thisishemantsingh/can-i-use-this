# Contributing

Thanks for taking a look. This is a static, dependency-free prototype — you only need a browser and
a text editor.

## Getting set up

```bash
git clone https://github.com/thisishemantsingh/can-i-use-this.git
cd can-i-use-this
python3 -m http.server 8080   # then open http://localhost:8080
```

There is no build step, no package manager and no test runner. Edit the file, reload the page.

## Where things live

| Change | File |
| --- | --- |
| Markup, page sections, form fields | `index.html` |
| Colours, type, components, responsive rules | `assets/css/styles.css` |
| Sample works, trends, tracks, legal sources | `assets/js/data.js` |
| Router, filtering, player state, scoring engine | `assets/js/app.js` |

## Conventions

- Vanilla HTML, CSS and JavaScript. Please do not add a framework, a bundler or runtime
  dependencies — the zero-dependency constraint is deliberate.
- Use the CSS custom properties in `:root` rather than hard-coding colours or radii.
- Keep every user-facing string escaped through the `esc()` helper when injecting into HTML.
- Match the surrounding comment density and naming style.
- Keep the interface accessible: labelled controls, visible focus states, and no colour-only
  signalling.

## Changing the legal content

This is the part that matters most.

- Cite the statute, section or official guidance page you are relying on in your pull request.
- Keep the language plain and non-advisory. The project describes what the law says and flags risk;
  it never tells a user that a use is cleared.
- Do not remove or soften the disclaimers. Every page that returns a risk signal must keep them.
- If you add a jurisdiction, add it to `LEGAL_SOURCES` in `assets/js/data.js`, to the
  `#cJurisdiction` select in `index.html`, to any jurisdiction-specific rules in `scoreOf()` and
  `actionItems()`, and to the table in the README.

## Sample data

Records in `assets/js/data.js` are fictional by design. Please do not add real works, real artists
or real campaign metadata — implying a licence for a work whose rights we have not verified is
exactly the problem this project is trying to help people avoid.

## Pull requests

- One focused change per pull request.
- Check the four pages at desktop and mobile widths, and tab through any control you touched.
- Describe what you changed and why. Screenshots help for visual changes.
