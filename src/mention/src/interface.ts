import type { SelectBaseOption } from '../../select/src/interface'

export type MentionOption = SelectBaseOption<string>

export interface MentionInst {
  focus: () => void
  blur: () => void
}
