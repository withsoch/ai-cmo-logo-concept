# tellme brand kit (static)

Static, non-animated logo files for tellme, built on the funky design philosophy
(`../design-philosophies/funky/README.md`). Open `index.html` in a browser to see
everything with download links.

## Which file to use where

| You need | Use |
|---|---|
| Logo on the website or in a deck | `lockups/tellme-horizontal-light.png` (or `-dark` on dark backgrounds) |
| Logo in a narrow space (social banner, poster) | `lockups/tellme-stacked-light.png` |
| Just the word | `lockups/tellme-wordmark-light.png` / `-dark.png` |
| LinkedIn company page picture | `profile-pictures/penpal-linkedin-profile-800.png` |
| Instagram profile picture | `profile-pictures/penpal-instagram-profile-800.png` |
| YouTube channel icon | `profile-pictures/penpal-youtube-profile-800.png` |
| Podcast cover corner / newsletter header | `png/penpal-podcast-1024.png`, `png/penpal-newsletter-1024.png` |
| App store icon | `app-icon/app-icon-1024.png` (square; the store rounds the corners) |
| Website favicon | `favicon/favicon.svg` plus `favicon-32.png` and `favicon-16.png` |
| iPhone home-screen icon | `favicon/apple-touch-icon-180.png` |
| Any size, design tools, print | the matching file in `svg/` |

## What's inside

- `svg/`: 12 scalable marks, Penpal and Sidekick in six versions each:
  core (face only), linkedin (pen), instagram (camera), youtube (play button),
  podcast (mic), newsletter (envelope). Transparent background.
- `png/`: the same 12 marks at 1024, 512 and 256 px, transparent.
- `profile-pictures/`: 800 x 800 squares on each channel's soft colour, with
  the character inside the circle that platforms crop to. SVG and PNG.
- `app-icon/`: 1024 px app icon on cream, plus a rounded preview.
- `favicon/`: SVG favicon, 16/32/48 px PNGs, 180 px Apple touch icon.
- `lockups/`: character + "tellme" wordmark, horizontal and stacked, light and
  dark text, transparent PNG at 2x.

## Rules of use

- **Penpal is the master brand.** Use the core face as the logo everywhere;
  use the prop versions only on their own channel.
- **Sidekick** is for people moments (team page, founder story, onboarding),
  never as a second logo.
- Don't recolour the characters, stretch them, or put them on busy photos.
  Leave clear space around a mark of at least half its height.
- Colours: orange `#ff6a3d`, butter `#ffd166`, cream `#fff6ea`,
  lilac `#c9b8ff`, ink `#2b2b38`. Wordmark font: Nunito Black (900).

## Notes

- The lockups are PNG only, because the wordmark uses the Nunito font. For a
  vector wordmark, a designer should convert the text to outlines.
- There is no `favicon.ico`; modern browsers use `favicon.svg` and the PNGs.
- To rebuild after a design change, edit and run the scripts in `_source/`
  (`generate-marks.mjs` needs the `sharp` package; `render-lockups.mjs` uses
  Google Chrome).
