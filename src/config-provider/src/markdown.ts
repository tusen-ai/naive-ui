export interface MarkdownProcessor {
  parse: (value: string) => unknown
  runSync?: (tree: unknown) => unknown
}
