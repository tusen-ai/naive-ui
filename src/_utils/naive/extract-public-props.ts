import { ExtractPropTypes } from '@vue/runtime-core'
import { useTheme } from '../../_mixins'

type themePropKeys = keyof typeof useTheme.props

export type ExtractPublicPropTypes<T> = Omit<
Partial<ExtractPropTypes<T>>,
themePropKeys
>
