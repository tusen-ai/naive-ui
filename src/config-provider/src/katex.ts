/**
 * Minimal katex-compatible types used by Naive UI.
 * katex itself is optional and must be provided by the user.
 */
export type KatexOptions = Record<string, unknown>

export interface Katex {
  renderToString: (equation: string, options?: KatexOptions) => string
}
