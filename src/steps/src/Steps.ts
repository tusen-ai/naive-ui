import { h, defineComponent, VNode, provide, PropType, VNodeChild } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps, ThemePropsReactive } from '../../_mixins'

import { getSlot } from '../../_utils'
import { StepsTheme } from '../styles'

function stepWithIndex (step: VNodeChild, i: number): VNode | null {
  if (typeof step !== 'object' || step === null || Array.isArray(step)) { return null }
  if (!step.props) step.props = {}
  step.props.index = i + 1
  return step
}

function stepsWithIndex (steps: VNodeChild[]): Array<VNode | null> {
  return steps.map((step, i) => stepWithIndex(step, i))
}

export interface StepsInjection extends ThemePropsReactive<StepsTheme> {
  current: number | undefined
  vertical: boolean
  status: 'process' | 'finish' | 'error' | 'wait'
  size: 'small' | 'medium'
}

export default defineComponent({
  name: 'Steps',
  provide () {
    return {
      NSteps: this
    }
  },
  props: {
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
  },
  setup (props) {
    provide<StepsInjection>('NStep', props)
  },
  render () {
    return h(
      'div',
      {
        class: [
          'n-steps',
          {
            'n-steps--vertical': this.vertical
          }
        ]
      },
      stepsWithIndex(getSlot(this))
    )
  }
})
