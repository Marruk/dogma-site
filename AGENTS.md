## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project notes

- Content is edited by non-developers via Pages CMS (`.pages.yml`). When changing a content schema in `src/content.config.ts`, update the matching fields in `.pages.yml` too.
- Optional fields may arrive as `""` or `null` from the CMS; wrap them with the `optional()` helper in `src/content.config.ts`.
- Event dates are plain `YYYY-MM-DD` strings (all shows are in the Netherlands) and are displayed as entered; see `src/lib/dates.ts`.
- Site text is Dutch; keep `trailingSlash: 'always'` and link with trailing slashes (`/agenda/`).
- Colors come from the tokens in `src/styles/global.css` (`page`, `card`, `ink`, `link`); `page` and `card` follow the randomly picked brand color. Use those (e.g. `bg-card`, `border-ink`) rather than fixed colors. There is no dark mode.
