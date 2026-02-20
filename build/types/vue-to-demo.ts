export type VueApiStyle = 'composition' | 'options'
export type ScriptLanguage = 'ts' | 'js'

export interface DemoParts {
  template?: string
  script?: string
  style?: string
  title: string
  content: string
  language: ScriptLanguage
  api: VueApiStyle
}

export interface TransformedCode {
  tsCode: string
  jsCode: string
}

export interface MergedParts extends DemoParts, TransformedCode {}

export interface DemoPartsWithBuildOptions {
  parts: DemoParts
  isVue: boolean
}

export interface MergePartsWithBuildOptions extends DemoPartsWithBuildOptions {
  mergedParts: MergedParts
}
