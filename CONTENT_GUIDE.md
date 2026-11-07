# Updating the website (no coding needed)

Every piece of text on the site lives in **`src/content/`** (Arabic and English side by side)
and **`src/config/site.ts`** (links). Edit these files on GitHub (pencil icon → "Commit changes")
and the site redeploys automatically in ~2 minutes.

**Find all placeholders:** search the project for `[Add` and `[أضف` (and `VERIFY` for name spellings).

| I want to…                         | Edit this file                  |
|------------------------------------|---------------------------------|
| Change the Join form / social links | `src/config/site.ts`            |
| Add or change a news headline       | `src/content/news.ts`           |
| Update the board / coaches / members | `src/content/team.ts`          |
| Add an achievement or change numbers | `src/content/achievements.ts`  |
| Edit About / Vision / Mission / Join steps | `src/content/sections.ts` |
| Add member quotes                   | `src/content/quotes.ts`         |
| Change quiz questions               | `src/content/quiz.ts`           |
| Menu and button labels              | `src/content/ui.ts`             |

## Rules of thumb
- Every text is `{ ar: '…', en: '…' }` — always fill **both**.
- Keep the quotes `'…'` and commas. If a text contains `'`, write it as `’` instead.
- **Images:** put files in `public/images/` (team photos in `public/images/team/`), then write
  the path without a leading slash, e.g. `image: 'images/my-photo.webp'`.
  - News photos: wide landscape, at least 1600px wide, WebP or JPG under ~300 KB.
  - Team photos: square, ~400×400.
  - Missing image? The site shows a branded placeholder / initials — never a broken image.

## When the new team is formed
The site currently shows **no names** for the High Board, Coaches or Members.
- **High Board:** in `src/content/team.ts` each role is listed with no name, and its card says "Announced soon".
  Add a name to a role: `{ role: {…}, name: { ar: '…', en: '…' } }`.
- **Coaches / Members:** the lists are empty (`people: []`), and a "coming soon" note with a Join button is shown.
  Add people as `{ name: { ar: '…', en: '…' }, role: { ar: 'فريق التدريب', en: 'Coach' } }`.
- **Quotes section** is hidden until you add real quotes in `src/content/quotes.ts`.

## Original files
`assets/` keeps the original logos and photos. Optimized copies used by the site are in `public/images/`.
