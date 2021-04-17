import {
  h,
  defineComponent,
  VNode,
  provide,
  PropType,
  VNodeChild,
  InjectionKey,
  ExtractPropTypes,
  Ref
} from 'vue'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import { useConfig, useTheme } from '../../_mixins'
import { stepsLight } from '../styles'
import style from './styles/index.cssr'
import { ExtractPublicPropTypes, getSlot } from '../../_utils'
import type { StepsTheme } from '../styles'

function stepWithIndex (step: VNodeChild, i: number): VNode | null {
  if (typeof step !== 'object' || step === null || Array.isArray(step)) {
    return null
  }
  if (!step.props) step.props = {}
  step.props.internalIndex = i + 1
  return step
}

function stepsWithIndex (steps: VNodeChild[]): Array<VNode | null> {
  return steps.map((step, i) => stepWithIndex(step, i))
}

const stepsProps = {
  ...(useTheme.props as ThemeProps<StepsTheme>),
  current: {
    type: Number,
    default: undefined
  },
  status: {
    type: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
    default: 'process'
  },
  size: {
    type: String as PropType<'small' | 'medium'>,
    default: 'medium'
  },
  vertical: {
    type: Boolean,
    default: false
  }
}

export interface StepsInjection {
  props: ExtractPropTypes<typeof stepsProps>
  cPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<StepsTheme>>
}

export type StepsProps = ExtractPublicPropTypes<typeof stepsProps>

export const stepsInjectionKey: InjectionKey<StepsInjection> = Symbol('steps')

export default defineComponent({
  name: 'Steps',
  props: stepsProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Steps',
      'Steps',
      style,
      stepsLight,
      props,
      mergedClsPrefix
    )
    provide(stepsInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      cPrefixRef: mergedClsPrefix
    })
    return {
      cPrefix: mergedClsPrefix
    }
  },
  render () {
    const { cPrefix } = this
    return (
      <div
        class={[
          `${cPrefix}-steps`,
          this.vertical && `${cPrefix}-steps--vertical`
        ]}
      >
        {stepsWithIndex(getSlot(this))}
      </div>
    )
  }
})
