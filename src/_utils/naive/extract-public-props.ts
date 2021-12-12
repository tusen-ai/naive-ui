import { ExtractPropTypes } from 'vue'
import { useTheme } from '../../_mixins'

type themePropKeys = keyof typeof useTheme.props

export type ExtractPublicPropTypes<T> = Omit<
Partial<ExtractPropTypes<T>>,
| Exclude<themePropKeys, 'themeOverrides'>
| Extract<keyof T, `internal${string}`>
>

export type ExtractInternalPropTypes<T> = Partial<ExtractPropTypes<T>>
