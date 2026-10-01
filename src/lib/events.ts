import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Events from today onwards, soonest first. This runs at build time, so the
 * deploy workflow rebuilds the site every night to drop past shows.
 */
export async function getUpcomingEvents(): Promise<CollectionEntry<'events'>[]> {
  const today = new Date().toISOString().slice(0, 10);
  const events = await getCollection('events', ({ data }) => data.date >= today);
  return events.sort((a, b) =>
    `${a.data.date} ${a.data.time ?? ''}`.localeCompare(`${b.data.date} ${b.data.time ?? ''}`),
  );
}
