import { type GlobalTheme } from '../config-provider'

export type BuiltInGlobalTheme = Omit<
Required<GlobalTheme>,
'InternalSelectMenu' | 'InternalSelection'
>
