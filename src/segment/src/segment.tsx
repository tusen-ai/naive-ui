import type { ExtractPublicPropTypes, PropType, SlotsType, VNode } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { SegmentTheme } from '../styles'
import type {
  OnUpdateValue,
  OnUpdateValueImpl,
  SegmentItemType,
  SegmentSize,
  SegmentSlots,
  segmentValueType
} from './public-types'
import { createId } from 'seemly'
import { useMemo, useMergedState } from 'vooks'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  toRef,
  watch
} from 'vue'
import { VResizeObserver } from 'vueuc'
import {
  useConfig,
  useFormItem,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  call,
  createKey,
  type MaybeArray,
  resolveSlotWithTypedProps
} from '../../_utils'
import { segmentLight } from '../styles'
import style from './styles/index.cssr'

export const segmentProps = {
  ...(useTheme.props as ThemeProps<SegmentTheme>),
  name: String,
  options: {
    type: Array as PropType<SegmentItemType[]>,
    default: () => []
  },
  value: {
    type: [String, Number] as PropType<segmentValueType>,
    default: undefined
  },
  defaultValue: {
    type: [String, Number] as PropType<segmentValueType>,
    default: null
  },
  size: String as PropType<SegmentSize>,
  vertical: {
    type: Boolean,
    default: false
  },
  disabled: Boolean,
  block: {
    type: Boolean,
    default: false
  },
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>
} as const

export type SegmentProps = ExtractPublicPropTypes<typeof segmentProps>

export default defineComponent({
  name: 'Segment',
  props: segmentProps,
  slots: Object as SlotsType<SegmentSlots>,
  setup(props) {
    const groupRef = ref<HTMLDivElement | null>(null)
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef }
      = useConfig(props)
    const randomName = createId()
    const mergedNameRef = useMemo(() => {
      return props.name ?? randomName
    })

    const themeRef = useTheme(
      'Segment',
      '-segment',
      style,
      segmentLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Segment', mergedRtlRef, mergedClsPrefixRef)

    // form-item
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem

    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          color,
          textColor,
          textColorDisabled,
          segmentHoverBg,
          lineHeight,
          segmentCapsuleColorSegment,
          segmentPadding,
          [createKey('segmentPaddingVertical', `${size}`)]:
            segmentPaddingVertical,
          [createKey('height', size)]: height,
          [createKey('borderRadius', size)]: borderRadius,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value
      return {
        '--n-padding': segmentPadding,
        '--n-color': color,
        '--n-font-size': fontSize,
        '--n-height': height,
        '--n-line-height': lineHeight,
        '--n-border-radius': borderRadius,
        '--n-text-color': textColor,
        '--n-text-color-disabled': textColorDisabled,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-segment-capsule-color': segmentCapsuleColorSegment,
        '--n-segment-item-hover': segmentHoverBg,
        '--n-segment-item-padding': segmentPaddingVertical
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('segment', mergedSizeRef, cssVarsRef, props)
      : undefined

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    function doUpdateValue(value: string | number): void {
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props

      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value)
      }

      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }

    function handleFocusin(e: FocusEvent): void {
      const { value: selfEl } = groupRef
      if (!selfEl)
        return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null))
        return
      const { nTriggerFormFocus } = formItem
      nTriggerFormFocus()
    }
    function handleFocusout(e: FocusEvent): void {
      const { value: selfEl } = groupRef
      if (!selfEl)
        return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null))
        return
      const { nTriggerFormBlur } = formItem
      nTriggerFormBlur()
    }

    const segmentCapsuleElRef = ref<HTMLElement | null>(null)

    function getCurrentEl(): HTMLElement | null {
      const { value } = mergedValueRef
      if (value === null)
        return null
      const tabEl = groupRef.value?.querySelector(`[data-name="${value}"]`)
      return tabEl as HTMLElement | null
    }

    function updateSegmentPosition({
      transitionDisabled
    }: {
      transitionDisabled: boolean
    }): void {
      const tabsEl = groupRef.value
      if (!tabsEl)
        return
      if (transitionDisabled)
        tabsEl.classList.add('transition-disabled')
      const activeTabEl = getCurrentEl()
      const capsuleEl = segmentCapsuleElRef.value

      if (activeTabEl && capsuleEl) {
        capsuleEl.style.width = `${activeTabEl.offsetWidth}px`
        capsuleEl.style.height = `${activeTabEl.offsetHeight}px`

        if (props.vertical) {
          capsuleEl.style.transform = `translateY(${activeTabEl.offsetTop}px)`
        }
        else {
          if (rtlEnabledRef?.value) {
            const parentWidth = tabsEl.offsetWidth
            const rightOffset
              = parentWidth - activeTabEl.offsetLeft - activeTabEl.offsetWidth
            capsuleEl.style.transform = `translateX(${-rightOffset}px)`
          }
          else {
            capsuleEl.style.transform = `translateX(${
              activeTabEl.offsetLeft
            }px)`
          }
        }

        if (transitionDisabled) {
          void capsuleEl.offsetWidth
        }
      }
      if (transitionDisabled) {
        tabsEl.classList.remove('transition-disabled')
      }
    }

    const handleChange = (item: SegmentItemType) => {
      const { value, disabled } = item
      if (mergedDisabledRef.value || disabled)
        return
      doUpdateValue(value)
    }

    watch([mergedValueRef], () => {
      void nextTick(() => {
        updateSegmentPosition({
          transitionDisabled: false
        })
      })
    })

    onMounted(() => {
      updateSegmentPosition({
        transitionDisabled: true
      })
    })

    return {
      groupRef,
      segmentCapsuleElRef,
      mergedDisabled: mergedDisabledRef,
      mergedValue: mergedValueRef,
      mergedName: mergedNameRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      handleChange,
      handleFocusout,
      handleFocusin,
      updateSegmentPosition
    }
  },
  render() {
    const {
      mergedClsPrefix,
      mergedValue,
      mergedDisabled,
      block,
      rtlEnabled,
      vertical,
      cssVars,
      themeClass,
      mergedName,
      handleFocusin,
      handleFocusout,
      updateSegmentPosition,
      handleChange
    } = this

    const optionNodes: VNode[] = this.options.map((segmentOption, index) => {
      const isChecked = mergedValue === segmentOption.value
      const isDisabled = mergedDisabled || !!segmentOption.disabled

      return (
        <label
          key={segmentOption.value || index}
          data-name={segmentOption.value}
          class={[
            `${mergedClsPrefix}-segment-item`,
            isChecked && `${mergedClsPrefix}-segment-item--checked`,
            isDisabled && `${mergedClsPrefix}-segment-item--disabled`
          ]}
        >
          <input
            class={[`${mergedClsPrefix}-segment-item-input`]}
            type="radio"
            name={mergedName}
            value={segmentOption.value}
            disabled={isDisabled}
            checked={isChecked}
            onChange={() => handleChange(segmentOption)}
          />
          <div
            class={[`${mergedClsPrefix}-segment-item-label`]}
            title={segmentOption.label}
          >
            {resolveSlotWithTypedProps(
              this.$slots.default,
              {
                ...segmentOption
              },
              () => [segmentOption.label]
            )}
          </div>
        </label>
      )
    })

    return (
      <VResizeObserver
        onResize={() => updateSegmentPosition({ transitionDisabled: true })}
      >
        <div
          class={[
            `${mergedClsPrefix}-segment`,
            block && `${mergedClsPrefix}-segment--block`,
            rtlEnabled && `${mergedClsPrefix}-segment--rtl`,
            vertical && `${mergedClsPrefix}-segment--vertical`
          ]}
          style={cssVars}
        >
          <div
            ref="groupRef"
            class={[`${mergedClsPrefix}-segment-group`, themeClass]}
            onFocusin={handleFocusin}
            onFocusout={handleFocusout}
          >
            <div
              class={`${mergedClsPrefix}-segment-capsule`}
              ref="segmentCapsuleElRef"
            >
              <div class={`${mergedClsPrefix}-segment-wrapper`}>
                <div class={`${mergedClsPrefix}-segment-thumb`} />
              </div>
            </div>
            {optionNodes}
          </div>
        </div>
      </VResizeObserver>
    )
  }
})
