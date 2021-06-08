import {
  h,
  defineComponent,
  computed,
  inject,
  PropType,
  CSSProperties,
  renderSlot
} from 'vue'
import {
  CheckmarkIcon as FinishedIcon,
  CloseIcon as ErrorIcon
} from '../../_internal/icons'
import { NIconSwitchTransition, NBaseIcon } from '../../_internal'
import { createKey, throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { stepsInjectionKey } from './Steps'

const stepProps = {
  status: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
  title: String,
  description: String,
  // index will be filled by parent steps, not user
  internalIndex: {
    type: Number,
    required: true
  }
} as const

export type StepProps = ExtractPublicPropTypes<typeof stepProps>

export default defineComponent({
  name: 'Step',
  props: stepProps,
  setup (props) {
    const NSteps = inject(stepsInjectionKey, null)

    if (!NSteps) throwError('step', '`n-step` must be placed inside `n-steps`.')

    const { props: stepsProps, mergedThemeRef, mergedClsPrefixRef } = NSteps

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
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      vertical: verticalRef,
      mergedStatus: mergedStatusRef,
      cssVars: computed(() => {
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
    const showDescription =
      this.description !== undefined || this.$slots.default
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-step`,
          showDescription && `${mergedClsPrefix}-step--show-description`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-step-indicator`}>
          <div class={`${mergedClsPrefix}-step-indicator-slot`}>
            <NIconSwitchTransition>
              {{
                default: () => {
                  const { mergedStatus } = this
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
                        {{ default: () => <FinishedIcon /> }}
                      </NBaseIcon>
                    ) : mergedStatus === 'error' ? (
                      <NBaseIcon clsPrefix={mergedClsPrefix} key="error">
                        {{ default: () => <ErrorIcon /> }}
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
              {this.title}
            </div>
            {!this.vertical ? (
              <div class={`${mergedClsPrefix}-step-splitor`} />
            ) : null}
          </div>
          {showDescription ? (
            <div class={`${mergedClsPrefix}-step-content__description`}>
              {renderSlot(this.$slots, 'default', undefined, () => [
                this.description
              ])}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
