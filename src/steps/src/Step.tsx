import type { CSSProperties, PropType, SlotsType, VNode } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { computed, defineComponent, Fragment, h, inject, toRef } from 'vue'
import { NBaseIcon, NIconSwitchTransition } from '../../_internal'
import {
  CloseIcon as ErrorIcon,
  CheckmarkIcon as FinishedIcon
} from '../../_internal/icons'
import { useConfig, useThemeClass } from '../../_mixins'
import {
  call,
  createKey,
  resolveSlot,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import { stepsInjectionKey } from './Steps'

export const stepProps = {
  status: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
  title: String,
  description: String,
  disabled: Boolean,
  // index will be filled by parent steps, not user
  internalIndex: {
    type: Number,
    default: 0
  }
} as const

export type StepProps = ExtractPublicPropTypes<typeof stepProps>

export interface StepSlots {
  default?: () => VNode[]
  icon?: () => VNode[]
  title?: () => VNode[]
}

export default defineComponent({
  name: 'Step',
  props: stepProps,
  slots: Object as SlotsType<StepSlots>,
  setup(props) {
    const NSteps = inject(stepsInjectionKey, null)

    if (!NSteps)
      throwError('step', '`n-step` must be placed inside `n-steps`.')

    const { inlineThemeDisabled } = useConfig()

    const {
      props: stepsProps,
      mergedThemeRef,
      mergedClsPrefixRef,
      stepsSlots
    } = NSteps

    const verticalRef = toRef(stepsProps, 'vertical')

    const contentPlacementRef = toRef(stepsProps, 'contentPlacement')

    const mergedStatusRef = computed<'process' | 'finish' | 'error' | 'wait'>(
      () => {
        const { status } = props
        if (status) {
          return status
        }
        else {
          const { internalIndex } = props
          const { current } = stepsProps
          if (current === undefined)
            return 'process'
          if (internalIndex < current) {
            return 'finish'
          }
          else if (internalIndex === current) {
            return stepsProps.status || 'process'
          }
          else if (internalIndex > current) {
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'step',
          computed(() => {
            const { value: status } = mergedStatusRef
            const { size } = stepsProps
            return `${status[0]}${size[0]}`
          }),
          cssVarsRef,
          stepsProps
        )
      : undefined

    const handleStepClick = computed((): undefined | (() => void) => {
      if (props.disabled)
        return undefined
      const { onUpdateCurrent, 'onUpdate:current': _onUpdateCurrent }
        = stepsProps
      return onUpdateCurrent || _onUpdateCurrent
        ? () => {
            if (onUpdateCurrent) {
              call(onUpdateCurrent, props.internalIndex)
            }
            if (_onUpdateCurrent) {
              call(_onUpdateCurrent, props.internalIndex)
            }
          }
        : undefined
    })
    return {
      stepsSlots,
      mergedClsPrefix: mergedClsPrefixRef,
      vertical: verticalRef,
      mergedStatus: mergedStatusRef,
      handleStepClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      contentPlacement: contentPlacementRef
    }
  },
  render() {
    const {
      mergedClsPrefix,
      onRender,
      handleStepClick,
      disabled,
      contentPlacement,
      vertical
    } = this
    const descriptionNode = resolveWrappedSlot(
      this.$slots.default,
      (children) => {
        const mergedDescription = children || this.description
        if (mergedDescription) {
          return (
            <div class={`${mergedClsPrefix}-step-content__description`}>
              {mergedDescription}
            </div>
          )
        }
        return null
      }
    )
    const splitorNode = <div class={`${mergedClsPrefix}-step-splitor`} />

    const indicatorNode = (
      // We need a key here to prevent reconcile progress from affecting styling.
      // A DOM can be reused so if it is used both for A component & B component,
      // the styling transition bewteen two components may be incorrect.
      <div class={`${mergedClsPrefix}-step-indicator`} key={contentPlacement}>
        <div class={`${mergedClsPrefix}-step-indicator-slot`}>
          <NIconSwitchTransition>
            {{
              default: () => {
                return resolveWrappedSlot(this.$slots.icon, (icon) => {
                  const { mergedStatus, stepsSlots } = this
                  return !(
                    mergedStatus === 'finish' || mergedStatus === 'error'
                  ) ? (
                        icon || (
                          <div
                            key={this.internalIndex}
                            class={`${mergedClsPrefix}-step-indicator-slot__index`}
                          >
                            {this.internalIndex}
                          </div>
                        )
                      ) : mergedStatus === 'finish' ? (
                        <NBaseIcon clsPrefix={mergedClsPrefix} key="finish">
                          {{
                            default: () =>
                              resolveSlot(stepsSlots['finish-icon'], () => [
                                <FinishedIcon />
                              ])
                          }}
                        </NBaseIcon>
                      ) : mergedStatus === 'error' ? (
                        <NBaseIcon clsPrefix={mergedClsPrefix} key="error">
                          {{
                            default: () =>
                              resolveSlot(stepsSlots['error-icon'], () => [
                                <ErrorIcon />
                              ])
                          }}
                        </NBaseIcon>
                      ) : null
                })
              }
            }}
          </NIconSwitchTransition>
        </div>
        {vertical ? splitorNode : null}
      </div>
    )
    const contentNode = (
      <div class={`${mergedClsPrefix}-step-content`}>
        <div class={`${mergedClsPrefix}-step-content-header`}>
          <div class={`${mergedClsPrefix}-step-content-header__title`}>
            {resolveSlot(this.$slots.title, () => [this.title])}
          </div>
          {!vertical && contentPlacement === 'right' ? splitorNode : null}
        </div>
        {descriptionNode}
      </div>
    )

    let stepNode: VNode
    if (!vertical && contentPlacement === 'bottom') {
      stepNode = (
        <Fragment>
          <div class={`${mergedClsPrefix}-step-line`}>
            {indicatorNode}
            {splitorNode}
          </div>
          {contentNode}
        </Fragment>
      )
    }
    else {
      stepNode = (
        <Fragment>
          {indicatorNode}
          {contentNode}
        </Fragment>
      )
    }
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-step`,
          disabled && `${mergedClsPrefix}-step--disabled`,
          !disabled && handleStepClick && `${mergedClsPrefix}-step--clickable`,
          this.themeClass,
          descriptionNode && `${mergedClsPrefix}-step--show-description`,
          `${mergedClsPrefix}-step--${this.mergedStatus}-status`
        ]}
        style={this.cssVars as CSSProperties}
        onClick={handleStepClick}
      >
        {stepNode}
      </div>
    )
  }
})
