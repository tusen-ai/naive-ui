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
import { NIconSwitchTransition, NBaseIcon } from '../../_internal'
import { createKey, throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { stepsInjectionKey } from './Steps'
import { useConfig, useThemeClass } from '../../_mixins'

const stepProps = {
  status: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
  title: String,
  description: String,
  // index will be filled by parent steps, not user
  internalIndex: {
    type: Number,
    default: 0
  }
} as const

export type StepProps = ExtractPublicPropTypes<typeof stepProps>

export default defineComponent({
  name: 'Step',
  props: stepProps,
  setup (props) {
    const NSteps = inject(stepsInjectionKey, null)

    if (!NSteps) throwError('step', '`n-step` must be placed inside `n-steps`.')

    const { inlineThemeDisabled } = useConfig()

    const {
      props: stepsProps,
      mergedThemeRef,
      mergedClsPrefixRef,
      stepsSlots
    } = NSteps

    const verticalRef = computed(() => {
      return stepsProps.vertical
    })
    const mergedStatusRef = computed<'process' | 'finish' | 'error' | 'wait'>(
      () => {
        const { status } = props
        if (status) {
          return status
        } else {
          const { internalIndex } = props
          const { current } = stepsProps
          if (current === undefined) return 'process'
          if (internalIndex < current) {
            return 'finish'
          } else if (internalIndex === current) {
            return stepsProps.status || 'process'
          } else if (internalIndex > current) {
            return 'wait'
          }
        }
        return 'process'
      }
    )
    const cssVarsRef = computed(() => {
      const { value: status } = mergedStatusRef
      const { size } = stepsProps
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
      } = mergedThemeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-description-text-color': descriptionTextColor,
        '--n-header-text-color': headerTextColor,
        '--n-indicator-border-color': indicatorBorderColor,
        '--n-indicator-color': indicatorColor,
        '--n-indicator-icon-size': indicatorIconSize,
        '--n-indicator-index-font-size': indicatorIndexFontSize,
        '--n-indicator-size': indicatorSize,
        '--n-indicator-text-color': indicatorTextColor,
        '--n-splitor-color': splitorColor,
        '--n-step-header-font-size': stepHeaderFontSize,
        '--n-step-header-font-weight': stepHeaderFontWeight
      }
    })
    const themeClassHandle = useThemeClass(
      'step',
      computed(() => {
        const { value: status } = mergedStatusRef
        const { size } = stepsProps
        return `${status[0]}${size[0]}`
      }),
      cssVarsRef,
      stepsProps
    )
    return {
      stepsSlots,
      mergedClsPrefix: mergedClsPrefixRef,
      vertical: verticalRef,
      mergedStatus: mergedStatusRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const showDescription =
      this.description !== undefined || this.$slots.default
    const { mergedClsPrefix, onRender } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-step`,
          this.themeClass,
          showDescription && `${mergedClsPrefix}-step--show-description`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-step-indicator`}>
          <div class={`${mergedClsPrefix}-step-indicator-slot`}>
            <NIconSwitchTransition>
              {{
                default: () => {
                  const { mergedStatus, stepsSlots } = this
                  return !(
                    mergedStatus === 'finish' || mergedStatus === 'error'
                  ) ? (
                    <div
                      key={this.internalIndex}
                      class={`${mergedClsPrefix}-step-indicator-slot__index`}
                    >
                      {this.internalIndex}
                    </div>
                      ) : mergedStatus === 'finish' ? (
                    <NBaseIcon clsPrefix={mergedClsPrefix} key="finish">
                      {{
                        default: () =>
                          stepsSlots['finish-icon'] ? (
                            stepsSlots['finish-icon']()
                          ) : (
                            <FinishedIcon />
                          )
                      }}
                    </NBaseIcon>
                      ) : mergedStatus === 'error' ? (
                    <NBaseIcon clsPrefix={mergedClsPrefix} key="error">
                      {{
                        default: () =>
                          stepsSlots['error-icon'] ? (
                            stepsSlots['error-icon']()
                          ) : (
                            <ErrorIcon />
                          )
                      }}
                    </NBaseIcon>
                      ) : null
                }
              }}
            </NIconSwitchTransition>
          </div>
          {this.vertical ? (
            <div class={`${mergedClsPrefix}-step-splitor`} />
          ) : null}
        </div>
        <div class={`${mergedClsPrefix}-step-content`}>
          <div class={`${mergedClsPrefix}-step-content-header`}>
            <div class={`${mergedClsPrefix}-step-content-header__title`}>
              {this.$slots.title ? this.$slots.title() : this.title}
            </div>
            {!this.vertical ? (
              <div class={`${mergedClsPrefix}-step-splitor`} />
            ) : null}
          </div>
          {showDescription ? (
            <div class={`${mergedClsPrefix}-step-content__description`}>
              {this.$slots.default ? this.$slots.default() : this.description}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
