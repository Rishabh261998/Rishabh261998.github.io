# rishabh261998.github.io

Personal portfolio of Rishabh Sanjay, served by GitHub Pages at https://rishabh261998.github.io.

The site is a small, dependency-free Jekyll build: no theme gem, no jQuery, a few SCSS partials and one script for the theme toggle and navigation.

## Editing content

Almost everything on the home page is data-driven, so updates rarely touch HTML:

| What | File |
| --- | --- |
| Name, role, location, links, resume path | `_config.yml` (`author:` block) |
| Work experience | `_data/experience.yml` |
| Research projects | `_data/research.yml` |
| Publications | `_data/publications.yml` |
| Projects | `_data/projects.yml` |
| External writing (Cekura blog, Medium) | `_data/writing.yml` |
| Skills | `_data/skills.yml` |
| Education | `_data/education.yml` |
| Navigation | `_data/navigation.yml` |
| Intro / about paragraphs | `index.html` |
| Blog posts | `_posts/YYYY-MM-DD-title.md` |
| Resume PDF | `files/Rishabh_Sanjay_Resume.pdf` |
| Profile photo | `images/profile.jpg` |

Styles live in `_sass/` (`_tokens.scss` holds the light/dark colour tokens) and are compiled from `assets/css/main.scss`.

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000. GitHub Pages builds the `master` branch automatically on push.
