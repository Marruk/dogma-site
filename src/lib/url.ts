/**
 * A link to a page or file on this site, with the configured `base` path in
 * front: url('/agenda/') is '/dogma-site/agenda/' on the test address and
 * '/agenda/' on dogma-utrecht.nl. Use it for every internal link.
 */
export function url(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
