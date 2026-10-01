// Event dates are plain calendar dates ("2026-10-25") and are shown exactly as entered.

/** YAML reads an unquoted 2026-10-25 as a Date; turn it back into "2026-10-25". */
export function toIsoDate(value: string | Date): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}

/** Dutch UTC offset on a date: "+01:00" in winter, "+02:00" in summer. */
export function dutchOffset(isoDate: string): string {
  return new Date(`${isoDate}T12:00Z`)
    .toLocaleString('en', { timeZone: 'Europe/Amsterdam', timeZoneName: 'longOffset' })
    .slice(-6); // "…GMT+01:00" → "+01:00"
}

/** "2026-10-25" → "zondag 25 oktober 2026" */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('nl-NL', { dateStyle: 'full', timeZone: 'UTC' });
}
