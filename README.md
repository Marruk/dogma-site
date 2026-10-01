# DOGMA Theatersport Utrecht

Website for [dogma-utrecht.nl](https://dogma-utrecht.nl): a static [Astro](https://astro.build) site with React and Tailwind, edited through [Pages CMS](https://pagescms.org) and deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
npx astro check   # type-check
```

Requires Node 22.12 or newer.

## Where things live

| Path | What |
|---|---|
| `src/content/pages/` | Text, photo and SEO fields for home, agenda, spelers and contact |
| `src/content/events/` | One file per show. Past shows are hidden automatically. |
| `src/content/players/` | One file per player, listed alphabetically by name |
| `src/data/site.json` | Club name, default description, email and social links |
| `src/assets/images/` | Photos. Astro resizes them and converts them to WebP at build time. |
| `src/components/NextShow.tsx` | React island: the next show plus a live countdown |
| `.pages.yml` | Pages CMS configuration (the editor forms) |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages |

Content files reference images with a relative path (`../../assets/images/foo.jpg`). That path is what lets Astro optimise them, and Pages CMS writes it the same way.

## Content editing (Pages CMS)

1. Push this repository to GitHub.
2. Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub and open the repository.
3. Invite editors by email from the repository's settings in Pages CMS. They don't need a GitHub account.

Each save is a commit to `main`, which triggers a deploy. Changes are live after about a minute.

## Deployment (GitHub Pages)

Every push to `main` builds and deploys the site. The workflow also runs every night, so past shows drop off the agenda even when nobody edits anything.

Until the domain is switched over, the site runs at the test address <https://marruk.github.io/dogma-site/> (`site` and `base` in `astro.config.mjs`), which search engines are told not to index. To go live on dogma-utrecht.nl, set `site: 'https://dogma-utrecht.nl'`, remove `base`, and do the setup below.

One-time setup:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain:** `dogma-utrecht.nl`. When deploying through Actions, this setting replaces a `CNAME` file.
3. Verify the domain under your account's **Settings → Pages → Verified domains**. This adds a TXT record at one.com.
4. DNS at one.com: point the website records to GitHub and **leave MX and TXT (email) untouched**:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | AAAA | @ | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | CNAME | www | `<github-username>.github.io.` |

5. Once the certificate has been issued, enable **Enforce HTTPS**.
6. Add the domain to [Google Search Console](https://search.google.com/search-console) and submit `https://dogma-utrecht.nl/sitemap-index.xml`.

Notes:

- GitHub pauses scheduled workflows in repositories with no activity for 60 days. Any CMS edit or push re-enables them. The countdown on the homepage checks the date in the visitor's browser either way.
- Old links such as `index.php?link=agenda` land on the 404 page, which forwards them to the new URL.

### Hosting on one.com instead

The site itself doesn't change. Replace the deploy job with an SFTP upload of `dist/` (for example `SamKirkland/FTP-Deploy-Action` with `protocol: ftps`, or `rsync` over SSH), and turn the legacy `index.php?link=…` forwarding into `.htaccess` 301 redirects.
