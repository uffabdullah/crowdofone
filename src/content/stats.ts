/**
 * Placeholder figures for the marketing site and the demo crowd.
 * These are not measured product benchmarks. Edit them here when real
 * timings and crowd sizes are known. The speed section and the demo
 * counter both read from this file.
 */

/** Personas in one full crowd. */
export const CROWD_SIZE = 5_000

/**
 * How long the demo counts up before it reveals the sample readout.
 * Long enough to watch. Not a real GPU run.
 */
export const DEMO_RUN_MS = 4_200

export const SPEED = {
  /** Duration label for the parallel GPU run. */
  gpuDuration: 'under a minute',
  /** Duration label for a one-at-a-time run. */
  sequentialDuration: 'hours',
  /**
   * Relative lengths of the time-to-finish bars, out of 100.
   * Shorter means faster. Placeholder, not to scale with wall-clock time.
   */
  gpuBar: 24,
  sequentialBar: 100,
} as const

export function formatCount(value: number) {
  return value.toLocaleString('en-US')
}
