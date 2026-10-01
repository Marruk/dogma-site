import { useEffect, useState } from 'react';
import { url } from '../lib/url';

export interface Show {
  title: string;
  /** "YYYY-MM-DD" */
  date: string;
  dateLabel: string;
  time?: string;
  venue: string;
  ticketUrl?: string;
}

interface Props {
  shows: Show[];
}

function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 86_400_000);
}

/**
 * The next show plus a countdown. The build renders the next show as plain
 * HTML (good for SEO); in the browser it re-checks against the visitor's date
 * and adds the countdown, so the page stays correct between rebuilds.
 */
export default function NextShow({ shows }: Props) {
  const [today, setToday] = useState<string | null>(null);

  // The en-CA locale formats dates as "YYYY-MM-DD", in the visitor's own timezone.
  useEffect(() => setToday(new Date().toLocaleDateString('en-CA')), []);

  const upcoming = today ? shows.filter((show) => show.date >= today) : shows;
  const next = upcoming[0];

  if (!next) {
    return (
      <p className="font-bold">
        Check onze <a href={url('/agenda/')}>agenda</a> voor alle volgende shows!
      </p>
    );
  }

  const daysLeft = today ? daysBetween(today, next.date) : null;

  return (
    <section aria-labelledby="next-show" className="rounded-lg bg-surface p-6 shadow-lg">
      {daysLeft !== null ? (
        <p className="mb-3 font-bold duration-100 motion-safe:animate-in motion-safe:fade-in">
          {daysLeft === 0
            ? '🎭 DOGMA speelt vandaag! 🎭'
            : `Over ${daysLeft} ${daysLeft === 1 ? 'dag' : 'dagen'} is onze volgende voorstelling! 🎭`}
        </p>
      ) : (
        <p className="mb-3 font-bold">&nbsp;</p>
      )}
      <h2 id="next-show" className="text-lg font-bold">
        {next.title}
      </h2>
      <p className="first-letter:uppercase">
        {next.dateLabel}
        {next.time && `, ${next.time}`} · {next.venue}
      </p>
      {next.ticketUrl && (
        <p className="mt-2">
          <a href={next.ticketUrl} target="_blank" rel="noopener" className="font-bold underline">
            Kaartjes en meer info
          </a>
        </p>
      )}
    </section>
  );
}
