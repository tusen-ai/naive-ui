import {
  h,
  defineComponent,
  computed,
  inject,
  PropType,
  CSSProperties
} from 'vue'
import {
  CheckmarkIcon as FinishedIcon,
  CloseIcon as ErrorIcon
} from '../../_internal/icons'
import { useTheme } from '../../_mixins'
import { NIconSwitchTransition, NBaseIcon } from '../../_internal'
import { createKey } from '../../_utils'
import { stepsLight } from '../styles'
import type { StepsInjection } from './Steps'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Step',
  props: {
    status: {
      type: String as PropType<
      'process' | 'finish' | 'error' | 'wait' | undefined
      >,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    index: {
      type: Number,
      default: undefined
    }
  },
  setup (props) {
    const NSteps = inject<StepsInjection>('NSteps') as StepsInjection
    const themeRef = useTheme('Steps', 'Steps', style, stepsLight, NSteps)

    const verticalRef = computed(() => {
      return NSteps.vertical
    })
    const mergedStatusRef = computed<'process' | 'finish' | 'error' | 'wait'>(
      () => {
        const { status } = props
        if (status) {
          return status
        } else {
          const { index } = props
          const { current } = NSteps
          if (current === undefined) return 'process'
          if (index < current) {
            return 'finish'
          } else if (index === current) {
            return NSteps.status || 'process'
          } else if (index > current) {
            return 'wait'
          }
        }
        return 'process'
      }
    )
    return {
      vertical: verticalRef,
      mergedStatus: mergedStatusRef,
      cssVars: computed(() => {
        const { value: status } = mergedStatusRef
        const { size } = NSteps
        const {
          common: { cubicBezierEaseInOut },
          self: {
            stepHeaderFontWeight,
            [createKey('stepHeaderFontSize', size)]: stepHeaderFontSize,
            [createKey('indicatorIndexFontSize', size)]: indicatorIndexFontSize,
            [createKey('indicatorSize', size)]: indicatorSize,
            [createKey('indicatorIconSize', size)]: indicatorIconSize,
            [createKey('indicatorTextColor', status)]: indicatorTextColor,
            [createKey('indicatorBorderColor', status)]: indicatorBorderColor,
            [createKey('headerTextColor', status)]: headerTextColor,
            [createKey('splitorColor', status)]: splitorColor,
            [createKey('indicatorColor', status)]: indicatorColor,
            [createKey('descriptionTextColor', status)]: descriptionTextColor
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--description-text-color': descriptionTextColor,
          '--header-text-color': headerTextColor,
          '--indicator-border-color': indicatorBorderColor,
          '--indicator-color': indicatorColor,
          '--indicator-icon-size': indicatorIconSize,
          '--indicator-index-font-size': indicatorIndexFontSize,
          '--indicator-size': indicatorSize,
          '--indicator-text-color': indicatorTextColor,
          '--splitor-color': splitorColor,
          '--step-header-font-size': stepHeaderFontSize,
          '--step-header-font-weight': stepHeaderFontWeight
        }
      })
    }
  },
  render () {
    return (
      <div class="n-step" style={this.cssVars as CSSProperties}>
        <div class="n-step-indicator">
          <div class="n-step-indicator-slot">
            <NIconSwitchTransition>
              {{
                default: () => {
                  const { mergedStatus } = this
                  return !(
                    mergedStatus === 'finish' || mergedStatus === 'error'
                  ) ? (
                      <div key="index" class="n-step-indicator-slot__index">
                        {this.index}
                      </div>
                    ) : mergedStatus === 'finish' ? (
                      <NBaseIcon key="finish">
                        {{ default: () => <FinishedIcon /> }}
                      </NBaseIcon>
                    ) : mergedStatus === 'error' ? (
                      <NBaseIcon key="error">
                        {{ default: () => <ErrorIcon /> }}
                      </NBaseIcon>
                    ) : null
                }
              }}
            </NIconSwitchTransition>
          </div>
          {this.vertical ? <div class="n-step-splitor" /> : null}
        </div>
        <div class="n-step-content">
          <div class="n-step-content-header">
            <div class="n-step-content-header__title">{this.title}</div>
            {!this.vertical ? <div class="n-step-splitor" /> : null}
          </div>
          {this.description !== undefined || this.$slots.default ? (
            <div class="n-step-content__description">
              <slot>{this.description}</slot>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
