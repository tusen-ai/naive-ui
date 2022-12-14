import { ExtractPropTypes } from 'vue'
import { useTheme } from '../../_mixins'

type themePropKeys = keyof typeof useTheme.props

export type RemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key]
}

export type ExtractPublicPropTypes<T> = Omit<
Partial<RemoveReadonly<ExtractPropTypes<T>>>,
| Exclude<themePropKeys, 'themeOverrides'>
| Extract<keyof T, `internal${string}`>
>

export type ExtractInternalPropTypes<T> = Partial<ExtractPropTypes<T>>
