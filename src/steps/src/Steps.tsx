import {
  type ExtractPropTypes,
  type PropType,
  type Ref,
  type Slots,
  type VNode,
  type VNodeChild,
  defineComponent,
  h,
  provide
} from 'vue'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import { useConfig, useRtl, useTheme } from '../../_mixins'
import { createInjectionKey, flatten, getSlot } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { StepsTheme } from '../styles'
import { stepsLight } from '../styles'
import style from './styles/index.cssr'

function stepWithIndex(step: VNodeChild, i: number): VNode | null {
  if (typeof step !== 'object' || step === null || Array.isArray(step)) {
    return null
  }
  if (!step.props)
    step.props = {}
  step.props.internalIndex = i + 1
  return step
}

function stepsWithIndex(steps: VNodeChild[]): Array<VNode | null> {
  return steps.map((step, i) => stepWithIndex(step, i))
}

export const stepsProps = {
  ...(useTheme.props as ThemeProps<StepsTheme>),
  current: Number,
  status: {
    type: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
    default: 'process'
  },
  size: {
    type: String as PropType<'small' | 'medium'>,
    default: 'medium'
  },
  vertical: Boolean,
  'onUpdate:current': [Function, Array] as PropType<
    MaybeArray<(current: number) => void>
  >,
  onUpdateCurrent: [Function, Array] as PropType<
    MaybeArray<(current: number) => void>
  >
}

export interface StepsInjection {
  props: ExtractPropTypes<typeof stepsProps>
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<StepsTheme>>
  stepsSlots: Slots
}

export type StepsProps = ExtractPublicPropTypes<typeof stepsProps>

export const stepsInjectionKey = createInjectionKey<StepsInjection>('n-steps')

export default defineComponent({
  name: 'Steps',
  props: stepsProps,
  setup(props, { slots }) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const rtlEnabledRef = useRtl('Steps', mergedRtlRef, mergedClsPrefixRef)
    const themeRef = useTheme(
      'Steps',
      '-steps',
      style,
      stepsLight,
      props,
      mergedClsPrefixRef
    )
    provide(stepsInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      stepsSlots: slots
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef
    }
  },
  render() {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-steps`,
          this.rtlEnabled && `${mergedClsPrefix}-steps--rtl`,
          this.vertical && `${mergedClsPrefix}-steps--vertical`
        ]}
      >
        {stepsWithIndex(flatten(getSlot(this)))}
      </div>
    )
  }
})
