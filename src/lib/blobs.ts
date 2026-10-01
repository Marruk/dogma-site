const NUMBER = /-?\d*\.?\d+/g;

interface WobbleOptions {
  /** How far points may move toward the middle, as a fraction of the box. */
  amount?: number;
  /** Only move points sideways, and not at all at the top and bottom edge. */
  keepTopAndBottom?: boolean;
}

/**
 * A gently deformed copy of a blob path drawn in a 0..1 box
 * (clipPathUnits="objectBoundingBox"), to animate between.
 *
 * Every point, curve handles included, is pulled toward the middle of the box
 * by an amount that varies smoothly around the blob. Neighbouring points move
 * almost the same way, so curves stay smooth, and the blob only ever shrinks,
 * so it never outgrows its box. Increasing `phase` moves the wave around the
 * blob; it comes back to the same shape every 2π, so stepping through one full
 * turn makes a seamless loop.
 * The result has the same commands as `d`, which SVG needs to morph between them.
 */
export function wobble(d: string, phase: number, { amount = 0.06, keepTopAndBottom = false }: WobbleOptions = {}) {
  const numbers = d.match(NUMBER)!.map(Number);
  const moved: number[] = [];
  for (let i = 0; i < numbers.length; i += 2) {
    const [x, y] = [numbers[i], numbers[i + 1]];
    const angle = Math.atan2(y - 0.5, x - 0.5);
    // A smooth wave around the blob, between 0 and 1.
    const wave = (Math.sin(2 * angle + phase) + 0.6 * Math.sin(3 * angle + 2 * phase) + 1.6) / 3.2;
    const shrink = amount * wave;
    if (keepTopAndBottom) {
      const weight = Math.max(0, 1 - (2 * y - 1) ** 2);
      moved.push(0.5 + (x - 0.5) * (1 - shrink * weight), y);
    } else {
      moved.push(0.5 + (x - 0.5) * (1 - shrink), 0.5 + (y - 0.5) * (1 - shrink));
    }
  }
  let i = 0;
  return d.replace(NUMBER, () => moved[i++].toFixed(3));
}
